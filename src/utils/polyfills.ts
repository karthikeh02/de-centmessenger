/**
 * Polyfills for React Native - MUST be imported before any other module.
 * Required for crypto libraries, libp2p, and IPFS to function correctly.
 */

// Provides crypto.getRandomValues() - required by BIP-39, Signal Protocol, ethers.js
import 'react-native-get-random-values';
