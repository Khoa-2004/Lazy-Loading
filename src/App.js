import React, { Suspense, lazy, useState } from 'react';
import Home from './components/Home';
import './App.css'

// Lazy import
const About = lazy(() => import('./components/About'));

function App() {
  const [page, setPage] = useState('home');

  return (
    <div style={{ padding: 20 }}>
      <h1>React Lazy Loading</h1>
      <nav>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('about')}>About</button>
      </nav>

      <div style={{ marginTop: 20 }}>
        {page === 'home' && <Home />}

        {page === 'about' && (
          <Suspense fallback={<div>Loading About Page...</div>}>
            <About />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
