import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChessboardJsComponent } from './chessboard-js.component';

describe('ChessboardJsComponent', () => {
  let component: ChessboardJsComponent;
  let fixture: ComponentFixture<ChessboardJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessboardJsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChessboardJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
