import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoiceChallenge, evaluateChallenge } from '@academy/content-model';
import { ChallengeHostComponent } from './challenge-host.component';

const challenge: MultipleChoiceChallenge = {
  id: 'c1',
  type: 'multiple-choice',
  title: 'Pick the interface',
  difficulty: 'easy',
  tags: ['typescript'],
  storyContext: 'The card needs a model.',
  prompt: 'Which interface fits?',
  options: [
    { id: 'a', label: 'right one', isCorrect: true, feedback: 'Yes.' },
    { id: 'b', label: 'wrong one', isCorrect: false, feedback: 'No.' },
  ],
  hints: [{ level: 1, title: 'Direction', content: 'Look closely.' }],
  rewards: [],
  consequences: [],
  helpLinks: [{ topicId: 'typescript.interfaces', label: 'Interfaces' }],
  successFeedback: 'Nice.',
  failureFeedback: 'Retry.',
};

describe('ChallengeHostComponent', () => {
  let fixture: ComponentFixture<ChallengeHostComponent>;
  let component: ChallengeHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ChallengeHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(ChallengeHostComponent);
    component = fixture.componentInstance;
    component.challenge = challenge;
    fixture.detectChanges();
  });

  function element(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the prompt and options', () => {
    expect(element().textContent).toContain('Which interface fits?');
    expect(element().querySelectorAll('.option').length).toBe(2);
  });

  it('disables submission until something is selected', () => {
    const submit = element().querySelector<HTMLButtonElement>('.challenge__actions button');
    expect(submit?.disabled).toBeTrue();
  });

  it('selects a single option and emits the answer on submit', () => {
    const emitted: string[][] = [];
    component.submitted.subscribe((ids) => emitted.push(ids));

    element().querySelectorAll<HTMLButtonElement>('.option')[0].click();
    fixture.detectChanges();
    element().querySelector<HTMLButtonElement>('.challenge__actions button')?.click();

    expect(emitted).toEqual([['a']]);
  });

  it('replaces the selection in single-select mode', () => {
    const options = element().querySelectorAll<HTMLButtonElement>('.option');
    options[0].click();
    options[1].click();
    fixture.detectChanges();
    expect(component.selectedIds).toEqual(['b']);
  });

  it('shows per-option verdicts once an evaluation is provided', () => {
    component.selectedIds = ['b'];
    fixture.componentRef.setInput(
      'evaluation',
      evaluateChallenge(challenge, { selectedIds: ['b'] })
    );
    fixture.componentRef.setInput('locked', true);
    fixture.detectChanges();

    expect(element().textContent).toContain('✗ not this one');
    expect(element().textContent).toContain('✓ this was correct');
    expect(element().querySelector<HTMLButtonElement>('.option')?.disabled).toBeTrue();
  });
});
