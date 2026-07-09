import { TestBed } from '@angular/core/testing';
import { ArtefactDefinition } from '@academy/content-model';
import { CodeViewerComponent } from './code-viewer.component';

function artefact(content: string): ArtefactDefinition {
  return { id: 'a1', type: 'code', title: 'Snippet', language: 'typescript', content };
}

describe('CodeViewerComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [CodeViewerComponent] }).compileComponents()
  );

  function render(content: string) {
    const fixture = TestBed.createComponent(CodeViewerComponent);
    fixture.componentInstance.artefact = artefact(content);
    fixture.componentInstance.ngOnChanges();
    fixture.detectChanges();
    return fixture;
  }

  it('offers Expand for any multi-line artefact, not only long ones', () => {
    const fixture = render('interface Customer {\n  name: string;\n}');
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.artefact__expand')).withContext('expand button').not.toBeNull();
    // Short code is not collapsed behind the fade / "show all" control.
    expect(el.querySelector('.artefact__more')).toBeNull();
  });

  it('keeps the header clean for a single-line artefact', () => {
    const fixture = render('const x = 1;');
    expect((fixture.nativeElement as HTMLElement).querySelector('.artefact__expand')).toBeNull();
  });

  it('collapses a long artefact and opens the reader modal', () => {
    const long = Array.from({ length: 20 }, (_, i) => `const line${i} = ${i};`).join('\n');
    const fixture = render(long);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.artefact__scroll--collapsed')).not.toBeNull();
    expect(el.querySelector('.artefact__more')).not.toBeNull();

    fixture.componentInstance.open();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded()).toBeTrue();
    expect(el.querySelector('.artefact-modal')).not.toBeNull();
  });
});
