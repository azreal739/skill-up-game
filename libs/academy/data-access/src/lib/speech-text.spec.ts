import { ContentService } from './content.service';
import { toSpokenText } from './speech-text';

describe('toSpokenText (code-to-speech)', () => {
  it('replaces multi-line code blocks instead of reading them', () => {
    const text =
      'catch (e: unknown) {\n  const body = (e as HttpErrorResponse).error;\n  console.log(body);\n}';
    const spoken = toSpokenText(text);
    expect(spoken).toContain('the code is shown on screen');
    expect(spoken).not.toContain('{');
  });

  it('speaks operators the way an engineer says them', () => {
    expect(toSpokenText('uses = (assignment) instead of === (comparison)')).toContain(
      'triple equals'
    );
    expect(toSpokenText('retryWhen(errors => errors.delay(1000))')).toContain('arrow');
    expect(toSpokenText('a !== b')).toContain('not equals');
    expect(toSpokenText('a && b || c')).toMatch(/ and .* or /);
  });

  it('splits identifiers into words', () => {
    expect(toSpokenText('getActiveUsers filters the list')).toContain('get Active Users');
    expect(toSpokenText('snake_case_name here')).toContain('snake case name');
  });

  it('reads generics as "of"', () => {
    expect(toSpokenText('http.get<User> trusts the shape')).toContain('of User');
  });

  it('spells error codes', () => {
    expect(toSpokenText('fails with TS2365 at build time')).toContain('T S 2365');
  });

  it('strips backticks and code punctuation', () => {
    const spoken = toSpokenText('Rule out anything using `as` — assertions narrow nothing.');
    expect(spoken).not.toContain('`');
    expect(spoken).toContain('as');
  });

  it('reads trailing-$ observables as streams', () => {
    expect(toSpokenText('customers$ from the service')).toContain('customers stream');
  });

  it('speaks prose equations', () => {
    expect(toSpokenText('Slot + anchor = WCS')).toBe('Slot plus anchor equals WCS');
  });

  it('leaves plain prose untouched', () => {
    const prose = 'Cha Cha should be cheeky; solemn is wrong.';
    expect(toSpokenText(prose)).toBe(prose);
  });

  // Corpus sweep: every string the app can speak, across all packs and help
  // topics, must come out clean — no backticks, braces, or raw operators.
  it('cleans every spoken field in the full content corpus', () => {
    const leftovers = /[`{}]|===|!==|=>|\|\||&&/;
    const spokenStrings: string[] = [];
    const content = new ContentService();

    for (const campaign of content.campaigns()) {
      for (const mission of content.missionsForCampaign(campaign.id)) {
        spokenStrings.push(mission.title, mission.summary, mission.reflectionPrompt ?? '');
        for (const block of mission.briefing) {
          spokenStrings.push(block.text);
        }
        for (const challenge of mission.challenges) {
          spokenStrings.push(
            challenge.storyContext,
            challenge.prompt,
            challenge.successFeedback,
            challenge.failureFeedback
          );
          const options =
            challenge.type === 'code-review' ? challenge.findings : challenge.options;
          for (const option of options) {
            spokenStrings.push(option.feedback ?? '');
          }
          for (const hint of challenge.hints) {
            spokenStrings.push(hint.title, hint.content);
          }
        }
      }
    }
    for (const topic of content.helpTopics()) {
      spokenStrings.push(topic.title, topic.summary, topic.content);
    }

    const dirty = spokenStrings
      .filter(Boolean)
      .map((text) => toSpokenText(text))
      .filter((spoken) => leftovers.test(spoken));
    expect(dirty)
      .withContext(`${dirty.length} spoken strings still contain raw code tokens`)
      .toEqual([]);
  });
});
