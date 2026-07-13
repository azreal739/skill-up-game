# Engineering Academy — local play launcher (Windows).
# Serves the bundled ./app folder on http://localhost:8377 and opens the
# default browser. No installation required: uses only built-in Windows
# PowerShell features.
#
# The port is FIXED on purpose: saved progress lives in the browser's
# localStorage, which is keyed by http://localhost:8377 — changing the port
# would hide existing save files.

$ErrorActionPreference = 'Stop'
$port = 8377
$url = "http://localhost:$port/"
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\app')).Path

$mime = @{
  '.html'  = 'text/html; charset=utf-8'
  '.js'    = 'text/javascript; charset=utf-8'
  '.mjs'   = 'text/javascript; charset=utf-8'
  '.css'   = 'text/css; charset=utf-8'
  '.json'  = 'application/json; charset=utf-8'
  '.ico'   = 'image/x-icon'
  '.png'   = 'image/png'
  '.jpg'   = 'image/jpeg'
  '.jpeg'  = 'image/jpeg'
  '.gif'   = 'image/gif'
  '.svg'   = 'image/svg+xml'
  '.webp'  = 'image/webp'
  '.woff'  = 'font/woff'
  '.woff2' = 'font/woff2'
  '.ttf'   = 'font/ttf'
  '.txt'   = 'text/plain; charset=utf-8'
  '.map'   = 'application/json'
  '.wasm'  = 'application/wasm'
  '.onnx'  = 'application/octet-stream'
  '.bin'   = 'application/octet-stream'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
try {
  $listener.Start()
} catch {
  # Most likely the game is already running in another window — just open it.
  try {
    (New-Object System.Net.WebClient).DownloadData($url) | Out-Null
    Start-Process $url
    exit 0
  } catch {
    Write-Host ''
    Write-Host "  Could not start the game server on port $port."
    Write-Host "  If the game is already open in another window, use that one."
    Write-Host "  Details: $($_.Exception.Message)"
    Write-Host ''
    Read-Host '  Press Enter to close'
    exit 1
  }
}

Start-Process $url
Write-Host ''
Write-Host '  ============================================='
Write-Host '   Engineering Academy is running!'
Write-Host "   Play at: $url"
Write-Host ''
Write-Host '   Keep this window open while you play'
Write-Host '   (minimising it is fine).'
Write-Host '   Close this window when you are done.'
Write-Host '  ============================================='
Write-Host ''

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  try {
    $relative = [Uri]::UnescapeDataString($request.Url.AbsolutePath).TrimStart('/')
    if ($relative -eq '') { $relative = 'index.html' }
    $file = Join-Path $root ($relative -replace '/', '\')
    $resolved = $null
    if (Test-Path $file -PathType Leaf) {
      $resolved = (Resolve-Path $file).Path
    }
    # Anything unknown (or a path-traversal attempt) falls back to the app
    # shell; the game routes via the URL hash so this is always safe. Assets
    # are the exception: the voice engine probes for optional model files
    # and must see a real 404, not a 200 full of index.html.
    if (-not $resolved -or -not $resolved.StartsWith($root)) {
      if ($relative.StartsWith('assets/')) {
        $response.StatusCode = 404
        $response.OutputStream.Close()
        continue
      }
      $resolved = Join-Path $root 'index.html'
    }
    $bytes = [System.IO.File]::ReadAllBytes($resolved)
    $ext = [System.IO.Path]::GetExtension($resolved).ToLower()
    $type = $mime[$ext]
    if (-not $type) { $type = 'application/octet-stream' }
    $response.ContentType = $type
    $response.ContentLength64 = $bytes.Length
    $response.AddHeader('Cache-Control', 'no-cache')
    # Cross-origin isolation lets the on-device voice engine use
    # multithreaded WebAssembly (everything served here is same-origin).
    $response.AddHeader('Cross-Origin-Opener-Policy', 'same-origin')
    $response.AddHeader('Cross-Origin-Embedder-Policy', 'require-corp')
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    try { $response.StatusCode = 500 } catch {}
  } finally {
    try { $response.OutputStream.Close() } catch {}
  }
}
