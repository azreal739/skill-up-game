import { badgeById, campaignPackSchema, helpTopicSchema } from '@academy/content-model';
import { foundationsPack } from './foundations/campaign';
import { helpTopics } from './help-topics';

/**
 * Content quality gate (15_TESTING_AND_QUALITY_STRATEGY.md): every pack must
 * validate against the schema and all cross-references must resolve.
 */
describe('content integrity', () => {
  const packs = [foundationsPack];

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
});
