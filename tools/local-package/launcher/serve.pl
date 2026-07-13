#!/usr/bin/perl
# Engineering Academy — tiny static file server for the local play package
# (macOS / Linux). Pure core-Perl so it runs on a stock machine with nothing
# installed. Serves the given directory on http://localhost:8377.
#
# The port is FIXED on purpose: saved progress lives in the browser's
# localStorage, keyed by http://localhost:8377.
#
# Exit codes: 2 = port already in use (the game is probably already running).
use strict;
use warnings;
use IO::Socket::INET;
use File::Spec;
use Cwd 'abs_path';

my $port = 8377;
my $root = abs_path($ARGV[0] // '.') or die "app folder not found\n";
-d $root or die "app folder not found: $root\n";

my %mime = (
  html  => 'text/html; charset=utf-8',
  js    => 'text/javascript; charset=utf-8',
  mjs   => 'text/javascript; charset=utf-8',
  css   => 'text/css; charset=utf-8',
  json  => 'application/json; charset=utf-8',
  ico   => 'image/x-icon',
  png   => 'image/png',
  jpg   => 'image/jpeg',
  jpeg  => 'image/jpeg',
  gif   => 'image/gif',
  svg   => 'image/svg+xml',
  webp  => 'image/webp',
  woff  => 'font/woff',
  woff2 => 'font/woff2',
  ttf   => 'font/ttf',
  txt   => 'text/plain; charset=utf-8',
  map   => 'application/json',
);

my $server = IO::Socket::INET->new(
  LocalAddr => '127.0.0.1',
  LocalPort => $port,
  Listen    => 16,
  ReuseAddr => 1,
) or exit 2;

$SIG{CHLD} = 'IGNORE';
$SIG{PIPE} = 'IGNORE';

while (1) {
  my $client = $server->accept or next;
  my $pid = fork;
  if (!defined $pid) { close $client; next; }
  if ($pid) { close $client; next; }
  close $server;
  eval { handle($client) };
  close $client;
  exit 0;
}

sub handle {
  my ($client) = @_;
  local $SIG{ALRM} = sub { exit 0 };
  alarm 15;

  my $request = <$client>;
  return unless defined $request;
  while (my $line = <$client>) { last if $line =~ /^\r?\n$/; }

  my ($method, $path) = $request =~ m{^(\S+)\s+(\S+)};
  return unless $method && ($method eq 'GET' || $method eq 'HEAD');

  $path =~ s/[?#].*//;
  $path =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/ge;
  $path = '/index.html' if $path eq '/' || $path eq '';

  my @parts = grep { length && $_ ne '.' && $_ ne '..' } split m{/+}, $path;
  my $file = File::Spec->catfile($root, @parts);
  # Anything unknown falls back to the app shell; the game routes via the
  # URL hash so this is always safe.
  $file = File::Spec->catfile($root, 'index.html') unless -f $file;

  my ($ext) = $file =~ /\.([A-Za-z0-9]+)$/;
  my $type = $mime{ lc($ext // '') } || 'application/octet-stream';

  open my $fh, '<:raw', $file or return respond($client, 404, 'text/plain', 'Not found');
  local $/;
  my $body = <$fh>;
  close $fh;

  my $header = join "\r\n",
    'HTTP/1.1 200 OK',
    "Content-Type: $type",
    'Content-Length: ' . length($body),
    'Cache-Control: no-cache',
    'Connection: close',
    '', '';
  print {$client} $header;
  print {$client} $body unless $method eq 'HEAD';
}

sub respond {
  my ($client, $code, $type, $body) = @_;
  print {$client} join "\r\n",
    "HTTP/1.1 $code Error",
    "Content-Type: $type",
    'Content-Length: ' . length($body),
    'Connection: close',
    '', $body;
}
