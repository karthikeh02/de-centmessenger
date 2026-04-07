import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../../ui/screens/onboarding/WelcomeScreen';
import { CreateUsernameScreen } from '../../ui/screens/onboarding/CreateUsernameScreen';
import { MnemonicScreen } from '../../ui/screens/onboarding/MnemonicScreen';
import { MnemonicVerifyScreen } from '../../ui/screens/onboarding/MnemonicVerifyScreen';
import { PinSetupScreen } from '../../ui/screens/onboarding/PinSetupScreen';
import { PinEntryScreen } from '../../ui/screens/auth/PinEntryScreen';
import { colors } from '../../ui/theme';

export type AuthStackParamList = {
  Welcome: undefined;
  CreateUsername: undefined;
  Mnemonic: undefined;
  MnemonicVerify: undefined;
  PinSetup: undefined;
  PinEntry: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator({ initialRoute }: { initialRoute: 'Welcome' | 'PinEntry' }) {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CreateUsername" component={CreateUsernameScreen} />
      <Stack.Screen name="Mnemonic" component={MnemonicScreen} />
      <Stack.Screen name="MnemonicVerify" component={MnemonicVerifyScreen} />
      <Stack.Screen name="PinSetup" component={PinSetupScreen} />
      <Stack.Screen name="PinEntry" component={PinEntryScreen} />
    </Stack.Navigator>
  );
}
