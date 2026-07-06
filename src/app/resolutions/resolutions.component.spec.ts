import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResolutionsComponent } from './resolutions.component';

describe('ResolutionsComponent', () => {
  let component: ResolutionsComponent;
  let fixture: ComponentFixture<ResolutionsComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ResolutionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds a resolution', () => {
    component.newResolution = 'Learn Angular';
    component.saveResolution();
    expect(component.resolutions).toEqual(['Learn Angular']);
    expect(component.newResolution).toBe('');
  });

  it('ignores blank input', () => {
    component.newResolution = '   ';
    component.saveResolution();
    expect(component.resolutions).toEqual([]);
  });

  it('edits a resolution in place', () => {
    component.newResolution = 'Run more';
    component.saveResolution();

    component.editResolution(0);
    expect(component.isEditing).toBeTrue();
    component.newResolution = 'Run a marathon';
    component.saveResolution();

    expect(component.resolutions).toEqual(['Run a marathon']);
    expect(component.isEditing).toBeFalse();
  });

  it('deletes a resolution', () => {
    component.newResolution = 'One';
    component.saveResolution();
    component.newResolution = 'Two';
    component.saveResolution();

    component.deleteResolution(0);
    expect(component.resolutions).toEqual(['Two']);
  });

  it('migrates data from the legacy storage key', () => {
    localStorage.clear();
    localStorage.setItem('resolutions', JSON.stringify(['Old habit']));

    const migratedFixture = TestBed.createComponent(ResolutionsComponent);
    migratedFixture.detectChanges();

    expect(migratedFixture.componentInstance.resolutions).toEqual(['Old habit']);
    expect(localStorage.getItem('resolutions')).toBeNull();
  });
});
