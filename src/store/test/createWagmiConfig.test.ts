import { optimismSepolia } from 'viem/chains';
import { createWagmiConfig } from '../createWagmiConfig';
import { Environment, EnvironmentKeys } from '../environment';

describe('createWagmiConfig', () => {
  const OLD_ENV = process.env;

  /** reference: https://stackoverflow.com/a/48042799 */
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it.each([
    Environment.localhost,
    Environment.development,
    Environment.staging,
    Environment.production,
  ])('returns valid Wagmi config when env=%s', (environment) => {
    process.env[EnvironmentKeys.environment] = environment;
    const config = createWagmiConfig('https://sepolia.optimism.io');
    expect(config.chains[0].id).toEqual(optimismSepolia.id);
  });
});
