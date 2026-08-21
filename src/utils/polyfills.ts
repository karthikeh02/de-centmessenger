/**
 * Polyfills for React Native - MUST be imported before any other module.
 * Required for crypto libraries, libp2p, and IPFS to function correctly.
 */

// Provides crypto.getRandomValues() - required by BIP-39, Signal Protocol, ethers.js
import 'react-native-get-random-values';

// Buffer polyfill - required by bip39, ethers, and many Node.js-based crypto libs
import { Buffer } from 'buffer';
(globalThis as any).Buffer = Buffer;
(global as any).Buffer = Buffer;
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}
