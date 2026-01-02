import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import MedicalHistory from './pages/MedicalHistory';
import Appointments from './pages/Appointments';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/medical-history" element={<MedicalHistory />} />
              <Route path="/appointments" element={<Appointments />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;