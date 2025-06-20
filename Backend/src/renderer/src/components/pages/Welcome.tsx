import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css'

function Welcome(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1.5rem',
      backgroundColor: '#121212',
      color: '#fff'
    }} className='welcome fade-in'>
      <h1 style={{ fontSize: '2rem' }}>Welcome to the App 🚀</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => navigate('/login')}
          style={buttonStyle}
        >
          Log In
        </button>
        <button
          onClick={() => navigate('/signup')}
          style={buttonStyle}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#1f6feb',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
};

export default Welcome;
