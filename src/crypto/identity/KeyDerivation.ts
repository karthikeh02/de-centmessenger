import { ethers } from 'ethers';
// @ts-ignore - noble v2 uses .js extensions in exports
import { sha256 } from '@noble/hashes/sha2';
// @ts-ignore
import { bytesToHex } from '@noble/hashes/utils';
import { ETH_DERIVATION_PATH } from '../../utils/constants';
import type { DerivedKeys } from '../../types/identity';

/**
 * Derives all cryptographic keys from a BIP-39 seed.
 * One mnemonic → identity keys + ETH wallet + peer ID.
 */
export const KeyDerivation = {
  /**
   * Derive all keys from a mnemonic phrase.
   */
  async deriveAll(mnemonic: string): Promise<DerivedKeys> {
    // Derive ETH wallet using BIP-44 standard path
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, ETH_DERIVATION_PATH);

    // Derive identity key pair from seed (different derivation path concept)
    // We hash the seed with a domain separator to get identity keys
    const seedBytes = ethers.getBytes(hdNode.privateKey);
    const identityPrivateKey = sha256(
      new Uint8Array([...new TextEncoder().encode('de-messenger-identity:'), ...seedBytes]),
    );
    const identityPublicKey = sha256(identityPrivateKey);

    // Derive peer ID from identity public key
    const peerIdBytes = sha256(
      new Uint8Array([...new TextEncoder().encode('de-messenger-peer:'), ...identityPublicKey]),
    );
    const peerId = bytesToHex(peerIdBytes).slice(0, 32);

    return {
      identityKeyPair: {
        publicKey: identityPublicKey,
        privateKey: identityPrivateKey,
      },
      ethAddress: hdNode.address,
      ethPrivateKey: hdNode.privateKey,
      peerId,
    };
  },

  /**
   * Derive only the ETH address (for display without exposing private key).
   */
  getEthAddress(mnemonic: string): string {
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, ETH_DERIVATION_PATH);
    return hdNode.address;
  },
};
