import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';

function App(): React.JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
