import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent (Engineering Academy shell)', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => localStorage.clear());

  it('creates the shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the brand and Help Centre link without a profile', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Engineering Academy');
    expect(element.textContent).toContain('Help Centre');
    expect(element.textContent).not.toContain('Campaigns');
  });
});
