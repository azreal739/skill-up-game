import { MissionDefinition } from '@academy/content-model';

/**
 * Field Notes — rendering long lists: track identity in @for, and virtual
 * scrolling when the DOM itself is the cost.
 */
export const fnPf004RenderingLists: MissionDefinition = {
  id: 'pf-004-rendering-lists',
  campaignId: 'ng-performance',
  title: 'Ten Thousand Rows',
  summary:
    'List performance is two decisions: track identity so updates reuse DOM, and virtualise so only visible rows have DOM at all.',
  difficulty: 'medium',
  learningObjectives: [
    'Use track expressions that preserve DOM across data refreshes',
    'Diagnose full-list re-renders from identity churn',
    'Decide when a list needs virtual scrolling',
  ],
  briefing: [
    {
      speaker: 'Team Lead',
      text: 'Session four: the audit-log page. Ten thousand rows, and two complaints that sound alike — “it re-flashes whenever data refreshes” and “scrolling is janky even when nothing changes”. Same list, two different diseases.',
    },
    {
      speaker: 'Senior Dev',
      text: 'Disease one is identity: the refresh builds NEW objects, and @for tracking by object identity sees ten thousand strangers — tear down, rebuild, flash. track item.id tells Angular who is who. Disease two is volume: ten thousand rows of DOM cost memory and layout regardless of change. Virtual scrolling renders the thirty you can see and recycles them.',
    },
  ],
  contextArtefacts: [
    {
      id: 'track-and-virtual',
      type: 'code',
      title: 'Both medicines',
      language: 'ts',
      content:
        '// identity: refreshed data reuses rows whose id survives\n@for (entry of entries(); track entry.id) {\n  <app-log-row [entry]="entry" />\n}\n\n// volume: only the visible window has DOM at all\n<cdk-virtual-scroll-viewport itemSize="48">\n  <app-log-row *cdkVirtualFor="let entry of entries; trackBy: trackById" [entry]="entry" />\n</cdk-virtual-scroll-viewport>',
    },
  ],
  challenges: [
    {
      id: 'pf-004-c1',
      type: 'multiple-choice',
      title: 'The Refresh Flash',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'Every 30s poll replaces the entries array with fresh objects (same ids, mostly same data). The whole list flashes; scroll position and open row-menus die. The template: @for (entry of entries(); track entry).',
      prompt: 'Why does a mostly-identical refresh destroy the list?',
      options: [
        {
          id: 'a',
          label: 'Polling replaces the ARRAY reference, and any new array reference forces a full @for rebuild regardless of tracking.',
          isCorrect: false,
          feedback:
            'New arrays are normal (immutability demands them) — @for diffs CONTENTS by the track expression; the array reference is not the problem.',
        },
        {
          id: 'b',
          label: 'The rows’ OnPush change detection ignores new input objects — the flash is Angular falling back to full re-render.',
          isCorrect: false,
          feedback: 'OnPush governs CHECKING, not list diffing — and new references are exactly what OnPush notices.',
        },
        {
          id: 'c',
          label: 'The 30s poll races the render cycle — throttling the poll to 60s halves the flashes but cannot remove them.',
          isCorrect: false,
          feedback: 'Frequency scales how OFTEN it flashes, not WHY — one refresh with churned identity flashes once, completely.',
        },
        {
          id: 'd',
          label:
            'track entry tracks by OBJECT IDENTITY, and the poll mints new objects — so every row “disappeared” and ten thousand “new” rows arrived: full teardown, rebuilt DOM, lost scroll and menus. track entry.id matches rows across refreshes, so unchanged rows keep their DOM and only real changes touch the page.',
          isCorrect: true,
          feedback:
            'Identity is the diffing currency: stable keys turn a refresh from apocalypse into a patch. The same rule runs React’s key and NgRx entity ids.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'What does the track expression compare between old and new lists?' },
        { level: 2, title: 'Concept', content: 'Fresh objects = new identities unless you name a stable key.' },
        { level: 3, title: 'Specific clue', content: 'The ids survived the poll. Did the template ever look at them?' },
        { level: 4, title: 'Guided solution', content: 'Pick identity churn, fixed by track entry.id.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Identity kept' }],
      consequences: [
        {
          type: 'stability',
          delta: -6,
          reason: 'Every poll closed whichever row-menu an auditor had open — thirty seconds became the app’s attention span.',
        },
      ],
      helpLinks: [{ topicId: 'perf.rendering', label: 'Rendering performance' }],
      successFeedback: 'Stable keys, stable DOM — refreshes patch instead of demolish.',
      failureFeedback: 'The poll returns the same ids in new objects. What does track entry see; what would track entry.id see?',
    },
    {
      id: 'pf-004-c2',
      type: 'multiple-choice',
      title: 'The Jank That Survives',
      difficulty: 'medium',
      tags: ['angular'],
      storyContext:
        'track entry.id ships. Refresh flash: gone. But scrolling the 10,000-row list is still janky, and the tab eats 900MB. The profiler shows long “Layout” and “Recalculate style” bars while scrolling — no JS hotspots.',
      prompt: 'What is the remaining disease, and the cure?',
      options: [
        {
          id: 'a',
          label: 'Row components are too heavy — memoise their computeds and the layout bars will shrink.',
          isCorrect: false,
          feedback:
            'The profiler shows LAYOUT cost, not JS — ten thousand DOM nodes are expensive to style and lay out even with zero component logic.',
        },
        {
          id: 'b',
          label:
            'The DOM itself is the cost: 10,000 rows exist as live nodes the browser must style, lay out and keep in memory whether or not they change. Virtual scrolling (cdk-virtual-scroll-viewport) renders only the visible window (~30 rows) and recycles them — DOM cost becomes O(viewport), not O(data).',
          isCorrect: true,
          feedback:
            'Track fixed change cost; virtualisation fixes EXISTENCE cost. Two diseases, two medicines — the session’s whole structure.',
        },
        {
          id: 'c',
          label: 'Paginate server-side — no client technique can handle ten thousand records.',
          isCorrect: false,
          feedback:
            'Virtualised lists handle 100× this comfortably — pagination is a UX choice (auditors wanted continuous scroll), not a technical ceiling.',
        },
        {
          id: 'd',
          label: 'content-visibility: hidden on off-screen rows keeps the DOM but skips their rendering — same win, no library.',
          isCorrect: false,
          feedback:
            'content-visibility (auto, not hidden) genuinely helps rendering cost — but the 900MB of NODES remains, and per-row hint management on 10k rows rebuilds half a virtual scroller badly.',
        },
      ],
      hints: [
        { level: 1, title: 'Direction', content: 'Nothing changes while scrolling, yet layout burns. What does the browser maintain per row?' },
        { level: 2, title: 'Concept', content: 'DOM existence has a price independent of updates — pay it only for the viewport.' },
        { level: 3, title: 'Specific clue', content: 'How many rows can a human see at once? Render that.' },
        { level: 4, title: 'Guided solution', content: 'Pick virtual scrolling.' },
      ],
      rewards: [{ type: 'xp', amount: 25, label: 'Volume virtualised' }],
      consequences: [
        {
          type: 'stability',
          delta: -5,
          reason: 'The 900MB tab kept OOM-crashing the auditors’ laptops — the feature worked best on the machines that needed it least.',
        },
      ],
      helpLinks: [{ topicId: 'perf.rendering', label: 'Rendering performance' }],
      successFeedback: 'Render the window, not the dataset — existence cost solved at the only scale that matters: the viewport.',
      failureFeedback: 'The list is IDLE and still janky. Which cost is present with zero changes — and zero JS?',
    },
  ],
  reflectionPrompt: 'Find our longest @for: what does it track by, and how many rows exist as DOM when it renders?',
  rewards: [{ type: 'xp', amount: 10, label: 'Lists mastered' }],
};
