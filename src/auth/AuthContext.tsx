import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  getCurrentUser,
  registerProfile,
  signIn,
  signOut,
  type UserProfile,
} from '../services/authService';

interface AuthContextValue {
  user: UserProfile | null;
  login: (email: string, rememberMe: boolean) => void;
  register: (profile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => getCurrentUser());

  const value: AuthContextValue = {
    user,
    login: (email, rememberMe) => setUser(signIn(email, rememberMe)),
    register: (profile) => registerProfile(profile),
    logout: () => {
      signOut();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider.');
  return context;
}
