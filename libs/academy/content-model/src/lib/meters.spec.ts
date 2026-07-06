import { applyConsequence, debtHealth, initialMeters, severityLabel, stabilityHealth } from './meters';

describe('platform meters', () => {
  it('starts healthy', () => {
    const meters = initialMeters();
    expect(meters.stability).toBe(100);
    expect(meters.technicalDebt).toBe(0);
    expect(severityLabel(meters)).toBe('Info');
  });

  it('applies deltas and clamps to bounds', () => {
    let meters = initialMeters();
    meters = applyConsequence(meters, { type: 'stability', delta: -30, reason: 'outage' });
    expect(meters.stability).toBe(70);
    meters = applyConsequence(meters, { type: 'stability', delta: 500, reason: 'recovery' });
    expect(meters.stability).toBe(100);
    meters = applyConsequence(meters, { type: 'severity', delta: 99, reason: 'chaos' });
    expect(severityLabel(meters)).toBe('P1');
  });

  it('maps values to health bands for the HUD', () => {
    expect(stabilityHealth(100)).toBe('healthy');
    expect(stabilityHealth(70)).toBe('degraded');
    expect(stabilityHealth(40)).toBe('unstable');
    expect(stabilityHealth(10)).toBe('critical');
    expect(debtHealth(0)).toBe('healthy');
    expect(debtHealth(80)).toBe('critical');
  });
});
