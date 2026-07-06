import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicTacToeComponent } from './tic-tac-toe.component';

describe('TicTacToeComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TicTacToeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('alternates players', () => {
    component.handleClick(0);
    expect(component.currentPlayer).toBe('O');
    component.handleClick(1);
    expect(component.currentPlayer).toBe('X');
  });

  it('ignores clicks on occupied squares', () => {
    component.handleClick(0); // X
    component.handleClick(0); // ignored
    expect(component.board[0]).toBe('X');
    expect(component.currentPlayer).toBe('O');
  });

  it('detects a winner and records it', () => {
    component.handleClick(0); // X
    component.handleClick(3); // O
    component.handleClick(1); // X
    component.handleClick(4); // O
    component.handleClick(2); // X wins top row

    expect(component.winner).toBe('X');
    expect(component.gameOver).toBeTrue();
    expect(component.winnerHistory[component.winnerHistory.length - 1].result).toBe('X');
  });

  it('detects a draw when the board is full with no winner', () => {
    // X: 0, 2, 3, 7, 8 — O: 1, 4, 5, 6 — no three in a row
    for (const move of [0, 1, 2, 4, 3, 5, 7, 6, 8]) {
      component.handleClick(move);
    }

    expect(component.winner).toBeNull();
    expect(component.isDraw).toBeTrue();
    expect(component.gameOver).toBeTrue();
    expect(component.winnerHistory[component.winnerHistory.length - 1].result).toBe('Draw');
  });

  it('resets the game state', () => {
    component.handleClick(0);
    component.resetGame();
    expect(component.board.every(square => square === null)).toBeTrue();
    expect(component.currentPlayer).toBe('X');
    expect(component.winner).toBeNull();
    expect(component.isDraw).toBeFalse();
  });
});
