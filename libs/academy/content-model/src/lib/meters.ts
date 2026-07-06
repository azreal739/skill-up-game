/**
 * Platform meters (03_GAMEPLAY_SYSTEMS.md): stability, technical debt,
 * incident severity and team confidence. Pure transition helpers.
 */
import { ConsequenceDefinition } from './types';

export const SEVERITY_LEVELS = ['Info', 'Low', 'Medium', 'High', 'Critical', 'P1'] as const;
export type SeverityLevel = (typeof SEVERITY_LEVELS)[number];

export interface PlatformMeters {
  /** 0..100, starts at 100. */
  stability: number;
  /** 0..100, starts at 0. */
  technicalDebt: number;
  /** Index into SEVERITY_LEVELS, starts at 0 (Info). */
  severityIndex: number;
  /** 0..100, starts at 50. */
  teamConfidence: number;
}

export function initialMeters(): PlatformMeters {
  return { stability: 100, technicalDebt: 0, severityIndex: 0, teamConfidence: 50 };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function applyConsequence(
  meters: PlatformMeters,
  consequence: ConsequenceDefinition
): PlatformMeters {
  switch (consequence.type) {
    case 'stability':
      return { ...meters, stability: clamp(meters.stability + consequence.delta, 0, 100) };
    case 'technical-debt':
      return { ...meters, technicalDebt: clamp(meters.technicalDebt + consequence.delta, 0, 100) };
    case 'severity':
      return {
        ...meters,
        severityIndex: clamp(meters.severityIndex + consequence.delta, 0, SEVERITY_LEVELS.length - 1),
      };
    case 'team-confidence':
      return { ...meters, teamConfidence: clamp(meters.teamConfidence + consequence.delta, 0, 100) };
    case 'time':
      // Time pressure is not modelled as a meter in the vertical slice.
      return meters;
  }
}

export function severityLabel(meters: PlatformMeters): SeverityLevel {
  return SEVERITY_LEVELS[meters.severityIndex];
}

export type MeterHealth = 'healthy' | 'degraded' | 'unstable' | 'critical';

/** Colour band for the stability meter (07_UI_UX_SPECIFICATION.md). */
export function stabilityHealth(stability: number): MeterHealth {
  if (stability >= 80) return 'healthy';
  if (stability >= 60) return 'degraded';
  if (stability >= 35) return 'unstable';
  return 'critical';
}

export function debtHealth(technicalDebt: number): MeterHealth {
  if (technicalDebt <= 20) return 'healthy';
  if (technicalDebt <= 45) return 'degraded';
  if (technicalDebt <= 70) return 'unstable';
  return 'critical';
}
