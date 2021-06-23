import classes from "./auth.module.css";
import React, { useState, useEffect } from "react";
import fire from "../../fire";
import { useHistory } from "react-router-dom";
import { notifySuccess } from "../../helpers/notifiers";

const Auth = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAcc, setHasAcc] = useState(false);
  const history = useHistory();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearError();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
    notifySuccess("Вы успешно вошли в аккаунт!");
    history.push(`/`);
  };

  const handleSignUp = () => {
    clearError();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
    notifySuccess("Вы успешно зарегестрировались!");
    history.push(`/`);
  };

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <section className={classes.login}>
      <div className={classes.loginContainer}>
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className={classes.errorMsg}>{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className={classes.errorMsg}>{passwordError}</p>
        <div className={classes.btnContainer}>
          {hasAcc ? (
            <>
              <button className={classes.button} onClick={handleLogin}>
                sign in
              </button>
              <p>
                do not have an account?{" "}
                <span onClick={() => setHasAcc(!hasAcc)}>sign up</span>
              </p>
            </>
          ) : (
            <>
              <button className={classes.button} onClick={handleSignUp}>
                sign up
              </button>
              <p>
                have an account?
                <span onClick={() => setHasAcc(!hasAcc)}>sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
