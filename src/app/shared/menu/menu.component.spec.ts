import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageMenuComponent } from './menu.component';

describe('PageMenuComponent', () => {
  let component: PageMenuComponent;
  let fixture: ComponentFixture<PageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all games', () => {
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('li');
    const labels = Array.from(items).map((li) => li.textContent?.trim());
    expect(labels).toContain('Tic Tac Toe');
    expect(labels).toContain('Black Jack');
    expect(labels).toContain('Chess');
  });
});
