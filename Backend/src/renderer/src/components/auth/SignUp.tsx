import { useState } from 'react';
import '../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faBook, faCodeBranch, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email, password)
  }

  return (
    <div className="fade-in auth-layout">
      <a

        href="https://your-docs-site.com"
        target="_blank"
        rel="noreferrer"
        className="side-button noto-sans-kr"
      >
        <FontAwesomeIcon icon={faBook} className="icon" />
        <span>Documentation</span>
      </a>

      <div className="fade-in auth-container">
        <div className="auth-box">
          <h1 className="auth-title">Welcome to Kupo!</h1>

          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  placeholder="•••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-input"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>

            </div>

            <p className="privacy-note roboto">
              Note - Your privacy matters to us. We never share your email with any third-party,
              including spam companies. Your trust is our priority.
            </p>

            <button className="auth-btn" type="submit" onClick={handleSignUp}>
              Create Account
            </button>
          </form>
          <div className="auth-footer">
            Already have an account? <a onClick={() => navigate('/login')}>Log in</a>
          </div>

        </div>
      </div>

      <a
        href="https://github.com/your-project"
        target="_blank"
        rel="noreferrer"
        className="side-button noto-sans-kr"
      >
        <FontAwesomeIcon icon={faCodeBranch} className="icon" />
        <span>GitHub</span>
      </a>
    </div>
  );
}
