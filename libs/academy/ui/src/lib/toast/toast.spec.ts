import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToastHostComponent } from './toast-host.component';
import { ToastService } from './toast.service';

describe('ToastService + ToastHostComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ToastHostComponent] }).compileComponents();
  });

  it('shows a toast, then auto-dismisses it', fakeAsync(() => {
    const service = TestBed.inject(ToastService);
    const fixture = TestBed.createComponent(ToastHostComponent);
    fixture.detectChanges();

    service.show('Note saved');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Note saved');

    tick(4000);
    fixture.detectChanges();
    expect(element.textContent).not.toContain('Note saved');
  }));

  it('caps the stack and dismisses on click', fakeAsync(() => {
    const service = TestBed.inject(ToastService);
    const fixture = TestBed.createComponent(ToastHostComponent);
    fixture.detectChanges();

    service.show('one');
    service.show('two');
    service.show('three');
    service.show('four');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    // Oldest dropped to keep the stack at three.
    expect(element.textContent).not.toContain('one');
    expect(element.querySelectorAll('.toast').length).toBe(3);

    (element.querySelector('.toast__close') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(element.querySelectorAll('.toast').length).toBe(2);
    tick(4000);
  }));

  it('announce() feeds the SR-only live region without a visual toast', fakeAsync(() => {
    const service = TestBed.inject(ToastService);
    const fixture = TestBed.createComponent(ToastHostComponent);
    fixture.detectChanges();

    service.announce('Mission Control: welcome back.');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.ea-visually-hidden')?.textContent).toContain(
      'Mission Control: welcome back.'
    );
    expect(element.querySelectorAll('.toast').length).toBe(0);
    tick(4500);
    fixture.detectChanges();
    expect(element.querySelector('.ea-visually-hidden')?.textContent?.trim()).toBe('');
  }));
});
