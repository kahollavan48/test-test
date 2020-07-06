import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from "../../actions/post";

const CommentForm = ({ addComment,postId }) => {

    const [text,setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addComment(postId,{text});
        setText('');
    }


    return(
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a comment</h3>
            </div>
            <form onSubmit={e => onSubmit(e)} className="form my-1">
          <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a comment"
              required
          ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    )
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

export default connect(null, {addComment})(CommentForm);