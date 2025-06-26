import { useState } from 'react';
import '../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faBook, faCodeBranch, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { sendLogIn } from '@renderer/lib/ipc';
import LoadingOverlay from './LoadingOverlay';
import SuccessDialog from './successDialog';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const [uiError, setUiErrors] = useState({ emailError: '', passError: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (email.trim() == '' || password.trim() == '') {
        setUiErrors({ emailError: 'Fill all the inputs.', passError: "Fill all the inputs." })
        return;
      }
      const response: { error: any, success: boolean } = await sendLogIn({ email: email, password: password });

      if (response.error) {
        setUiErrors({ emailError: 'Invalid Email', passError: 'Invalid password' })
        setLoading(false)
      } else if (response.success) {
        setShowSuccessDialog(true);
        setLoading(false)
      }
    } catch (error) {
      setUiErrors({ emailError: 'An error occured, Please try again later.', passError: '' })
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[<>/'"]/g, '');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(sanitizeInput(e.target.value));
  };

  return (
    <div className="fade-in auth-layout">
      {showSuccessDialog && <SuccessDialog
        data={{ heading: 'Log In Successful!', msg: 'You are ready to work on your portfolio\'s again!', buttonText: 'Let\'s Go!' }}
        onConfirm={() => {
          Navigate('/')
          setShowSuccessDialog(false);
        }}
      />}

      {loading && <LoadingOverlay />}
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
          <h1 className="auth-title">Glad to see you back!</h1>

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
                  onChange={handleEmailChange}
                  required
                  className="auth-input"
                />
              </div>
              <p className={`input-error-text ${uiError.emailError ? 'visible' : 'hidden'}`}>
                {uiError.emailError || '‎'} {/* invisible placeholder character to keep height */}
              </p>
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
              <p className={`input-error-text ${uiError.passError ? 'visible' : 'hidden'}`}>
                {uiError.passError || '‎'} {/* invisible placeholder character to keep height */}
              </p>
            </div>


            <p className="privacy-note roboto">
              Note - Your privacy matters to us. We never share your email with any third-party,
              including spam companies. Your trust is our priority.
            </p>

            <button className="auth-btn" type="submit" onClick={handleLogIn}>
              Log In
            </button>
          </form>
          <div className="auth-footer">
            Dont have an account? <a onClick={() => Navigate('/signup')}>Create account</a>
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
