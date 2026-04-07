import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../app/navigation/AuthNavigator';
import { useAuthStore } from '../../../store/useAuthStore';
import { colors, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Mnemonic'>;

export function MnemonicScreen({ navigation }: Props) {
  const onboarding = useAuthStore((s) => s.onboarding);
  const [revealed, setRevealed] = useState(false);

  if (!onboarding) return null;

  const words = onboarding.mnemonic.split(' ');

  function handleContinue() {
    if (!revealed) {
      Alert.alert(
        'Are you sure?',
        'You must write down your recovery phrase. If you lose it, your identity is gone forever. There is no recovery.',
        [
          { text: 'Go Back', style: 'cancel' },
          { text: 'I wrote it down', onPress: () => navigation.navigate('MnemonicVerify') },
        ],
      );
    } else {
      navigation.navigate('MnemonicVerify');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.step}>Step 2 of 4</Text>
          <Text style={styles.title}>Your Recovery Phrase</Text>
          <Text style={styles.warning}>
            Write these 12 words down on paper. This is the ONLY way to recover your identity. Never share it with anyone.
          </Text>

          <TouchableOpacity
            style={styles.revealButton}
            onPress={() => setRevealed(true)}
            disabled={revealed}>
            {!revealed ? (
              <Text style={styles.revealText}>Tap to Reveal</Text>
            ) : null}
          </TouchableOpacity>

          <View style={styles.wordGrid}>
            {words.map((word, i) => (
              <View key={i} style={styles.wordBox}>
                <Text style={styles.wordNumber}>{i + 1}</Text>
                <Text style={[styles.wordText, !revealed && styles.wordHidden]}>
                  {revealed ? word : '••••••'}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>Your ETH Address</Text>
            <Text style={styles.addressValue} numberOfLines={1}>
              {onboarding.ethAddress}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>I've Written It Down</Text>
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
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  step: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  warning: {
    ...typography.bodySmall,
    color: colors.error,
    marginBottom: 24,
  },
  revealButton: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revealText: {
    ...typography.button,
    color: colors.primary,
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  wordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordBox: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  wordNumber: {
    ...typography.caption,
    color: colors.textMuted,
    width: 20,
  },
  wordText: {
    ...typography.body,
    color: colors.textPrimary,
    fontFamily: 'monospace',
  },
  wordHidden: {
    color: colors.textMuted,
  },
  addressBox: {
    marginTop: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 4,
  },
  addressValue: {
    ...typography.mono,
    color: colors.accent,
    fontSize: 12,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
  },
});
