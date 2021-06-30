import axios from "axios";
import React, { useReducer } from "react";

const INIT_STATE = {
  commentList: [],
  editCommentId: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_COMMENTLIST":
      return {
        ...state,
        commentList: action.payload,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        commentList: [...state.commentList, action.payload],
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        commentList: state.commentList.filter(
          (body) => body.id !== action.payload
        ),
      };
    case "CHANGE_EDIT_ID":
      return {
        ...state,
        editCommentId: action.payload,
      };
    case "EDIT_COMMENT":
      return {
        ...state,
        commentList: state.commentList.map((body) =>
          body.id === action.payload.id ? action.payload : body
        ),
      };
    default:
      return state;
  }
};

export const commentContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function CommentContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchComments = async () => {
    const respons = await axios.get(`${URL}/comment/`, {

    });
    console.log(respons, "get запрос");

    const comments = respons.data;
    dispatch({
      type: "SET_COMMENTLIST",
      payload: comments,
    });
  };

  const createComment = async ({ body }) => {
    axios.defaults.headers.common['Authorization'] = 'Token ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI1MDYzMzEyLCJqdGkiOiJmZDkzZjA0ZDU2YTE0ZjIxOTViODc2ZmZjNmVjOWUyZiIsInVzZXJfaWQiOjEwfQ.mxSJIHocwNOUu-qJGbs3zXIgTXW9YxiQC9bPlzY0YMc";
    const { data } = await axios.post(`${URL}/comment/`, {
      body: body,
    });
    console.log(data, "post запрос");
    dispatch({
      type: "ADD_COMMENT",
      payload: data,
    });
  };
  const deleteComment = async (id) => {

    await axios.delete(`${URL}/comment/${id}/`);
    dispatch({
      type: "DELETE_COMMENT",
      payload: id,
    });
  };
  const changeEditId = (id) => {
    dispatch({
      type: "CHANGE_EDIT_ID",
      payload: id,
    });
  };
  const changeComment = async (id, body) => {
    const { data } = await axios.patch(`${URL}/comment/${id}/`, { body });
    dispatch({
      type: "EDIT_COMMENT",
      payload: data,

    });
    changeEditId(null)
  };

  return (
    <commentContext.Provider
      value={{
        commentList: state.commentList,
        editId: state.editCommentId,
        fetchComments,
        createComment,
        deleteComment,
        changeEditId,
        changeComment,
      }}
    >
      {props.children}
    </commentContext.Provider>
  );
}
