import { useEffect, useState } from 'react';
import './App.css'
import LoginForm from './components/LoginForm';
import { AuthContext, LoadingContext } from './Contexts';
import { Route, Routes, useNavigate } from 'react-router';
import SelectionScreen from './components/SelectionScreen';
import SelectQuizScreen from './components/SelectQuizScreen';
import ViewQuizScreen from './components/ViewQuizScreen';
import Overlay from './components/Overlay';

function App() {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function backToLogin() {
    setAuthToken(null);
    navigate("/login");
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <AuthContext value={{ authToken, setAuthToken, backToLogin }}>
      <LoadingContext value={{ isLoading, setIsLoading }}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<SelectionScreen />} />
          <Route path="/host" element={<SelectQuizScreen />} />
          <Route path="/view_quiz" element={<ViewQuizScreen />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
        <LoadingOverlay condition={isLoading} />
      </LoadingContext>
    </AuthContext>
  );
}

function LoadingOverlay({ condition }) {
  return (
    <Overlay condition={condition}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
          <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
        </path>
      </svg>
      <p>Loading...</p>
    </Overlay>
  );
}

export default App
