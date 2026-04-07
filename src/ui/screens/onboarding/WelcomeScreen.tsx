import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../app/navigation/AuthNavigator';
import { colors, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>De</Text>
          <Text style={styles.logoSub}>Messenger</Text>
          <Text style={styles.tagline}>Own Your Chats. No One Else Can.</Text>
        </View>

        <View style={styles.features}>
          <FeatureItem icon="🔐" text="Military-grade E2E encryption" />
          <FeatureItem icon="🌐" text="Fully decentralized - no servers" />
          <FeatureItem icon="👤" text="No phone or email required" />
          <FeatureItem icon="⚡" text="Peer-to-peer lightning fast" />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('CreateUsername')}>
            <Text style={styles.primaryButtonText}>Create New Identity</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              // TODO: Restore flow
            }}>
            <Text style={styles.secondaryButtonText}>Restore from Mnemonic</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Powered by Zan Services</Text>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
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
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
  },
  logoSub: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.textPrimary,
    marginTop: -8,
    letterSpacing: 4,
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 12,
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 14,
  },
  featureText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  buttons: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.background,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.textSecondary,
  },
  footer: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
