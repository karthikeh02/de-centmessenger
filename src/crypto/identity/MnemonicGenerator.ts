import { Buffer } from 'buffer';
import * as bip39 from 'bip39';
import { MNEMONIC_STRENGTH } from '../../utils/constants';

/**
 * Generates and validates BIP-39 mnemonic phrases.
 * A mnemonic is the user's master key - everything derives from it.
 */
export const MnemonicGenerator = {
  generate(): string {
    // Ensure Buffer is available for bip39
    if (typeof globalThis.Buffer === 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }
    return bip39.generateMnemonic(MNEMONIC_STRENGTH);
  },

  validate(mnemonic: string): boolean {
    if (typeof globalThis.Buffer === 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }
    return bip39.validateMnemonic(mnemonic);
  },

  async toSeed(mnemonic: string): Promise<Uint8Array> {
    if (typeof globalThis.Buffer === 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }
    const buf = await bip39.mnemonicToSeed(mnemonic);
    return new Uint8Array(buf);
  },

  toEntropy(mnemonic: string): string {
    if (typeof globalThis.Buffer === 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }
    return bip39.mnemonicToEntropy(mnemonic);
  },

  fromEntropy(entropy: string): string {
    if (typeof globalThis.Buffer === 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }
    return bip39.entropyToMnemonic(entropy);
  },
};
