import React from 'react';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentDayIndex } = useApp();
  const { logout, user } = useAuth();
  
  // Get username from email or use a default
  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  
  return (
    <header className="header">
      <div className="logo-area">
        <Shield className="logo-icon" size={28} />
        <span className="logo-text">75 HARD <span className="logo-accent">ELITE</span></span>
      </div>

      <div className="header-actions">
        <div className="user-profile-pill glass-card">
          <div className="user-avatar">
            <UserIcon size={16} />
          </div>
          <div className="user-details">
            <span className="user-greeting">Hi, {userName}</span>
            <div className="user-streak-mini">
              <span className="mini-label">STREAK:</span>
              <span className="mini-value text-gradient">{currentDayIndex} DAYS</span>
            </div>
          </div>
        </div>
        
        <button className="logout-action-btn" onClick={logout} title="Logout">
          <LogOut size={20} />
          <span className="logout-text">Sign Out</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
