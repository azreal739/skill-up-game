import {
  ChallengeDefinition,
  badgeById,
  campaignPackSchema,
  helpTopicSchema,
} from '@academy/content-model';
import { foundationsPack } from './foundations/campaign';
import { componentForgePack } from './component-forge/campaign';
import { typescriptTrialsPack } from './typescript-trials/campaign';
import { zodGatePack } from './zod-gate/campaign';
import { nxMonorepoMazePack } from './nx-monorepo-maze/campaign';
import { apiContractCrisisPack } from './api-contract-crisis/campaign';
import { cloudfrontOutagePack } from './cloudfront-outage/campaign';
import { saveProductionPack } from './save-production/campaign';
import { helpTopics } from './help-topics';

/**
 * Content quality gate (15_TESTING_AND_QUALITY_STRATEGY.md): every pack must
 * validate against the schema and all cross-references must resolve.
 */
describe('content integrity', () => {
  const packs = [
    foundationsPack,
    componentForgePack,
    typescriptTrialsPack,
    zodGatePack,
    nxMonorepoMazePack,
    apiContractCrisisPack,
    cloudfrontOutagePack,
    saveProductionPack,
  ];

  it('validates every campaign pack against the Zod schema', () => {
    for (const pack of packs) {
      const result = campaignPackSchema.safeParse(pack);
      expect(result.success)
        .withContext(JSON.stringify(result.success ? '' : result.error.issues))
        .toBeTrue();
    }
  });

  it('validates every help topic against the Zod schema', () => {
    for (const topic of helpTopics) {
      expect(helpTopicSchema.safeParse(topic).success).withContext(topic.id).toBeTrue();
    }
  });

  it('uses globally unique campaign, mission and challenge IDs', () => {
    const ids = new Set<string>();
    for (const pack of packs) {
      expect(ids.has(pack.campaign.id)).withContext(pack.campaign.id).toBeFalse();
      ids.add(pack.campaign.id);
      for (const mission of pack.missions) {
        expect(ids.has(mission.id)).withContext(mission.id).toBeFalse();
        ids.add(mission.id);
        for (const challenge of mission.challenges) {
          expect(ids.has(challenge.id)).withContext(challenge.id).toBeFalse();
          ids.add(challenge.id);
        }
      }
    }
  });

  it('lists exactly its own missions in each campaign, in order', () => {
    for (const pack of packs) {
      expect(pack.missions.map((mission) => mission.id)).toEqual(pack.campaign.missions);
      for (const mission of pack.missions) {
        expect(mission.campaignId).toBe(pack.campaign.id);
      }
    }
  });

  it('resolves every help link to an existing help topic', () => {
    const topicIds = new Set(helpTopics.map((topic) => topic.id));
    for (const pack of packs) {
      for (const mission of pack.missions) {
        for (const challenge of mission.challenges) {
          for (const link of challenge.helpLinks) {
            expect(topicIds.has(link.topicId))
              .withContext(`${challenge.id} → ${link.topicId}`)
              .toBeTrue();
          }
        }
      }
    }
  });

  it('awards only badges that exist in the catalogue', () => {
    for (const pack of packs) {
      const rewards = [
        ...pack.campaign.rewards,
        ...pack.missions.flatMap((mission) => [
          ...mission.rewards,
          ...mission.challenges.flatMap((challenge) => challenge.rewards),
        ]),
      ];
      for (const reward of rewards) {
        if (reward.type === 'badge') {
          expect(reward.id).withContext(reward.label).toBeDefined();
          expect(badgeById(reward.id as string))
            .withContext(`badge ${reward.id}`)
            .toBeDefined();
        }
      }
    }
  });

  it('gives every help topic a unique ID', () => {
    const ids = helpTopics.map((topic) => topic.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ships Campaign 1 complete: 10 missions ending in the boss', () => {
    expect(foundationsPack.missions.length).toBe(10);
    const last = foundationsPack.missions[foundationsPack.missions.length - 1];
    expect(last.difficulty).toBe('boss');
    expect(foundationsPack.missions.slice(0, -1).every((m) => m.difficulty !== 'boss')).toBeTrue();
  });

  it('every non-boss mission list ends in exactly one boss', () => {
    for (const pack of packs) {
      const missions = pack.missions;
      expect(missions[missions.length - 1].difficulty)
        .withContext(`${pack.campaign.id} should end in a boss`)
        .toBe('boss');
      expect(missions.slice(0, -1).every((m) => m.difficulty !== 'boss'))
        .withContext(`${pack.campaign.id} should have only one boss`)
        .toBeTrue();
    }
  });

  it('chains campaigns into a linear progression', () => {
    const chain: Record<string, string | undefined> = {
      foundations: undefined,
      'component-forge': 'foundations',
      'typescript-trials': 'component-forge',
      'zod-gate': 'typescript-trials',
      'nx-monorepo-maze': 'zod-gate',
      'api-contract-crisis': 'nx-monorepo-maze',
      'cloudfront-outage': 'api-contract-crisis',
      'save-production': 'cloudfront-outage',
    };
    for (const pack of packs) {
      expect(pack.campaign.requiredCampaignId)
        .withContext(pack.campaign.id)
        .toBe(chain[pack.campaign.id]);
    }
  });

  it('points every requiredCampaignId at a campaign that exists', () => {
    const ids = new Set(packs.map((pack) => pack.campaign.id));
    for (const pack of packs) {
      const required = pack.campaign.requiredCampaignId;
      if (required) {
        expect(ids.has(required)).withContext(`${pack.campaign.id} → ${required}`).toBeTrue();
      }
    }
  });

  const allChallenges = (): ChallengeDefinition[] =>
    packs.flatMap((pack) => pack.missions.flatMap((mission) => mission.challenges));

  const selectables = (challenge: ChallengeDefinition) =>
    challenge.type === 'code-review' ? challenge.findings : challenge.options;

  it('matches every challenge selection model to its correct-option count', () => {
    // Single-select UIs can only ever submit one ID, so exactly one option may
    // be correct; multi-select needs at least two or it should be single.
    for (const challenge of allChallenges()) {
      const correct = selectables(challenge).filter((option) => option.isCorrect).length;
      const multi = challenge.type === 'code-review' || challenge.multiSelect === true;
      if (multi) {
        expect(correct)
          .withContext(`${challenge.id} is multi-select but has ${correct} correct`)
          .toBeGreaterThanOrEqual(challenge.type === 'code-review' ? 1 : 2);
      } else {
        expect(correct)
          .withContext(`${challenge.id} is single-select but has ${correct} correct options`)
          .toBe(1);
      }
    }
  });

  it('gives every challenge at least one correct and one incorrect option', () => {
    for (const challenge of allChallenges()) {
      const options = selectables(challenge);
      expect(options.some((option) => option.isCorrect)).withContext(challenge.id).toBeTrue();
      expect(options.some((option) => !option.isCorrect)).withContext(challenge.id).toBeTrue();
    }
  });

  it('applies consequences that punish failure, never reward it', () => {
    // The engine applies challenge consequences only on wrong answers
    // (MissionSessionService.submit), so every delta must model harm:
    // stability/team-confidence drop, technical debt rises, severity climbs
    // by one step (it is an index into the 6 severity levels).
    for (const challenge of allChallenges()) {
      for (const consequence of challenge.consequences) {
        const context = `${challenge.id} → ${consequence.type} ${consequence.delta}`;
        switch (consequence.type) {
          case 'stability':
          case 'team-confidence':
            expect(consequence.delta).withContext(context).toBeLessThan(0);
            break;
          case 'technical-debt':
            expect(consequence.delta).withContext(context).toBeGreaterThan(0);
            break;
          case 'severity':
            expect([1, 2]).withContext(context).toContain(consequence.delta);
            break;
          case 'time':
            break;
        }
      }
    }
  });

  it('gives every challenge a complete hint ladder (levels 1-4)', () => {
    for (const challenge of allChallenges()) {
      const levels = challenge.hints.map((hint) => hint.level).sort();
      expect(levels).withContext(challenge.id).toEqual([1, 2, 3, 4]);
    }
  });
});
