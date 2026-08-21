import { MnemonicGenerator } from './MnemonicGenerator';
import { KeyDerivation } from './KeyDerivation';
// @ts-ignore
import { bytesToHex } from '@noble/hashes/utils';
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
  async createNew(username: string): Promise<CreateIdentityResult> {
    const mnemonic = MnemonicGenerator.generate();
    const keys = await KeyDerivation.deriveAll(mnemonic);

    const identity: UserIdentity = {
      username,
      publicKey: bytesToHex(keys.identityKeyPair.publicKey),
      peerId: keys.peerId,
      ethAddress: keys.ethAddress,
      createdAt: Date.now(),
    };

    return { mnemonic, keys, identity };
  },

  async restoreFromMnemonic(mnemonic: string, username: string): Promise<CreateIdentityResult> {
    if (!MnemonicGenerator.validate(mnemonic)) {
      throw new Error('Invalid mnemonic phrase');
    }

    const keys = await KeyDerivation.deriveAll(mnemonic);

    const identity: UserIdentity = {
      username,
      publicKey: bytesToHex(keys.identityKeyPair.publicKey),
      peerId: keys.peerId,
      ethAddress: keys.ethAddress,
      createdAt: Date.now(),
    };

    return { mnemonic, keys, identity };
  },
};
