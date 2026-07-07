import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree, provideRouter } from '@angular/router';
import { GameStateService } from '@academy/data-access';
import { missionUnlockedGuard, profileGuard } from './app.routes';

function snapshotFor(missionId: string): ActivatedRouteSnapshot {
  return { paramMap: { get: () => missionId } } as unknown as ActivatedRouteSnapshot;
}

describe('route guards', () => {
  let gameState: GameStateService;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    gameState = TestBed.inject(GameStateService);
    router = TestBed.inject(Router);
  });

  afterEach(() => localStorage.clear());

  const runProfileGuard = () =>
    TestBed.runInInjectionContext(() => profileGuard(snapshotFor(''), {} as never)) as
      | boolean
      | UrlTree;

  const runMissionGuard = (missionId: string) =>
    TestBed.runInInjectionContext(() =>
      missionUnlockedGuard(snapshotFor(missionId), {} as never)
    ) as boolean | UrlTree;

  const asUrl = (result: boolean | UrlTree) =>
    result instanceof UrlTree ? result.toString() : result;

  describe('profileGuard', () => {
    it('redirects to landing when there is no profile', () => {
      expect(asUrl(runProfileGuard())).toBe(router.parseUrl('/').toString());
    });

    it('allows access with a profile', () => {
      gameState.createProfile('Avery');
      expect(runProfileGuard()).toBeTrue();
    });
  });

  describe('missionUnlockedGuard', () => {
    beforeEach(() => gameState.createProfile('Avery'));

    it('allows a mission in an unlocked campaign', () => {
      expect(runMissionGuard('foundations-001-welcome')).toBeTrue();
    });

    it('redirects a mission in a locked campaign to the hub', () => {
      expect(asUrl(runMissionGuard('zod-gate-001-runtime-boundary'))).toBe(
        router.parseUrl('/campaigns').toString()
      );
    });

    it('allows the locked campaign once its prerequisite is complete', () => {
      for (const id of [
        'foundations-001-welcome',
        'foundations-002-first-component',
        'foundations-003-type-safety',
        'foundations-004-broken-card',
        'foundations-005-binding-the-signal',
        'foundations-006-input-output-relay',
        'foundations-007-scss-containment',
        'foundations-008-git-checkpoint',
        'foundations-009-first-test-run',
        'foundations-010-boss-launch-dashboard',
      ]) {
        gameState.completeMission(
          { missionId: id, scoreRatio: 1, xpEarned: 10, perfect: true, noHints: true },
          []
        );
      }
      expect(runMissionGuard('zod-gate-001-runtime-boundary')).toBeTrue();
    });

    it('allows an unknown mission through to its not-found state', () => {
      expect(runMissionGuard('does-not-exist')).toBeTrue();
    });
  });
});
