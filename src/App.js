import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom';
import './App.css';
import devLogo from './assets/DevLogo.png';

import Home from './pages/Home';
import Comparison from './pages/Comparison';
import Timeline from './pages/Timeline';
import HorizonsData from './pages/HorizonsData';

const root = document.getElementById('root');

const existingRoot = root._reactRootContainer ? root._reactRootContainer._internalRoot : createRoot(root);

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="logo">
            <img src={devLogo} alt="Logo" />
            <span>Orbiting Eyes</span>
          </div>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/comparison" activeClassName="active">Comparison</NavLink>
            </li>
            <li>
              <NavLink to="/timeline" activeClassName="active">Timeline</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/horizonsdata" element={<HorizonsData />} />
        </Routes>
      </div>
    </Router>
  );
}

existingRoot.render(<App />);

export default App;
