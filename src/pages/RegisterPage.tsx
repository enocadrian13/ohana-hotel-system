import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AuthLayout from '../components/AuthLayout';
import PasswordField from '../components/PasswordField';

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError('');
    setBusy(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 250));
      const form = new FormData(formElement);
      const name = String(form.get('register-full-name')).trim();
      const email = String(form.get('register-email')).trim();
      const password = String(form.get('register-password'));
      const confirmation = String(form.get('register-confirm-password'));

      if (password.length < 8) {
        setError('Choose a password with at least 8 characters.');
      } else if (password !== confirmation) {
        setError('Those passwords do not match. Please try again.');
      } else {
        register({ name, email });
        navigate('/login', { replace: true, state: { registered: true } });
      }
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'We could not create your account.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <div className="auth-content auth-content-compact">
        <span className="eyebrow">LET’S GET STARTED</span>
        <h2>Create your account</h2>
        <p className="auth-intro">A few details and you’ll be right at home.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="register-full-name">Full name</label>
            <input className="plain-input" id="register-full-name" name="register-full-name" type="text" placeholder="Your name" autoComplete="name" required minLength={2} />
          </div>
          <div className="field">
            <label htmlFor="register-email">Email address</label>
            <input className="plain-input" id="register-email" name="register-email" type="email" placeholder="you@yourhotel.com" autoComplete="email" required />
          </div>
          <PasswordField id="register-password" label="Password" autoComplete="new-password" />
          <PasswordField id="register-confirm-password" label="Confirm password" autoComplete="new-password" />
          <label className="checkbox-label terms-label" htmlFor="register-terms">
            <input id="register-terms" name="register-terms" type="checkbox" required />
            <span>I agree to the terms and conditions</span>
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary button-full" type="submit" disabled={busy}>
            {busy ? 'Creating account…' : 'Create account'} <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </AuthLayout>
  );
}
