import { init } from '@launchdarkly/node-server-sdk';

export const ld = init(process.env.LD_SDK_KEY ?? '');
