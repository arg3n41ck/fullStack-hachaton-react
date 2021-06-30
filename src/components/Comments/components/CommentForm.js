import React, { useContext, useState } from "react";
import { commentContext } from "../../../contexts/CommentContext";

const CommentForm = () => {
  const [body, setBody] = useState("");
  // const [user, setUser] = useState("");
  const { createComment } = useContext(commentContext);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const data = {
      // user,
      body,
    };
    createComment(data);
    setBody("");
  };

  return (
    <div>
      <h3>Отзывы</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          onChange={(e) => setBody(e.target.value)}
          placeholder="Title"
          name="body"
          type="text"
          value={body}
        />
        <button>Отправить</button>
      </form>
    </div>
  );
};

export default CommentForm;
