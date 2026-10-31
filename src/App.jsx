import { useEffect, useState } from 'react';
import './App.css'
import LoginForm from './components/LoginForm';
import { AuthContext } from './Contexts';
import { Route, Routes, useNavigate } from 'react-router';

function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <AuthContext value={{ authToken, setAuthToken }}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </AuthContext>
  );
}

export default App
