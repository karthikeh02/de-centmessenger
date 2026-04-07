import { MnemonicGenerator } from './MnemonicGenerator';
import { KeyDerivation } from './KeyDerivation';
import type { UserIdentity, DerivedKeys } from '../../types/identity';

export interface CreateIdentityResult {
  mnemonic: string;
  keys: DerivedKeys;
  identity: UserIdentity;
}

/**
 * High-level identity management.
 * Orchestrates mnemonic generation, key derivation, and identity creation.
 */
export const IdentityManager = {
  /**
   * Create a brand new identity (during onboarding).
   */
  async createNew(username: string): Promise<CreateIdentityResult> {
    const mnemonic = MnemonicGenerator.generate();
    const keys = await KeyDerivation.deriveAll(mnemonic);

    const identity: UserIdentity = {
      username,
      publicKey: Buffer.from(keys.identityKeyPair.publicKey).toString('hex'),
      peerId: keys.peerId,
      ethAddress: keys.ethAddress,
      createdAt: Date.now(),
    };

    return { mnemonic, keys, identity };
  },

  /**
   * Restore identity from an existing mnemonic (account recovery).
   */
  async restoreFromMnemonic(mnemonic: string, username: string): Promise<CreateIdentityResult> {
    if (!MnemonicGenerator.validate(mnemonic)) {
      throw new Error('Invalid mnemonic phrase');
    }

    const keys = await KeyDerivation.deriveAll(mnemonic);

    const identity: UserIdentity = {
      username,
      publicKey: Buffer.from(keys.identityKeyPair.publicKey).toString('hex'),
      peerId: keys.peerId,
      ethAddress: keys.ethAddress,
      createdAt: Date.now(),
    };

    return { mnemonic, keys, identity };
  },
};
