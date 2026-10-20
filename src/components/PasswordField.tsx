import { useState } from 'react';

interface PasswordFieldProps {
  id: string;
  label: string;
  autoComplete: string;
  required?: boolean;
}

export default function PasswordField({
  id,
  label,
  autoComplete,
  required = true,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <span className="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2" /></svg>
        </span>
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          placeholder="Enter your password"
          autoComplete={autoComplete}
          required={required}
          minLength={8}
        />
        <button
          className="visibility-button"
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-controls={id}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}
