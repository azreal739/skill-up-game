import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChessGameComponent } from './chess-game.component';

describe('ChessGameComponent', () => {
  let component: ChessGameComponent;
  let fixture: ComponentFixture<ChessGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessGameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChessGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
