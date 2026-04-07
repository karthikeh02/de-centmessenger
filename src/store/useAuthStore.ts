import { create } from 'zustand';
import type { UserIdentity } from '../types/identity';

type AuthStatus = 'loading' | 'onboarding' | 'locked' | 'authenticated';

interface AuthState {
  status: AuthStatus;
  identity: UserIdentity | null;
  // Temporary state during onboarding
  onboarding: {
    username: string;
    mnemonic: string;
    ethAddress: string;
  } | null;

  setStatus: (status: AuthStatus) => void;
  setIdentity: (identity: UserIdentity) => void;
  setOnboarding: (data: { username: string; mnemonic: string; ethAddress: string }) => void;
  clearOnboarding: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  identity: null,
  onboarding: null,

  setStatus: (status) => set({ status }),
  setIdentity: (identity) => set({ identity, status: 'authenticated' }),
  setOnboarding: (data) => set({ onboarding: data }),
  clearOnboarding: () => set({ onboarding: null }),
  reset: () => set({ status: 'onboarding', identity: null, onboarding: null }),
}));
