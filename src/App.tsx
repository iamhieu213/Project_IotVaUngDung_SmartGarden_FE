import { Routes, Route, useNavigate } from 'react-router-dom';
import { Landing } from './components/Landing/Landing';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Houses } from './components/Houses/Houses';
import { HouseDetail } from './components/HouseDetail/HouseDetail';
import { Devices } from './components/Devices/Devices';
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword'
function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login onLoginSuccess={() => navigate('/dashboard')} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/houses" element={<Houses />} />
      <Route path="/houses/:id" element={<HouseDetail />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;




