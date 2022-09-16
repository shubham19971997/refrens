import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Detail from './Detail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/detail" element={<Detail />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
