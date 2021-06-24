import React, { useEffect } from 'react';
import { useContext } from 'react';
import { commentContext } from '../../../contexts/CommentContext';
import CommentItem from './CommentItem';
import CommentEdit from './CommentEdit';



const CommentList = () => {
    const {commentList, fetchComments, editId } = useContext(commentContext);

    useEffect(() => {
        fetchComments();
    }, [])

    return (
        <ul>
            {commentList.map((comment) =>
                comment.id === editId ? (
                    <CommentEdit data={comment} key={comment.id} />
                ) : (
                    <CommentItem data={comment} key={comment.id} />
                )
            )}
        </ul>
        
    );
};

export default CommentList;