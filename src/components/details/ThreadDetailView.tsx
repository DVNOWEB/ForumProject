import React, { useState } from 'react';
import "./details.css";

// Define the Comment and Thread interfaces in the same file
interface Comment {
  content: string;
  creator: string;
}

interface ThreadProps {
  thread: Thread;
}

// Create an instance of the Thread type
const threadData: Thread = {
  id: 1,
  title: "Sample Thread",
  category: "THREAD",
  creationDate: "2023-09-04",
  creator: {
    id: 1,
    name: "John Doe",
    userName: "johndoe",
  },
};


function ThreadDetailView( {thread} : ThreadProps) {
  return (
    <div className="details-container">
      <h2 className="details-title">{thread.title}</h2>
      <div className="details-comment">
        {threadData.title}: {thread.creationDate}
      </div>
      <input className="details-input" placeholder="Write your message here.."></input>
      <button className="details-add-btn">Add new comment</button>
    </div>
  );
}

export default ThreadDetailView;
// const ThreadDetailView: React.FC<{ thread: Thread }> = ({ thread }) => {
//   const [comments, setComments] = useState<Comment[]>([]);

//   // Function to add a new comment
//   const addComment = () => {
//     // You should implement the logic to add a new comment and update the comments state here
//   };

//   // Component for displaying a single comment
// const CommentItem: React.FC<Comment> = ({ content, creator }) => (
//   <div className="details-comment">
//     {creator}: {content}
//   </div>
// );

//   return (
//     <div className='details-container'>
//       <h2 className=''>{thread.title}</h2>
      
//       {/* Render comments using CommentItem */}
//       {comments.map((comment, index) => (
//         <CommentItem key={index} content={comment.content} creator={comment.creator} />
//       ))}

//       <input className='details-input' placeholder='Write your message here..'></input>
//       <button className='details-add-btn' onClick={addComment}>Add new comment</button>
//     </div>
//   );
// };




