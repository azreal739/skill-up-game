import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpFormComponent } from './sign-up-form.component';
import { LocalStorageKey } from 'src/services/LocalStorageService';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [SignUpFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rejects an invalid form', () => {
    component.form.setValue({ name: '', email: 'not-an-email', password: 'short' });
    component.onSubmit();

    expect(component.signedUpName).toBe('');
    expect(localStorage.getItem(LocalStorageKey.signedUpUser)).toBeNull();
  });

  it('stores the user and shows the success state on valid submit', () => {
    component.form.setValue({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'supersecret',
    });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.signedUpName).toBe('Ada Lovelace');
    const stored = JSON.parse(localStorage.getItem(LocalStorageKey.signedUpUser) ?? 'null');
    expect(stored).toEqual({ name: 'Ada Lovelace', email: 'ada@example.com' });
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Welcome aboard');
  });

  it('emits formSubmitted when the success state is dismissed', () => {
    spyOn(component.formSubmitted, 'emit');
    component.done();
    expect(component.formSubmitted.emit).toHaveBeenCalled();
  });
});
