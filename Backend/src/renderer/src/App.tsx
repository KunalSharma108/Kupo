import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import LoadingOverlay from './components/auth/LoadingOverlay';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { CheckAuth } from './lib/ipc';

function App(): React.JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AuthCheck = async (): Promise<any> => {
      const response = await CheckAuth();

      if (response.loggedIn) {
        setLoggedIn(true)
        setLoading(false);
      } else {
        setLoggedIn(false)
        setLoading(false)
      }
    }

    AuthCheck()
  }, []);

  return (
    <Router>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <Routes>
          <Route path="/" element={loggedIn ? <Dashboard /> : <Welcome />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
