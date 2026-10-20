import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AuthLayout from '../components/AuthLayout';
import PasswordField from '../components/PasswordField';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const registered = Boolean((location.state as { registered?: boolean } | null)?.registered);
  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError('');
    setBusy(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 250));
      const form = new FormData(formElement);
      login(String(form.get('login-email')), form.get('login-remember-me') === 'on');
      navigate('/dashboard', { replace: true });
    } catch {
      setError('We could not sign you in. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <div className="auth-content">
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to your account</h2>
        <p className="auth-intro">Your hotel, all in one place. Let’s pick up where you left off.</p>
        {registered && <p className="success-message" role="status">Account created. You can now sign in with your email and password.</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-email">Email address</label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
              </span>
              <input id="login-email" name="login-email" type="email" placeholder="you@yourhotel.com" autoComplete="email" required />
            </div>
          </div>
          <PasswordField id="login-password" label="Password" autoComplete="current-password" />
          <div className="form-options">
            <label className="checkbox-label" htmlFor="login-remember-me">
              <input id="login-remember-me" name="login-remember-me" type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary button-full" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'} <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="auth-switch">New to Ohana? <Link to="/register">Create an account</Link></p>
        <p className="demo-note">Demo access: use any valid email and a password of at least 8 characters.</p>
      </div>
    </AuthLayout>
  );
}
