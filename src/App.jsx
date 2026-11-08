import { useEffect, useState } from 'react';
import './App.css'
import LoginForm from './components/LoginForm';
import { AuthContext, LoadingContext } from './Contexts';
import { Route, Routes, useNavigate } from 'react-router';
import SelectionScreen from './components/SelectionScreen';
import SelectQuizScreen from './components/SelectQuizScreen';
import ViewQuizScreen from './components/ViewQuizScreen';
import Overlay from './components/Overlay';
import JoinRoomScreen from './components/JoinRoomScreen';
import QuizRoomScreen from "./components/QuizRoomScreen";
import LoadingSpinner from './components/LoadingSpinner';

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
          <Route path="/join" element={<JoinRoomScreen />} />
          <Route path="/room" element={<QuizRoomScreen />} />
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
      <LoadingSpinner />
      <p>Loading...</p>
    </Overlay>
  );
}

export default App
