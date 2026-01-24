import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Mission from './pages/Mission';
import DataExplorer from './pages/DataExplorer';
import Learning from './pages/Learning';
import Playground from './pages/Playground';

function App() {
  const [learningMode, setLearningMode] = useState(true);
  const [particles, setParticles] = useState([]);

  // Generate floating particles for atmosphere
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 10,
      size: 1 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-upside-down-900 relative">
        {/* Atmospheric particles */}
        <div className="particles-bg">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <Layout learningMode={learningMode} setLearningMode={setLearningMode}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/mission/:id" 
              element={<Mission learningMode={learningMode} />} 
            />
            <Route path="/data" element={<DataExplorer />} />
            <Route path="/learning" element={<Learning />} />
            <Route 
              path="/playground" 
              element={<Playground learningMode={learningMode} />} 
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
