import React, { Suspense, lazy, useState } from 'react';
import Home from './components/Home/Home';
import './App.css';

// Lazy import
const About = lazy(() => import('./components/Demo/Demo'));

function App() {
  const [page, setPage] = useState('home');

  return (
    <div>
      <h1>React Lazy Loading</h1>

      <nav>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('demo')}>Demo</button>
      </nav>

      <div className="app-content">
        {page === 'home' && <Home />}
        {page === 'demo' && (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;

//todo: chia phan home voi cac button demo(thay thanh article)
//thay const about bang ten khac de co the chia ra
//lam them cac demo(article) moi