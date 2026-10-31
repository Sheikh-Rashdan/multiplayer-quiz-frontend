import { useContext, useRef, useState, useEffect } from "react";
import useToggle from "../scripts/utils/ToggleHook";
import { login, signup, getMe } from "../scripts/api/User";
import { AuthContext } from "../Contexts";
import { AnimatePresence, motion } from "motion/react";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router";

import { Eye, EyeSlash } from "@boxicons/react";

import "./LoginForm.css";
import nohootLogo from "../assets/nohoot_2x.png"

function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, toggleShowPassword] = useToggle(false);
  const [isLogin, toggleIsLogin] = useToggle(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const { authToken, setAuthToken, backToLogin } = useContext(AuthContext);

  async function validateSession() {
    if (authToken == null) {
      if (location.pathname !== "/login") navigate("/login");
      return;
    }

    try {
      const user = await getMe(backToLogin, authToken);
      if (user != null) {
        localStorage.setItem("authToken", authToken);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    validateSession();
  }, [authToken]);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  function checkInputValid() {
    const usernameString = usernameInputRef.current?.value.trim() ?? "";
    const passwordString = passwordInputRef.current?.value.trim() ?? "";

    setIsInputValid(usernameString.length !== 0 && passwordString.length !== 0);
  }

  async function onLogin() {
    setErrorMessage("");

    const usernameString = usernameInputRef.current.value.trim();
    const passwordString = passwordInputRef.current.value.trim();

    const fn_to_rn = isLogin ? login : signup;

    let newErrorMessage;

    try {
      const [success, result] = await fn_to_rn(usernameString, passwordString);

      if (success) setAuthToken(result);
      else newErrorMessage = result;
    } catch (error) {
      if (error instanceof AxiosError)
        newErrorMessage = error.message;
    }

    if (newErrorMessage) {
      setErrorMessage(newErrorMessage);
      const errorTimeout = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(errorTimeout);
    }
  }

  return (
    <>
      <img src={nohootLogo} className="logoImage2x" />
      <div className="primaryCard loginFormCard">
        <p className="cardTitle">{isLogin ? "Welcome Back" : "Create Account"}</p>
        <div className="spacer" />

        <input
          type="text"
          ref={usernameInputRef}
          placeholder="Username"
          className="fillWidth"
          onChange={checkInputValid}
        />
        <div
          className="passwordInputDiv fillWidth"
        >
          <input
            type={showPassword ? "text" : "password"}
            ref={passwordInputRef}
            placeholder="Password"
            className="fillWidth"
            onChange={checkInputValid}
          />
          <button className="secondaryButton" onClick={toggleShowPassword}>
            {
              showPassword ?
                <EyeSlash pack="filled" /> :
                <Eye pack="filled" />
            }
          </button>
        </div>
        <div className="spacer" />

        <button
          className="primaryButton fillWidth"
          onClick={onLogin}
          disabled={!isInputValid}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <div className="spacer" />

        <p className="subText">
          {isLogin ? "Don't have an account?" : "Have an account already?"}&nbsp;
          <span
            className="clickable subText"
            style={{ "color": "var(--secondary-light)" }}
            onClick={toggleIsLogin}
          >
            {isLogin ? "Sign" : "Log"} in.
          </span>
        </p>
      </div>

      <AnimatePresence>
        {errorMessage !== "" && (
          <motion.div
            className={`secondaryCard snackBar`}
            initial={{ y: -130 }}
            animate={{ y: 0 }}
            exit={{ y: -130 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <p>{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default LoginForm;