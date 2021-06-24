import React, { useContext, useState } from 'react';
import { commentContext } from '../../../contexts/CommentContext';

const CommentForm = () => {
    const [message, setMessage] = useState("");
    const {createComment} = useContext(commentContext);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const data = {
            message,
        };
        createComment(data);
        setMessage("")
    }



    return (
        <div>
            <h3>Отзывы</h3>
            <form onSubmit={handleCommentSubmit}>
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Title"
                    name="message"
                    type="text"
                    value={message} // new
                />
                <button>Отправить</button>
            </form>
            
        </div>
    );
};

export default CommentForm;