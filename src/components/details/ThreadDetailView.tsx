import React, { useState } from 'react';
import "./details.css";

// Define the Comment and Thread interfaces in the same file
interface Comment {
  content: string;
  creator: string;
}

interface Thread {
  id: number;
  title: string;
  creationDate: string;
  description?: string;
  creator: string;
}

const ThreadDetailView: React.FC<{ thread: Thread }> = ({ thread }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // Function to add a new comment
  const addComment = () => {
    // You should implement the logic to add a new comment and update the comments state here
  };

  // Component for displaying a single comment
const CommentItem: React.FC<Comment> = ({ content, creator }) => (
  <div className="details-comment">
    {creator}: {content}
  </div>
);

  return (
    <div className='details-container'>
      <h2 className=''>{thread.title}</h2>
      
      {/* Render comments using CommentItem */}
      {comments.map((comment, index) => (
        <CommentItem key={index} content={comment.content} creator={comment.creator} />
      ))}

      <input className='details-input' placeholder='Write your message here..'></input>
      <button className='details-add-btn' onClick={addComment}>Add new comment</button>
    </div>
  );
};



export default ThreadDetailView;
