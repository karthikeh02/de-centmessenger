import * as bip39 from 'bip39';
import { MNEMONIC_STRENGTH } from '../../utils/constants';

/**
 * Generates and validates BIP-39 mnemonic phrases.
 * A mnemonic is the user's master key - everything derives from it.
 */
export const MnemonicGenerator = {
  /**
   * Generate a new 12-word mnemonic phrase (128 bits of entropy).
   */
  generate(): string {
    return bip39.generateMnemonic(MNEMONIC_STRENGTH);
  },

  /**
   * Validate a mnemonic phrase.
   */
  validate(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic);
  },

  /**
   * Convert mnemonic to seed bytes (for key derivation).
   */
  async toSeed(mnemonic: string): Promise<Buffer> {
    return bip39.mnemonicToSeed(mnemonic);
  },

  /**
   * Convert mnemonic to entropy hex (for compact storage).
   */
  toEntropy(mnemonic: string): string {
    return bip39.mnemonicToEntropy(mnemonic);
  },

  /**
   * Restore mnemonic from entropy hex.
   */
  fromEntropy(entropy: string): string {
    return bip39.entropyToMnemonic(entropy);
  },
};
