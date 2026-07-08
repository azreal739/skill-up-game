import { TestBed } from '@angular/core/testing';
import { GameStateService } from '@academy/data-access';
import { PlayerNote } from '@academy/content-model';
import { NoteComposerComponent } from './note-composer.component';

describe('NoteComposerComponent (Review Loop spec 06)', () => {
  let gameState: GameStateService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [NoteComposerComponent] }).compileComponents();
    gameState = TestBed.inject(GameStateService);
    gameState.createProfile('Avery');
  });

  afterEach(() => localStorage.clear());

  function render(inputs: Partial<NoteComposerComponent>) {
    const fixture = TestBed.createComponent(NoteComposerComponent);
    Object.assign(fixture.componentInstance, inputs);
    fixture.componentInstance.ngOnChanges();
    fixture.detectChanges();
    return fixture;
  }

  it('creates a linked note and normalises tags on save', () => {
    const fixture = render({ linkType: 'challenge', linkId: 'c1' });
    const comp = fixture.componentInstance as unknown as {
      title: { set(v: string): void };
      body: { set(v: string): void };
      tagsText: { set(v: string): void };
      save(): void;
    };
    const saved: PlayerNote[] = [];
    fixture.componentInstance.saved.subscribe((n) => saved.push(n));

    comp.title.set('API boundary lesson');
    comp.body.set('Validate at the edge.');
    comp.tagsText.set('Zod, zod ,  Boundaries'); // dupes + case + spacing
    comp.save();

    expect(gameState.notes().length).toBe(1);
    const note = gameState.notes()[0];
    expect(note.linkedEntityType).toBe('challenge');
    expect(note.linkedEntityId).toBe('c1');
    expect(note.tags).toEqual(['zod', 'boundaries']);
    expect(saved.length).toBe(1);
  });

  it('edits an existing note instead of creating a new one', () => {
    const existing = gameState.createNote({
      title: 'Draft',
      body: '',
      tags: [],
      linkedEntityType: 'general',
      linkedEntityId: '',
    });
    const fixture = render({ note: existing });
    const comp = fixture.componentInstance as unknown as {
      title: { set(v: string): void };
      save(): void;
    };

    comp.title.set('Final title');
    comp.save();

    expect(gameState.notes().length).toBe(1); // still one note
    expect(gameState.noteById(existing.id)?.title).toBe('Final title');
  });

  it('emits dismissed and writes nothing when cancelled', () => {
    const fixture = render({ linkType: 'general' });
    let dismissed = false;
    fixture.componentInstance.dismissed.subscribe(() => (dismissed = true));

    (fixture.componentInstance as unknown as { cancel(): void }).cancel();

    expect(dismissed).toBeTrue();
    expect(gameState.notes().length).toBe(0);
  });
});
