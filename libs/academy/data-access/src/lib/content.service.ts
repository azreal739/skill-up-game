import { Injectable } from '@angular/core';
import {
  CampaignDefinition,
  CampaignPack,
  ChallengeDefinition,
  HelpTopic,
  MissionDefinition,
  campaignPackSchema,
  helpTopicSchema,
} from '@academy/content-model';
import { foundationsPack, helpTopics } from '@academy/content';
import { z } from 'zod';

/**
 * Loads and validates all game content at startup. Content that fails Zod
 * validation is rejected loudly with the offending content ID — the game
 * teaches boundary validation, so it practises it (11_TECHNICAL_ARCHITECTURE.md).
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly packs: CampaignPack[];
  private readonly topics: HelpTopic[];
  private readonly missionIndex = new Map<string, MissionDefinition>();

  constructor() {
    this.packs = [foundationsPack].map((pack) => this.validatePack(pack));
    this.topics = helpTopics.map((topic) => this.validateTopic(topic));

    for (const pack of this.packs) {
      for (const mission of pack.missions) {
        this.missionIndex.set(mission.id, mission);
      }
    }
  }

  campaigns(): CampaignDefinition[] {
    return this.packs.map((pack) => pack.campaign);
  }

  campaignById(campaignId: string): CampaignDefinition | undefined {
    return this.campaigns().find((campaign) => campaign.id === campaignId);
  }

  missionsForCampaign(campaignId: string): MissionDefinition[] {
    const campaign = this.campaignById(campaignId);
    if (!campaign) {
      return [];
    }
    return campaign.missions
      .map((missionId) => this.missionIndex.get(missionId))
      .filter((mission): mission is MissionDefinition => mission !== undefined);
  }

  missionById(missionId: string): MissionDefinition | undefined {
    return this.missionIndex.get(missionId);
  }

  challengeById(missionId: string, challengeId: string): ChallengeDefinition | undefined {
    return this.missionById(missionId)?.challenges.find((c) => c.id === challengeId);
  }

  helpTopics(): HelpTopic[] {
    return this.topics;
  }

  helpTopicById(topicId: string): HelpTopic | undefined {
    return this.topics.find((topic) => topic.id === topicId);
  }

  searchHelp(query: string): HelpTopic[] {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return this.topics;
    }
    return this.topics.filter((topic) =>
      [topic.title, topic.summary, topic.content, topic.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(trimmed)
    );
  }

  private validatePack(pack: CampaignPack): CampaignPack {
    const result = campaignPackSchema.safeParse(pack);
    if (!result.success) {
      this.reportContentError(`campaign pack '${pack.campaign?.id ?? 'unknown'}'`, result.error);
    }
    return result.data as CampaignPack;
  }

  private validateTopic(topic: HelpTopic): HelpTopic {
    const result = helpTopicSchema.safeParse(topic);
    if (!result.success) {
      this.reportContentError(`help topic '${topic.id ?? 'unknown'}'`, result.error);
    }
    return result.data as HelpTopic;
  }

  private reportContentError(contentId: string, error: z.ZodError): never {
    console.error(`[content] validation failed for ${contentId}`, error.issues);
    throw new Error(`Invalid game content: ${contentId}`);
  }
}
