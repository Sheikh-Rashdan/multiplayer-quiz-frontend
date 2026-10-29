import { useEffect, useState } from 'react';
import './App.css'
import LoginForm from './components/LoginForm';
import { AuthContext } from './Contexts';

function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (authToken == null) return;
    console.log("Logged in");
  }, [authToken]);

  return (
    <AuthContext value={{ authToken, setAuthToken }}>
      <LoginForm />
    </AuthContext>
  );
}

export default App
