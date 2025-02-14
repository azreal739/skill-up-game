import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionsComponent } from './resolutions.component';

describe('ResolutionsComponent', () => {
  let component: ResolutionsComponent;
  let fixture: ComponentFixture<ResolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
