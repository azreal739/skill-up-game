import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ModalComponent } from './modal.component';
import { ModalService, ModalTemplate } from 'src/services/ModalService';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be hidden until a modal is opened', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.main')).toBeNull();

    modalService.openModal(ModalTemplate.GameHistory, { title: 'Chess' });
    fixture.detectChanges();

    expect(element.querySelector('.main')).not.toBeNull();
    expect(element.querySelector('h2')?.textContent).toContain('Chess');
  });

  it('should close when the backdrop is clicked', () => {
    modalService.openModal(ModalTemplate.GameHistory, { title: 'Chess' });
    fixture.detectChanges();

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.shield')?.click();
    fixture.detectChanges();

    expect(component.currentState.isOpen).toBeFalse();
    expect((fixture.nativeElement as HTMLElement).querySelector('.main')).toBeNull();
  });

  it('should close on Escape', () => {
    modalService.openModal(ModalTemplate.GameHistory, { title: 'Chess' });
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.currentState.isOpen).toBeFalse();
  });
});
