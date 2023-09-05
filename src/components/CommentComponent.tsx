import React, { useEffect, useState } from 'react';

function CommentComponent({ comment }: commentProps) {
  
    
  
    
  
    return (
      <div className="commentContainer">
        <h2>{comment.creator.userName}</h2>
        <p>{comment.content}</p>
      </div>
      
    );
  };
  
  export default CommentComponent;