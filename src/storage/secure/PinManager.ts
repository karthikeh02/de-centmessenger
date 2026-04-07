// @ts-ignore - noble v2 uses .js extensions in exports
import { sha256 } from '@noble/hashes/sha2';
// @ts-ignore
import { bytesToHex } from '@noble/hashes/utils';
import { SecureStore } from './SecureStore';
import { STORAGE_KEYS, PIN_MIN_LENGTH, PIN_MAX_LENGTH } from '../../utils/constants';

/**
 * Manages user PIN - hashing, verification, and DB encryption key derivation.
 * PIN is never stored in plaintext. We store a salted hash in the Android Keystore.
 */
export const PinManager = {
  /**
   * Validate PIN format (6-10 digits).
   */
  validateFormat(pin: string): { valid: boolean; error?: string } {
    if (!/^\d+$/.test(pin)) {
      return { valid: false, error: 'PIN must contain only digits' };
    }
    if (pin.length < PIN_MIN_LENGTH) {
      return { valid: false, error: `PIN must be at least ${PIN_MIN_LENGTH} digits` };
    }
    if (pin.length > PIN_MAX_LENGTH) {
      return { valid: false, error: `PIN must be at most ${PIN_MAX_LENGTH} digits` };
    }
    return { valid: true };
  },

  /**
   * Hash a PIN with a salt for secure storage.
   */
  hashPin(pin: string, salt: string): string {
    const data = new TextEncoder().encode(`de-messenger-pin:${salt}:${pin}`);
    return bytesToHex(sha256(data));
  },

  /**
   * Derive a database encryption key from the PIN.
   * This key is used to encrypt/decrypt the SQLCipher database.
   */
  deriveDatabaseKey(pin: string, salt: string): string {
    const data = new TextEncoder().encode(`de-messenger-dbkey:${salt}:${pin}`);
    return bytesToHex(sha256(data));
  },

  /**
   * Set up a new PIN (during onboarding).
   * Generates a random salt, hashes the PIN, stores both securely.
   */
  async setup(pin: string): Promise<boolean> {
    const validation = PinManager.validateFormat(pin);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Generate random salt
    const saltArray = new Uint8Array(16);
    crypto.getRandomValues(saltArray);
    const salt = bytesToHex(saltArray);

    // Hash PIN and derive DB key
    const pinHash = PinManager.hashPin(pin, salt);
    const dbKey = PinManager.deriveDatabaseKey(pin, salt);

    // Store in Android Keystore
    await SecureStore.set(STORAGE_KEYS.PIN_HASH, JSON.stringify({ hash: pinHash, salt }));
    await SecureStore.set(STORAGE_KEYS.DB_ENCRYPTION_KEY, dbKey);

    return true;
  },

  /**
   * Verify a PIN against the stored hash.
   */
  async verify(pin: string): Promise<boolean> {
    const stored = await SecureStore.get(STORAGE_KEYS.PIN_HASH);
    if (!stored) return false;

    const { hash, salt } = JSON.parse(stored);
    const inputHash = PinManager.hashPin(pin, salt);

    return inputHash === hash;
  },

  /**
   * Check if a PIN has been set up.
   */
  async isSetup(): Promise<boolean> {
    return SecureStore.has(STORAGE_KEYS.PIN_HASH);
  },

  /**
   * Get the database encryption key (after PIN verification).
   */
  async getDatabaseKey(): Promise<string | null> {
    return SecureStore.get(STORAGE_KEYS.DB_ENCRYPTION_KEY);
  },
};
