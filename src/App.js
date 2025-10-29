import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplashScreen from './app/SplashScreen.js';
import MainScreen from './app/MainScreen.js';
import OfflineScreen from './app/error-pages/OfflineScreen.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/c" element={<MainScreen />} />
        <Route path="/c/:id" element={<MainScreen />} />
        <Route path="/network-status/offline" element={<OfflineScreen />} />
      </Routes>
    </Router>
  );
}

export default App;