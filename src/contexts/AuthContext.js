import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  login: [],
  registration: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        login: action.payload,
      };
    case "SET_REGISTRATION":
      return {
        registration: action.payload,
      };
    default:
      return state;
  }
};

export const authContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const setLogin = async () => {
    const response = await axios.post(`${URL}/accounts/login/`);
    const loginUser = response.data;

    dispatch({
      type: "SET_LOGIN",
      payload: loginUser,
    });
  };

  const setRegistration = async () => {
    const response = await axios.post(`${URL}/accounts/register/`);
    const regUser = response.data;

    dispatch({
      type: "SET_REGISTRATION",
      payload: regUser,
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
