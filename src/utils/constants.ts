export const APP_NAME = 'De Messenger';
export const APP_VERSION = '0.0.1';

// BIP-44 derivation paths
export const ETH_DERIVATION_PATH = "m/44'/60'/0'/0/0";

// Mnemonic strength (128 = 12 words, 256 = 24 words)
export const MNEMONIC_STRENGTH = 128;

// PIN constraints
export const PIN_MIN_LENGTH = 6;
export const PIN_MAX_LENGTH = 10;

// Storage keys
export const STORAGE_KEYS = {
  PIN_HASH: 'pin_hash',
  IDENTITY_PUBLIC_KEY: 'identity_public_key',
  PEER_ID: 'peer_id',
  DB_ENCRYPTION_KEY: 'db_encryption_key',
  ONBOARDING_COMPLETE: 'onboarding_complete',
} as const;
