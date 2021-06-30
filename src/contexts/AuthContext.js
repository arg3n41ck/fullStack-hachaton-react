import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  login: [],
  registration: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const authContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const setLogin = async ({ email, password }) => {
    await axios.post(`${URL}/accounts/login/`, {
      email,
      password,
    });
  };

  const setRegistration = async ({ email, password, password2 }) => {
    await axios.post(`${URL}/accounts/register/`, {
      email,
      password,
      password2,
    });
  };

  return (
    <authContext.Provider
      value={{
        login: state.login,
        registration: state.registration,
        setLogin,
        setRegistration,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
