import { describe, it, expect } from 'vitest';
import { buildFirebaseConfig, requiredEnv } from '../lib/firebase.js';

describe('buildFirebaseConfig', () => {
  const baseEnv = () => {
    const env = {};
    requiredEnv.forEach(k => env[k] = k + '_VAL');
    return env;
  };

  it('throws listing missing required vars', () => {
    const env = { VITE_FIREBASE_API_KEY: 'ONLY_ONE' };
    expect(() => buildFirebaseConfig(env)).toThrow(/Missing Firebase env vars/);
  });

  it('returns config when required present (optional absent)', () => {
    const env = baseEnv();
    const cfg = buildFirebaseConfig(env);
    expect(cfg.projectId).toBe('VITE_FIREBASE_PROJECT_ID_VAL');
    expect(cfg.measurementId).toBeUndefined();
  });

  it('includes measurement id when provided', () => {
    const env = baseEnv();
    env.VITE_FIREBASE_MEASUREMENT_ID = 'G-EXAMPLE';
    const cfg = buildFirebaseConfig(env);
    expect(cfg.measurementId).toBe('G-EXAMPLE');
  });
});
