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
          (comment) => comment.id !== action.payload
        ),
      };
    case "CHAGE_EDIT_ID":
      return {
        ...state,
        editCommentId: action.payload,
      };
    case "EDIT_COMMENT":
      return {
        ...state,
        commentList: state.commentList.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
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
    const respons = await axios.get(`${URL}/comment/`);
    console.log(respons);

    const comments = respons.data;
    dispatch({
      type: "SET_COMMENTLIST",
      payload: comments,
    });
  };
  const createComment = async ({ product, body }) => {
    console.log(data);
    const { data } = await axios.post(`${URL}/comment/`, {
      product,
      body,
    });
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
  const changeComment = async (id, comment) => {
    const { data } = await axios.patch(`${URL}/comment/${id}/`, { comment });
    dispatch({
      type: "EDIT_COMMENT",
      payload: data,
    });
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
