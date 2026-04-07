import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../app/navigation/AuthNavigator';
import { useAuthStore } from '../../../store/useAuthStore';
import { PinManager } from '../../../storage/secure/PinManager';
import { SecureStore } from '../../../storage/secure/SecureStore';
import { IdentityManager } from '../../../crypto';
import { STORAGE_KEYS } from '../../../utils/constants';
import { colors, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'PinSetup'>;

export function PinSetupScreen({ navigation }: Props) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [stage, setStage] = useState<'create' | 'confirm'>('create');
  const [loading, setLoading] = useState(false);
  const { onboarding, setIdentity, clearOnboarding } = useAuthStore();

  const currentPin = stage === 'create' ? pin : confirmPin;
  const setCurrentPin = stage === 'create' ? setPin : setConfirmPin;

  function handleDigit(digit: string) {
    if (currentPin.length < 10) {
      setCurrentPin(currentPin + digit);
    }
  }

  function handleDelete() {
    setCurrentPin(currentPin.slice(0, -1));
  }

  async function handleSubmit() {
    if (stage === 'create') {
      const validation = PinManager.validateFormat(pin);
      if (!validation.valid) {
        Alert.alert('Invalid PIN', validation.error);
        return;
      }
      setStage('confirm');
      return;
    }

    // Confirm stage
    if (pin !== confirmPin) {
      Vibration.vibrate(200);
      Alert.alert('Mismatch', 'PINs do not match. Try again.');
      setConfirmPin('');
      return;
    }

    if (!onboarding) return;

    setLoading(true);
    try {
      // 1. Set up PIN (hashes and stores in Keychain)
      await PinManager.setup(pin);

      // 2. Re-derive identity and save public key
      const result = await IdentityManager.createNew(onboarding.username);
      await SecureStore.set(STORAGE_KEYS.IDENTITY_PUBLIC_KEY, result.identity.publicKey);
      await SecureStore.set(STORAGE_KEYS.PEER_ID, result.identity.peerId);
      await SecureStore.set(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');

      // 3. Store encrypted mnemonic
      await SecureStore.set('mnemonic_encrypted', onboarding.mnemonic);

      // 4. Set authenticated state
      setIdentity(result.identity);
      clearOnboarding();
    } catch (error) {
      Alert.alert('Error', 'Failed to set up identity. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 4 of 4</Text>
          <Text style={styles.title}>
            {stage === 'create' ? 'Create Your PIN' : 'Confirm Your PIN'}
          </Text>
          <Text style={styles.subtitle}>
            {stage === 'create'
              ? '6-10 digit PIN to unlock your app and encrypt your data.'
              : 'Enter the same PIN again to confirm.'}
          </Text>
        </View>

        <View style={styles.dotsContainer}>
          {Array.from({ length: Math.max(6, currentPin.length) }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i < currentPin.length && styles.dotFilled]}
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

        <TouchableOpacity
          style={[styles.button, currentPin.length < 6 && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={currentPin.length < 6 || loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Setting up...' : stage === 'create' ? 'Continue' : 'Complete Setup'}
          </Text>
        </TouchableOpacity>
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
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  step: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
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
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
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
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
  },
});
