import { Link } from 'react-router-dom';

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand${light ? ' brand-light' : ''}`} to="/" aria-label="Ohana home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M7 31V18.5L20 8l13 10.5V31H7Z" />
          <path d="M15 31v-9h10v9M5 18l15-12 15 12" />
        </svg>
      </span>
      <span className="brand-copy">
        <strong>ohana</strong>
        <span>HOTEL SYSTEM</span>
      </span>
    </Link>
  );
}
