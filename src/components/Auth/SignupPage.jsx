import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to log in with Google.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card glass-card"
      >
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start your 75 Hard challenge today</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">FULL NAME</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">EMAIL ADDRESS</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">CONFIRM PASSWORD</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary auth-btn" 
            disabled={loading}
          >
            {loading ? 'Screating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-divider">
          <span className="divider-text">OR</span>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className="google-btn"
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
          Continue with Google
        </button>

        <div className="auth-footer">
          Already have an account? 
          <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </motion.div>

      <footer className="footer" style={{ marginTop: 'auto' }}>
        <p>Built with discipline. Created by Aditya.</p>
      </footer>
    </div>
  );
};

export default SignupPage;
