import React, { useContext } from "react";
import { commentContext } from "../../../contexts/CommentContext";
import cancelImg from "../../../assets/icons/cancel.svg";
import editImg from "../../../assets/icons/pencil.svg";

import classes from "../../Comments/comments.module.css";

const CommentItem = (props) => {
  const { body, product, user } = props.data;

  const { deleteComment } = useContext(commentContext);

  const handleDelete = () => {
    deleteComment(product);
  };
  return (
    <li>
      <p>{user}</p>
      <p>{body}</p>
      <img
        onClick={handleDelete}
        className={classes.cancelIcon}
        src={cancelImg}
        alt="cancel-img"
      />
      <img
        // onClick={() => changeEditId(id)}
        className={classes.editIcon}
        src={editImg}
        alt="edit-img"
      />
    </li>
  );
};

export default CommentItem;
