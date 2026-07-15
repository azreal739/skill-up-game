import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  Event as RouterEvent,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject } from 'rxjs';
import { RouteLoaderComponent } from './route-loader.component';

describe('RouteLoaderComponent', () => {
  let events: Subject<RouterEvent>;

  beforeEach(async () => {
    events = new Subject<RouterEvent>();
    document.documentElement.classList.add('ea-reduced-motion');

    await TestBed.configureTestingModule({
      imports: [RouteLoaderComponent],
      providers: [{ provide: Router, useValue: { events } }],
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.classList.remove('ea-reduced-motion');
    events.complete();
  });

  it('keeps the loader visible when a new navigation starts before a pending hide', fakeAsync(() => {
    const fixture = TestBed.createComponent(RouteLoaderComponent);
    fixture.detectChanges();

    events.next(new NavigationStart(1, '/first'));
    tick(140);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.route-loader')).not.toBeNull();

    events.next(new NavigationEnd(1, '/first', '/first'));
    tick(100);
    events.next(new NavigationStart(2, '/second'));

    tick(360);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.route-loader')).not.toBeNull();

    events.next(new NavigationEnd(2, '/second', '/second'));
    tick(360);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.route-loader')).toBeNull();

    fixture.destroy();
  }));
});
