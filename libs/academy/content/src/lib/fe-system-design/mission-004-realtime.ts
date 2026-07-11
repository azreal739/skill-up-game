import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — real-time data: polling vs SSE vs WebSockets, and choosing
 * by the update pattern and scale.
 */
export const fnSys004Realtime: MissionDefinition = {
  id: 'sys-004-realtime',
  campaignId: 'fe-system-design',
  title: 'Data That Pushes Back',
  summary:
    'Polling, Server-Sent Events and WebSockets trade simplicity for latency and direction — chosen by how often data changes and whether the client needs to push too.',
  difficulty: 'hard',
  learningObjectives: [
    'Compare polling, SSE and WebSockets by their tradeoffs',
    'Choose a real-time transport from the update pattern',
    'Design for reconnection and scale in live features',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four: "make it real-time", the requirement that hides three very different systems. We reached for WebSockets by reflex on a feature that updated once a minute — a persistent bidirectional socket, connection management, and scaling headaches, to deliver an update a poll would have handled in one line.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Three transports on a spectrum. POLLING: ask the server every N seconds — dead simple, works everywhere, but latency = interval and it wastes requests when nothing changed. SSE (Server-Sent Events): server pushes to client over one long-lived HTTP connection — great for one-way streams (notifications, live feeds), auto-reconnects, simpler than sockets. WEBSOCKETS: full bidirectional persistent connection — for genuinely two-way, low-latency needs (chat, collaborative editing, games). Choose by update frequency AND direction — and always design reconnection.',
    },
  ],
  contextArtefacts: [
    {
      id: 'realtime-spectrum',
      type: 'code',
      title: 'The real-time transport spectrum',
      language: 'text',
      content:
        'POLLING     client asks every N sec   · simplest, works everywhere\n            - latency = interval, wasteful when idle · best: infrequent updates\nSSE         server → client stream     · one-way push over HTTP, auto-reconnect\n            - server→client only · best: notifications, live feeds, dashboards\nWEBSOCKET   client ↔ server, persistent · two-way, low latency\n            - connection mgmt, scaling cost · best: chat, collab, presence, games\n\nchoose by: how often does it change? does the CLIENT need to push? + reconnection',
    },
  ],
  challenges: [
    {
      id: 'sys-004-c1',
      type: 'multiple-choice',
      title: 'Three Real-Time Features',
      difficulty: 'hard',
      tags: ['angular', 'rxjs'],
      storyContext:
        'Three "real-time" features: (A) a stock-price ticker — server pushes price updates several times a second, client only displays; (B) a build-status badge — updates when a CI build finishes, maybe every few minutes; (C) a collaborative document editor — multiple users type simultaneously, sub-second sync both ways.',
      prompt: 'Which transport fits each?',
      options: [
        {
          id: 'a',
          label:
            '(A) SSE — high-frequency, server→client only (the client just displays), and SSE’s one-way push with auto-reconnect is purpose-built for streaming feeds without socket overhead. (B) Polling — updates are minutes apart and infrequent; a simple poll (or SSE if you prefer push) is plenty, and a WebSocket would be wildly over-built for a badge. (C) WebSockets — genuinely bidirectional, sub-second, many concurrent editors pushing changes; only a persistent two-way connection meets that. Match transport to frequency AND direction.',
          isCorrect: true,
          feedback:
            'Direction and frequency decide it: one-way high-frequency → SSE, infrequent → polling, two-way low-latency → WebSockets. Reflexively socketing all three would over-build the ticker and badge and mis-serve none of them better.',
        },
        {
          id: 'b',
          label: 'WebSockets for all three — a single persistent bidirectional connection is the most capable transport, so standardise on it.',
          isCorrect: false,
          feedback:
            'Most capable ≠ right: sockets for a minutes-apart build badge and a display-only ticker add connection management, scaling cost, and reconnection complexity for capabilities (client→server, sub-second) those features never use. Over-building has a real operational price.',
        },
        {
          id: 'c',
          label: 'Polling for all three at 1-second intervals — simple, uniform, and 1s feels real-time enough.',
          isCorrect: false,
          feedback:
            '1s polling wastes enormous request volume on the idle build badge, adds up-to-1s latency the collaborative editor cannot tolerate (typing must sync faster and two-way), and still can’t push client edits. Uniform polling mis-serves both the frequent and the bidirectional case.',
        },
        {
          id: 'd',
          label: 'SSE for all three — server push is modern and covers real-time needs without WebSocket complexity.',
          isCorrect: false,
          feedback:
            'SSE is one-way (server→client) — the collaborative editor needs the CLIENT to push edits too, which SSE cannot do. Right for the ticker, overkill-but-fine for the badge, but structurally wrong for two-way (C).',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'For each: how OFTEN does it update, and does the CLIENT need to send data too?' },
        { level: 2, title: 'Concept', content: 'One-way frequent → SSE; infrequent → poll; two-way low-latency → WebSocket.' },
        { level: 3, title: 'Specific clue', content: 'Which feature needs the client to PUSH — and which transport allows that?' },
        { level: 4, title: 'Guided solution', content: 'SSE for A, polling for B, WebSockets for C.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Transports matched' }],
      consequences: [
        {
          type: 'technical-debt',
          delta: 7,
          reason: 'WebSockets were used for all three — the build badge’s socket infrastructure became an operational burden for a minutes-apart update.',
        },
      ],
      helpLinks: [{ topicId: 'sysd.realtime', label: 'Real-time transports' }],
      successFeedback: 'Transport matched to frequency and direction — no feature over- or under-built.',
      failureFeedback: 'Only one feature needs two-way sub-second sync. The others are one-way or infrequent. Match accordingly.',
    },
    {
      id: 'sys-004-c2',
      type: 'multiple-choice',
      title: 'When the Connection Drops',
      difficulty: 'hard',
      tags: ['angular'],
      storyContext:
        'The SSE-based notification stream works in the demo. In production, users on flaky mobile networks report missing notifications after their connection blips — the stream silently dies and never recovers, and events sent during the gap are lost.',
      prompt: 'What was missing from the design?',
      options: [
        {
          id: 'a',
          label:
            'Two things every persistent-connection design needs: RECONNECTION (detect the drop and re-establish the stream — SSE auto-reconnects, but the app must handle the reconnect lifecycle, backoff, and UI state) and GAP RECOVERY (events sent while disconnected are lost unless the client tells the server "I last saw event N" on reconnect — SSE’s Last-Event-ID, or a since-cursor — so the server replays what was missed). A live feature is not done when it works on a stable connection; it is done when it survives a flaky one.',
          isCorrect: true,
          feedback:
            'Real-time design is mostly failure design: connections WILL drop on mobile. Reconnection restores the stream; a last-seen cursor recovers the gap. Without both, blips become silent data loss — the demo-vs-production divide.',
        },
        {
          id: 'b',
          label: 'SSE was the wrong choice — switch to WebSockets, which do not drop on flaky networks.',
          isCorrect: false,
          feedback:
            'WebSockets drop on flaky networks too — ANY persistent connection does. Switching transport without adding reconnection + gap recovery just moves the same failure. The missing piece is the recovery design, not the transport.',
        },
        {
          id: 'c',
          label: 'Add a longer server timeout so the connection stays open through brief network blips.',
          isCorrect: false,
          feedback:
            'A longer timeout cannot keep a connection alive through an actual network drop (the client-side connection is gone regardless of server timeout) — and does nothing to replay events missed during the gap. You need reconnect + gap recovery.',
        },
        {
          id: 'd',
          label: 'Have the client poll a "missed notifications" endpoint every 30 seconds as a backup to the stream.',
          isCorrect: false,
          feedback:
            'A parallel polling backup is a heavy, redundant workaround that reintroduces polling latency and duplicate-handling complexity — when SSE already offers Last-Event-ID gap recovery on reconnect. Use the transport’s built-in recovery, not a second channel.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Connections on mobile WILL drop. What must the design do when they do?' },
        { level: 2, title: 'Concept', content: 'Reconnection + gap recovery (last-seen cursor / Last-Event-ID).' },
        { level: 3, title: 'Specific clue', content: 'When the stream reconnects, how does the server know which events to replay?' },
        { level: 4, title: 'Guided solution', content: 'Pick reconnection + gap recovery.' },
      ],
      rewards: [{ type: 'xp', amount: 50, label: 'Reconnection designed' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'No gap recovery shipped — mobile users silently lost notifications on every network blip, a data-loss bug blamed on "flaky notifications".',
        },
      ],
      helpLinks: [{ topicId: 'sysd.realtime', label: 'Real-time transports' }],
      successFeedback: 'Reconnect and replay-the-gap — the live feature survives the flaky connection, not just the demo.',
      failureFeedback: 'The connection dropped and events were lost. What restores the stream, and what recovers the missed events?',
    },
  ],
  reflectionPrompt: 'For our live features: is the transport matched to update frequency and direction — and does each survive a dropped connection with gap recovery?',
  rewards: [{ type: 'xp', amount: 15, label: 'Real-time designed' }],
};
