import React, { useContext, useState } from 'react';
import { commentContext } from '../../../contexts/CommentContext';

const CommentEdit = (props) => {
    const {comment : textComment, id} = props.data;
    const [comment, setComment] = useState(textComment);

    const {changeComment} = useContext(commentContext)

    const handleEdit = (e) => {
        e.preventDefault()
        changeComment(id, comment);
    }


    return (
        <li>
            <form onSubmit={handleEdit}>
                <input
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    name="title"
                    required
                    value={comment}
                />
                <button>Edit</button>
            </form>
        </li>
    )
};

export default CommentEdit;