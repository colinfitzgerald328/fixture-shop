// The flag client. Production sets `client` to the LaunchDarkly server SDK; tests leave
// it unset, so every flag reads its fallback.
export const flags = {
  client: null,
  async variation(key, context, fallback) {
    return this.client ? this.client.variation(key, context, fallback) : fallback;
  },
};
