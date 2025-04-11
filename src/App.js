import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormContainer from './components/FormContainer';
import BusinessPlanViewer from './components/BusinessPlanViewer'; // Da implementare successivamente
import LandingPage from './components/LandingPage'; // Da implementare successivamente
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Generatore AI di Business Plan</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<FormContainer />} />
            <Route path="/business-plan/:sessionId" element={<BusinessPlanViewer />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2025 Generatore AI di Business Plan</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;