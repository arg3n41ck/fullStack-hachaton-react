import { KeyboardReturnOutlined } from "@material-ui/icons";
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
    (await axios.post)(`${URL}/accounts/login/`, {
      email,
      password,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const setRegistration = async ({ email, password, password2 }) => {
    await axios.post(`${URL}/accounts/register/`, {
      email,
      password,
      password2,
    });
  };

  const logOut = async () => {
    // await axios.post(`${URL}/accounts/logout/`);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const addInterceptor = () => {
    axios.interceptors.request.use(
      (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = JSON.parse(localStorage.getItem("access_token"));
        if (user && token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  };

  const activationCode = async (activation_code) => {
    const response = await axios.get(
      `${URL}accounts/activate/${activation_code}/`
    );

    console.log(response);
  };

  return (
    <authContext.Provider
      value={{
        login: state.login,
        registration: state.registration,
        setLogin,
        setRegistration,
        logOut,
        getCurrentUser,
        addInterceptor,
        activationCode,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}
