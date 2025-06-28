import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import './components/styles/index.css'

function App(): React.JSX.Element {
  return (
    <Router>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
        </Routes>
    </Router>
  );
}

export default App;
