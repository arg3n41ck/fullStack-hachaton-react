import React, { useEffect } from "react";
import { useContext } from "react";
import CommentItem from "./CommentItem";
import CommentEdit from "./CommentEdit";
import { commentContext } from "../../../contexts/CommentContext";

const CommentList = () => {
  const { commentList, fetchComments, editId } = useContext(commentContext);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <ul>
      {commentList.map((product) =>
        product.id === editId ? (
          <CommentEdit data={product} key={product.id} />
        ) : (
          <CommentItem data={product} key={product} />
        )
      )}
    </ul>
  );
};

export default CommentList;
