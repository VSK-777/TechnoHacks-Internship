import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      {/* Decorative Background Elements */}
      <div className="glow-circle shape-1"></div>
      <div className="glow-circle shape-2"></div>

      <nav className="dashboard-nav glass-panel">
        <div className="nav-brand">
          <span className="brand-icon">🛡️</span> SecurityOS
        </div>
        <div className="nav-user">
          <div className="user-profile">
            <span className="user-badge">{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
            <span className="user-name">{user?.username}</span>
          </div>
          <button onClick={logout} className="btn btn-outline btn-sm">Logout</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <header className="dashboard-header slide-up">
          <h1>Welcome back, <span className="text-gradient">{user?.username}</span>!</h1>
          <p>Your secure environment is ready and monitored.</p>
        </header>

        <div className="dashboard-grid single-column">
          {/* Main Status Card */}
          <div className="welcome-card glass-panel slide-up delay-1">
            <div className="card-header">
              <h2><span className="icon">👤</span> Account Overview</h2>
              <span className="status-badge secure">Verified</span>
            </div>
            
            <div className="data-grid">
              <div className="data-item">
                <span className="data-label">Registered Email</span>
                <span className="data-value">{user?.email}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Account Role</span>
                <span className="data-value">Standard User</span>
              </div>
              <div className="data-item">
                <span className="data-label">Auth Method</span>
                <span className="data-value">JWT Bearer Token</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
