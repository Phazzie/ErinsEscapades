// Session service abstraction: creation & timestamp updates
export function prepareInitialSession(userId) {
  return {
    owner: userId || 'anonymous',
    vibes: {
      default: [
        { id: 1, text: 'Come Over', choice: null },
        { id: 2, text: 'Get Offensively High', choice: null },
        { id: 3, text: 'Solidify Permanent Spot on the Cereal List', choice: null }
      ]
    },
    currentVibe: 'default',
    updatedAt: Date.now()
  };
}

export function touchSession(session) {
  return { ...session, updatedAt: Date.now() };
}
