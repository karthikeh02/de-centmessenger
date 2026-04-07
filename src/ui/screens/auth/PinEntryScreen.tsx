import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PinManager } from '../../../storage/secure/PinManager';
import { SecureStore } from '../../../storage/secure/SecureStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { STORAGE_KEYS } from '../../../utils/constants';
import { colors, typography } from '../../theme';

export function PinEntryScreen() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const setIdentity = useAuthStore((s) => s.setIdentity);

  function handleDigit(digit: string) {
    if (pin.length < 10) {
      const newPin = pin + digit;
      setPin(newPin);
      setError('');

      // Auto-submit when 6+ digits entered
      if (newPin.length >= 6) {
        verifyPin(newPin);
      }
    }
  }

  function handleDelete() {
    setPin(pin.slice(0, -1));
    setError('');
  }

  async function verifyPin(enteredPin: string) {
    setLoading(true);
    try {
      const isValid = await PinManager.verify(enteredPin);
      if (isValid) {
        // Load identity from secure storage
        const publicKey = await SecureStore.get(STORAGE_KEYS.IDENTITY_PUBLIC_KEY);
        const peerId = await SecureStore.get(STORAGE_KEYS.PEER_ID);

        if (publicKey && peerId) {
          setIdentity({
            username: '', // Will be loaded from DB later
            publicKey,
            peerId,
            ethAddress: '', // Will be loaded from DB later
            createdAt: 0,
          });
        }
      } else {
        Vibration.vibrate(300);
        setAttempts(attempts + 1);
        setError(attempts >= 2 ? `Wrong PIN (${attempts + 1} attempts)` : 'Wrong PIN');
        setPin('');
      }
    } catch {
      setError('Verification failed');
      setPin('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>De</Text>
          <Text style={styles.title}>Enter PIN</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <View style={styles.dotsContainer}>
          {Array.from({ length: Math.max(6, pin.length) }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < pin.length && styles.dotFilled,
                error && styles.dotError,
              ]}
            />
          ))}
        </View>

        <View style={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((key) => (
            <TouchableOpacity
              key={key || 'empty'}
              style={[styles.key, key === '' && styles.keyEmpty]}
              disabled={key === '' || loading}
              onPress={() => {
                if (key === 'del') handleDelete();
                else if (key !== '') handleDigit(key);
              }}>
              <Text style={styles.keyText}>
                {key === 'del' ? '⌫' : key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  error: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  dotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dotError: {
    borderColor: colors.error,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 20,
  },
  key: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  keyEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  keyText: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});
