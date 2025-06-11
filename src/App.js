import React, { useState } from 'react';
import Home from './components/Home/Home';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  const handleHomeClick = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h1>React Lazy Loading</h1>
      <nav className="fixed-navbar">
        <button onClick={handleHomeClick}>Home</button>
      </nav>
      <div className="app-content">
        {page === 'home' && <Home />}
      </div>
    </div>
  );
}

export default App;