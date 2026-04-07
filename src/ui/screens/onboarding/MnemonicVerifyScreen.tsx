import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../app/navigation/AuthNavigator';
import { useAuthStore } from '../../../store/useAuthStore';
import { colors, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'MnemonicVerify'>;

export function MnemonicVerifyScreen({ navigation }: Props) {
  const onboarding = useAuthStore((s) => s.onboarding);

  // Pick 3 random word positions to verify
  const challenges = useMemo(() => {
    const indices = Array.from({ length: 12 }, (_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).sort((a, b) => a - b);
  }, []);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentChallenge, setCurrentChallenge] = useState(0);

  if (!onboarding) return null;

  const words = onboarding.mnemonic.split(' ');

  // Generate options: correct word + 3 random wrong words
  function getOptions(wordIndex: number): string[] {
    const correctWord = words[wordIndex];
    const otherWords = words.filter((_, i) => i !== wordIndex);
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [correctWord, ...shuffledOthers].sort(() => Math.random() - 0.5);
    return options;
  }

  const options = useMemo(
    () => challenges.map((idx) => getOptions(idx)),
    [challenges],
  );

  function handleSelect(word: string) {
    const challengeIndex = challenges[currentChallenge];
    const newAnswers = { ...answers, [challengeIndex]: word };
    setAnswers(newAnswers);

    if (currentChallenge < 2) {
      setCurrentChallenge(currentChallenge + 1);
    } else {
      // Verify all answers
      const allCorrect = challenges.every((idx) => newAnswers[idx] === words[idx]);
      if (allCorrect) {
        navigation.navigate('PinSetup');
      } else {
        Alert.alert(
          'Incorrect',
          'One or more words were wrong. Please go back and review your recovery phrase.',
          [
            { text: 'Try Again', onPress: () => { setAnswers({}); setCurrentChallenge(0); } },
            { text: 'Go Back', onPress: () => navigation.goBack() },
          ],
        );
      }
    }
  }

  const activeChallenge = challenges[currentChallenge];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.step}>Step 3 of 4</Text>
          <Text style={styles.title}>Verify Your Phrase</Text>
          <Text style={styles.subtitle}>
            Select the correct word for each position to prove you saved your recovery phrase.
          </Text>

          <View style={styles.progress}>
            {challenges.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  i < currentChallenge && styles.progressComplete,
                  i === currentChallenge && styles.progressActive,
                ]}
              />
            ))}
          </View>

          <Text style={styles.question}>
            What is word #{activeChallenge + 1}?
          </Text>

          <View style={styles.options}>
            {options[currentChallenge].map((word) => (
              <TouchableOpacity
                key={word}
                style={styles.optionButton}
                onPress={() => handleSelect(word)}>
                <Text style={styles.optionText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  progress: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  progressActive: {
    backgroundColor: colors.primary,
  },
  progressComplete: {
    backgroundColor: colors.accent,
  },
  question: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: colors.card,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  optionText: {
    ...typography.body,
    color: colors.textPrimary,
    fontFamily: 'monospace',
    fontSize: 18,
  },
});
