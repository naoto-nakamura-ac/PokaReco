// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './pages/Top';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import HeatChartPDF from './pages/HeatChartPDF';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/export" element={<HeatChartPDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
