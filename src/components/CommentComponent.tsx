import React, { useEffect, useState } from 'react';
import '../styles/CommentComponent.css'
function CommentComponent({ comment }: commentProps) {
  

    return (
      <div className="commentContainer">
        <h4 className='commentCreator'>{comment.creator.userName}</h4>
        <p className='commentMessage'>{comment.content}</p>
      </div>
      
    );
  };
  
  export default CommentComponent;