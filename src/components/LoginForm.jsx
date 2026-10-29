import { useContext, useRef, useState } from "react";
import useToggle from "../scripts/utils/ToggleHook";
import { login, signup } from "../scripts/api/User";
import { AuthContext } from "../Contexts";
import { AnimatePresence, motion } from "motion/react";

function LoginForm() {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [isLogin, toggleIsLogin] = useToggle(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { setAuthToken } = useContext(AuthContext);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  function onLogin() {
    setErrorMessage("");

    const usernameString = usernameInputRef.current.value.trim();
    const passwordString = passwordInputRef.current.value.trim();

    const fn_to_rn = isLogin ? login : signup;

    fn_to_rn(usernameString, passwordString)
      .then(([success, result]) => {
        if (success) {
          setAuthToken(result);
        } else {
          setErrorMessage(result);
          const errorTimeout = setTimeout(() => setErrorMessage(""), 3000);
          return () => clearTimeout(errorTimeout);
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      <div className="primaryCard">
        <p className="cardTitle">{isLogin ? "Welcome Back" : "Create Account"}</p>
        <div className="spacer" />

        <input
          type="text"
          ref={usernameInputRef}
          placeholder="Username"
          className="fillWidth"
        />
        <input
          type={showPassword ? "text" : "password"}
          ref={passwordInputRef}
          placeholder="Password"
          className="fillWidth"
        />
        <div className="spacer" />

        <button
          className="primaryButton fillWidth"
          onClick={onLogin}
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
        {errorMessage && (
          <motion.div
            className={`secondaryCard snackBar`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
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