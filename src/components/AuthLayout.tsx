import type { ReactNode } from 'react';
import Brand from './Brand';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Welcome to Ohana">
        <Brand light />
        <div className="visual-message">
          <span className="eyebrow">A warmer way to welcome</span>
          <h1>Hospitality,<br />at the heart of it all.</h1>
          <p>Thoughtful stays begin with thoughtful management. Make every guest feel at home.</p>
        </div>
        <div className="visual-caption">
          <span className="caption-line" />
          <span>MADE FOR MOMENTS THAT MATTER</span>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-panel-brand"><Brand /></div>
        {children}
        <p className="auth-footer">© 2026 Ohana Hotel System <span>·</span> Made with care</p>
      </section>
    </main>
  );
}
