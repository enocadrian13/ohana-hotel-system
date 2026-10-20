import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Brand from '../components/Brand';

const activities = [
  { initials: 'SC', name: 'Sophie Chen', detail: 'Deluxe Ocean Suite · #208', status: 'Checked in', tone: 'green', time: '10:42 AM' },
  { initials: 'MR', name: 'Mateo Rivera', detail: 'Garden King · #114', status: 'Arriving today', tone: 'gold', time: '9:18 AM' },
  { initials: 'AP', name: 'Amara Patel', detail: 'Family Villa · #302', status: 'Confirmed', tone: 'blue', time: 'Yesterday' },
  { initials: 'JW', name: 'James Wilson', detail: 'Coastal Twin · #106', status: 'Checked out', tone: 'gray', time: 'Yesterday' },
];

const navigation = [
  { label: 'Overview', icon: '⌂', active: true },
  { label: 'Room management', icon: '▦' },
  { label: 'Reservations', icon: '▤' },
  { label: 'Guests', icon: '♧' },
  { label: 'Payments', icon: '◇' },
  { label: 'Reports', icon: '▥' },
];

const todayLabel = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date()).toUpperCase();

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Overview');
  const [notice, setNotice] = useState('');
  const firstName = user?.name.split(' ')[0] || 'there';
  const initials = user?.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase() || 'OH';

  function handleNavigation(label: string) {
    setActiveNav(label);
    if (label !== 'Overview') setNotice(`${label} is coming soon. This demo currently includes the overview dashboard.`);
    else setNotice('');
  }

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <Brand />
        <div className="sidebar-section">
          <span className="sidebar-heading">HOTEL</span>
          <button className="property-switcher" type="button" onClick={() => setNotice('Property switching is not available in this demo.')}>
            <span className="property-avatar">O</span>
            <span className="property-copy"><strong>Ohana Bay Resort</strong><small>Honolulu, Hawaii</small></span>
            <span className="chevron" aria-hidden="true">⌄</span>
          </button>
        </div>
        <nav className="side-nav" aria-label="Main navigation">
          <span className="sidebar-heading">WORKSPACE</span>
          {navigation.map((item) => (
            <button
              className={`nav-item${activeNav === item.label ? ' active' : ''}`}
              key={item.label}
              type="button"
              title={item.label}
              aria-label={item.label}
              aria-current={activeNav === item.label ? 'page' : undefined}
              onClick={() => handleNavigation(item.label)}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}
              {item.label === 'Reservations' && <span className="nav-count">8</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item" type="button" title="Settings" aria-label="Settings" onClick={() => handleNavigation('Settings')}>
            <span className="nav-icon" aria-hidden="true">⚙</span>Settings
          </button>
          <div className="sidebar-help"><span>Need a hand?</span><strong>We’re here for you.</strong><button type="button" onClick={() => setNotice('Support is not connected in this demo.')}>Visit help center ↗</button></div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span aria-hidden="true">/</span><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <label className="search-box" htmlFor="dashboard-search">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
              <span className="sr-only">Search dashboard</span>
              <input id="dashboard-search" name="dashboard-search" type="search" placeholder="Search anything..." />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" type="button" aria-label="Notifications" onClick={() => setNotice('You’re all caught up on notifications.')}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" /></svg>
              <i />
            </button>
            <button className="profile-button" type="button" onClick={handleLogout} aria-label={`Sign out ${user?.name || ''}`}>
              <span className="profile-avatar">{initials}</span>
              <span className="profile-copy"><strong>{user?.name || 'Hotel Manager'}</strong><small>Hotel manager</small></span>
              <span className="chevron" aria-hidden="true">⌄</span>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {notice && <div className="dashboard-notice" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}
          <section className="welcome-row">
            <div><span className="eyebrow">{todayLabel}</span><h1>Good morning, {firstName} <span aria-hidden="true">✦</span></h1><p>Here’s what’s happening at your hotel today.</p></div>
            <button className="button button-primary date-button" type="button" onClick={() => setNotice('Showing today’s hotel overview.')}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>Today <span aria-hidden="true">⌄</span>
            </button>
          </section>

          <section className="stat-grid" aria-label="Hotel overview">
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Total rooms</span><span className="stat-icon sand">▦</span></div>
              <div className="stat-value">128</div><div className="stat-foot"><span className="stat-neutral">Across 4 room types</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Available rooms</span><span className="stat-icon mint">⌂</span></div>
              <div className="stat-value">34</div><div className="stat-foot"><span className="trend-up">↑ 6</span><span className="stat-neutral">from yesterday</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Occupied rooms</span><span className="stat-icon blush">♧</span></div>
              <div className="stat-value">86</div><div className="stat-foot"><span className="stat-neutral">67% occupancy rate</span></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">Current reservations</span><span className="stat-icon blue">▤</span></div>
              <div className="stat-value">52</div><div className="stat-foot"><span className="trend-up">↑ 12%</span><span className="stat-neutral">vs. last month</span></div>
            </article>
          </section>

          <section className="dashboard-lower">
            <article className="panel occupancy-panel">
              <div className="panel-heading"><div><h2>Occupancy overview</h2><p>A little look at how your rooms are doing.</p></div><button className="select-button" type="button" onClick={() => setNotice('Showing occupancy data for this week.')}>This week <span aria-hidden="true">⌄</span></button></div>
              <div className="chart-legend"><span><i className="legend-fill" />Occupied</span><span><i className="legend-empty" />Available</span></div>
              <div className="chart-wrap" role="img" aria-label="Weekly occupancy chart showing occupancy rising from 52 percent on Monday to 78 percent on Sunday">
                <div className="chart-y-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
                <div className="chart">
                  <div className="chart-grid"><i /><i /><i /><i /><i /></div>
                  <svg className="chart-svg" viewBox="0 0 640 180" preserveAspectRatio="none" aria-hidden="true">
                    <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#86a58d" stopOpacity=".24" /><stop offset="100%" stopColor="#86a58d" stopOpacity=".01" /></linearGradient></defs>
                    <path d="M0 110 C45 104 48 86 92 90 S153 105 184 82 S250 78 276 70 S340 89 368 60 S430 74 460 48 S522 54 552 34 S610 41 640 24 V180 H0Z" fill="url(#chart-fill)" />
                    <path d="M0 110 C45 104 48 86 92 90 S153 105 184 82 S250 78 276 70 S340 89 368 60 S430 74 460 48 S522 54 552 34 S610 41 640 24" fill="none" stroke="#73947a" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                    <circle cx="640" cy="24" r="5" fill="#fff" stroke="#73947a" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <div className="chart-x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                </div>
              </div>
              <p className="sample-caption">Sample dashboard data · not connected to live room inventory</p>
            </article>

            <article className="panel arrivals-panel">
              <div className="panel-heading"><div><h2>Today’s arrivals</h2><p>Guests checking in today</p></div><button className="text-link" type="button" onClick={() => handleNavigation('Reservations')}>View all <span aria-hidden="true">→</span></button></div>
              <div className="arrival-summary"><span className="arrival-number">08</span><span>arrivals expected today</span><span className="arrival-progress"><i /></span></div>
              <div className="arrival-room"><span className="room-icon">⌂</span><span><strong>Room 208</strong><small>Deluxe Ocean Suite</small></span><span className="room-state">Ready</span></div>
              <div className="arrival-room"><span className="room-icon room-icon-gold">⌂</span><span><strong>Room 114</strong><small>Garden King</small></span><span className="room-state room-state-pending">Preparing</span></div>
              <div className="arrival-room"><span className="room-icon room-icon-blue">⌂</span><span><strong>Room 302</strong><small>Family Villa</small></span><span className="room-state">Ready</span></div>
              <button className="arrival-footer" type="button" onClick={() => handleNavigation('Reservations')}>See all arrivals <span aria-hidden="true">→</span></button>
            </article>
          </section>

          <section className="panel activity-panel">
            <div className="panel-heading"><div><h2>Recent booking activity</h2><p>A few of the latest guest updates.</p></div><button className="text-link" type="button" onClick={() => handleNavigation('Reservations')}>All bookings <span aria-hidden="true">→</span></button></div>
            <div className="activity-table-wrap">
              <table>
                <thead><tr><th>GUEST</th><th>ROOM</th><th>STATUS</th><th>ACTIVITY</th></tr></thead>
                <tbody>{activities.map((activity) => (
                  <tr key={activity.name}>
                    <td><span className={`guest-avatar guest-${activity.tone}`}>{activity.initials}</span><strong>{activity.name}</strong></td>
                    <td>{activity.detail}</td>
                    <td><span className={`status-pill status-${activity.tone}`}><i />{activity.status}</span></td>
                    <td className="activity-time">{activity.time}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="sample-caption activity-caption">Illustrative sample activity · not live booking data</p>
          </section>
          <footer className="dashboard-footer"><span>© 2026 Ohana Hotel System</span><span>Making every stay feel like home <span aria-hidden="true">♡</span></span></footer>
        </div>
      </main>
    </div>
  );
}
