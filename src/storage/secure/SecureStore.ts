import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '../../utils/constants';
import { logger } from '../../utils/logger';

/**
 * Secure key-value storage backed by Android Keystore / iOS Keychain.
 * Used for storing PIN hashes, encryption keys, and other secrets.
 * Hardware-backed security - keys never leave the secure enclave.
 */
export const SecureStore = {
  async set(key: string, value: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(key, value, { service: key });
      return true;
    } catch (error) {
      logger.error('SecureStore.set failed:', error);
      return false;
    }
  },

  async get(key: string): Promise<string | null> {
    try {
      const result = await Keychain.getGenericPassword({ service: key });
      if (result) {
        return result.password;
      }
      return null;
    } catch (error) {
      logger.error('SecureStore.get failed:', error);
      return null;
    }
  },

  async remove(key: string): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword({ service: key });
      return true;
    } catch (error) {
      logger.error('SecureStore.remove failed:', error);
      return false;
    }
  },

  async has(key: string): Promise<boolean> {
    const value = await SecureStore.get(key);
    return value !== null;
  },
};
