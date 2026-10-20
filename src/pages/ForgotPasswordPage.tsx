import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function ForgotPasswordPage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 250));
      setSubmitted(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <div className="auth-content">
        <Link className="back-link" to="/login"><span aria-hidden="true">←</span> Back to sign in</Link>
        <span className="eyebrow">ACCOUNT RECOVERY</span>
        <h2>Forgot your password?</h2>
        <p className="auth-intro">It happens. Enter your email and we’ll help you get back in.</p>
        {submitted ? (
          <div className="notice notice-info" role="status">
            <strong>Password recovery isn’t configured yet.</strong>
            <p>This demo has no email service, so no reset link was sent. Contact your system administrator for help.</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="forgot-password-email">Email address</label>
              <input className="plain-input" id="forgot-password-email" name="forgot-password-email" type="email" placeholder="you@yourhotel.com" autoComplete="email" required />
            </div>
            <button className="button button-primary button-full" type="submit" disabled={busy}>
              {busy ? 'Checking…' : 'Continue'} <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
        <p className="auth-switch auth-switch-recovery">Remembered your password? <Link to="/login">Sign in</Link></p>
      </div>
    </AuthLayout>
  );
}
