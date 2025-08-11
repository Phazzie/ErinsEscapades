import { describe, it, expect } from 'vitest';
import { prepareInitialSession, touchSession } from '../lib/sessionService';

describe('sessionService', () => {
  it('creates initial session with default vibe', () => {
    const s = prepareInitialSession('user1');
    expect(s.owner).toBe('user1');
    expect(s.vibes.default).toBeDefined();
    expect(Array.isArray(s.vibes.default)).toBe(true);
  });
  it('updates timestamp on touchSession', () => {
    const s = prepareInitialSession();
    const first = s.updatedAt;
    const updated = touchSession(s);
    expect(updated.updatedAt).toBeGreaterThanOrEqual(first);
  });
});
