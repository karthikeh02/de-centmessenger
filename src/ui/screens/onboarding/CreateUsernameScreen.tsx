import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../app/navigation/AuthNavigator';
import { IdentityManager } from '../../../crypto';
import { useAuthStore } from '../../../store/useAuthStore';
import { colors, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'CreateUsername'>;

export function CreateUsernameScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const setOnboarding = useAuthStore((s) => s.setOnboarding);

  const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(username);

  async function handleContinue() {
    if (!isValid) return;

    setLoading(true);
    try {
      console.log('[CreateUsername] Generating identity for:', username);
      const result = await IdentityManager.createNew(username);
      console.log('[CreateUsername] Identity generated, ETH:', result.keys.ethAddress);
      setOnboarding({
        username,
        mnemonic: result.mnemonic,
        ethAddress: result.keys.ethAddress,
      });
      navigation.navigate('Mnemonic');
    } catch (error: any) {
      console.log('[CreateUsername] ERROR:', error?.message, error);
      Alert.alert('Error', 'Failed to generate identity: ' + (error?.message || 'Unknown'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.step}>Step 1 of 4</Text>
          <Text style={styles.title}>Choose Your Username</Text>
          <Text style={styles.subtitle}>
            This is your public identity on the network. It cannot be changed later.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.atSign}>@</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="username"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
            />
          </View>

          <Text style={styles.hint}>
            3-20 characters. Letters, numbers, and underscores only.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, (!isValid || loading) && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!isValid || loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Generating Identity...' : 'Generate Identity'}
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
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  atSign: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.textPrimary,
    paddingVertical: 16,
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 8,
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
