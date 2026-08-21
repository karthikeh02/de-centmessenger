import { Buffer } from 'buffer';
import { ethers } from 'ethers';
// @ts-ignore - noble v2 uses .js extensions in exports
import { sha256 } from '@noble/hashes/sha2';
// @ts-ignore
import { bytesToHex } from '@noble/hashes/utils';
import { ETH_DERIVATION_PATH } from '../../utils/constants';
import type { DerivedKeys } from '../../types/identity';

/**
 * Derives all cryptographic keys from a BIP-39 seed.
 * One mnemonic -> identity keys + ETH wallet + peer ID.
 */
export const KeyDerivation = {
  async deriveAll(mnemonic: string): Promise<DerivedKeys> {
    // Ensure Buffer is available for ethers
    if (typeof globalThis.Buffer === 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }

    // Derive ETH wallet using BIP-44 standard path
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, ETH_DERIVATION_PATH);

    // Derive identity key pair from seed
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

  getEthAddress(mnemonic: string): string {
    if (typeof globalThis.Buffer === 'undefined') {
      (globalThis as any).Buffer = Buffer;
    }
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, ETH_DERIVATION_PATH);
    return hdNode.address;
  },
};
