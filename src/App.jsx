import { useEffect, useState } from 'react';
import './App.css'
import LoginForm from './components/LoginForm';
import { AuthContext } from './Contexts';
import { Route, Routes, useNavigate } from 'react-router';
import SelectionScreen from './components/SelectionScreen';

function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <AuthContext value={{ authToken, setAuthToken }}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<SelectionScreen />} />
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </AuthContext>
  );
}

export default App
