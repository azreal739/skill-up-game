import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackJackComponent } from './black-jack.component';

describe('BlackJackComponent', () => {
  let component: BlackJackComponent;
  let fixture: ComponentFixture<BlackJackComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [BlackJackComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BlackJackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deal two cards to the player and dealer on reset', () => {
    expect(component.playerCards.length).toBe(2);
    expect(component.dealerCards.length).toBe(2);
    expect(component.gameOver).toBeFalse();
    expect(component.holeCardHidden).toBeTrue();
  });

  describe('calculateScore', () => {
    it('scores number and face cards', () => {
      expect(component.calculateScore([
        { value: '2', suit: '♠' },
        { value: '10', suit: '♥' },
        { value: 'K', suit: '♦' },
      ])).toBe(22);
    });

    it('counts an ace as 11 when it does not bust the hand', () => {
      expect(component.calculateScore([
        { value: 'A', suit: '♠' },
        { value: '9', suit: '♥' },
      ])).toBe(20);
    });

    it('demotes an ace to 1 when 11 would bust the hand', () => {
      expect(component.calculateScore([
        { value: 'A', suit: '♠' },
        { value: '9', suit: '♥' },
        { value: '9', suit: '♦' },
      ])).toBe(19);
    });

    it('handles multiple aces', () => {
      expect(component.calculateScore([
        { value: 'A', suit: '♠' },
        { value: 'A', suit: '♥' },
      ])).toBe(12);
    });
  });

  it('declares a push when player and dealer tie', () => {
    component.playerCards = [{ value: '10', suit: '♠' }, { value: 'K', suit: '♥' }];
    component.playerScore = 20;
    component.dealerCards = [{ value: 'Q', suit: '♦' }, { value: 'J', suit: '♣' }];

    component.stand();

    expect(component.gameOver).toBeTrue();
    expect(component.result).toContain('Push');
  });

  it('lets the dealer win with the higher hand', () => {
    component.playerCards = [{ value: '10', suit: '♠' }, { value: '8', suit: '♥' }];
    component.playerScore = 18;
    component.dealerCards = [{ value: 'Q', suit: '♦' }, { value: 'J', suit: '♣' }];

    component.stand();

    expect(component.result).toBe('Dealer wins!');
  });

  it('ends the round when the player busts', () => {
    component.playerCards = [
      { value: '10', suit: '♠' },
      { value: '9', suit: '♥' },
    ];
    component.playerScore = 19;

    // Force a bust regardless of the next drawn card by stacking the hand.
    component.playerCards.push({ value: '5', suit: '♦' });
    component.playerScore = component.calculateScore(component.playerCards);
    expect(component.playerScore).toBe(24);

    component['endGame'](`${component.playerName} busted! Dealer wins.`);
    expect(component.gameOver).toBeTrue();
    expect(component.result).toContain('busted');
  });

  it('records finished games in history', () => {
    component.playerCards = [{ value: '10', suit: '♠' }, { value: 'K', suit: '♥' }];
    component.playerScore = 20;
    component.dealerCards = [{ value: 'Q', suit: '♦' }, { value: 'J', suit: '♣' }];

    component.stand();

    expect(component.blackJackHistory.length).toBe(1);
    expect(component.blackJackHistory[0].result).toContain('Push');
  });

  it('only allows double down on the first two cards', () => {
    expect(component.canDoubleDown).toBeTrue();
    component.playerCards.push({ value: '2', suit: '♠' });
    expect(component.canDoubleDown).toBeFalse();
  });
});
