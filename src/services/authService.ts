export interface UserProfile {
  name: string;
  email: string;
}

const USERS_KEY = 'ohana-demo-users';
const SESSION_KEY = 'ohana-demo-session';

function readProfiles(): UserProfile[] {
  const serialized = localStorage.getItem(USERS_KEY);
  if (!serialized) return [];

  try {
    const profiles: unknown = JSON.parse(serialized);
    if (!Array.isArray(profiles)) {
      throw new Error('Saved demo profiles are not in the expected format.');
    }
    return profiles as UserProfile[];
  } catch {
    throw new Error('Unable to read saved demo profiles.');
  }
}

export function getCurrentUser(): UserProfile | null {
  const serialized = sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY);
  if (!serialized) return null;

  try {
    const user: unknown = JSON.parse(serialized);
    if (
      typeof user === 'object' &&
      user !== null &&
      'name' in user &&
      'email' in user &&
      typeof user.name === 'string' &&
      typeof user.email === 'string'
    ) {
      return { name: user.name, email: user.email };
    }
    throw new Error('Saved demo session is not in the expected format.');
  } catch {
    throw new Error('Unable to read the saved demo session.');
  }
}

export function registerProfile(profile: UserProfile): void {
  const profiles = readProfiles();
  if (profiles.some((existing) => existing.email.toLowerCase() === profile.email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  localStorage.setItem(USERS_KEY, JSON.stringify([...profiles, profile]));
}

export function signIn(email: string, rememberMe: boolean): UserProfile {
  const existing = readProfiles().find((profile) => profile.email.toLowerCase() === email.toLowerCase());
  const user = existing ?? {
    name: email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    email,
  };

  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
  (rememberMe ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export function signOut(): void {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}
