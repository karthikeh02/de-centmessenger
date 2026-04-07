import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useAuthStore } from '../../store/useAuthStore';
import { PinManager } from '../../storage/secure/PinManager';
import { SecureStore } from '../../storage/secure/SecureStore';
import { STORAGE_KEYS } from '../../utils/constants';
import { colors } from '../../ui/theme';

export function RootNavigator() {
  const { status, setStatus } = useAuthStore();

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const hasPin = await PinManager.isSetup();
      const hasIdentity = await SecureStore.has(STORAGE_KEYS.IDENTITY_PUBLIC_KEY);

      if (hasPin && hasIdentity) {
        setStatus('locked');
      } else {
        setStatus('onboarding');
      }
    } catch {
      setStatus('onboarding');
    }
  }

  if (status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {status === 'authenticated' ? (
        <MainNavigator />
      ) : (
        <AuthNavigator initialRoute={status === 'locked' ? 'PinEntry' : 'Welcome'} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
