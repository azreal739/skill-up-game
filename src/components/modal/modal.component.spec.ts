import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpModalComponent } from './modal.component';

describe('SignUpModalComponent', () => {
  let component: SignUpModalComponent;
  let fixture: ComponentFixture<SignUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
