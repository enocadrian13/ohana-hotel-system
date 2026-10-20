import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="eyebrow">OHANA HOTEL SYSTEM</span>
      <h1>That page wandered off.</h1>
      <p>We couldn’t find what you were looking for.</p>
      <Link className="button button-primary" to="/login">Return to sign in <span aria-hidden="true">→</span></Link>
    </main>
  );
}
