import React from 'react'

const ThreadDetailViewComment = () => {
  return (
    <div>ThreadDetailViewComment</div>
  )
}

export default ThreadDetailViewComment


// import React, { useState } from "react";
// import "./details.css";
// import Thread from "../Thread";

// // ... (interface definitions for Comment, Thread, User, etc.)

// function ThreadDetailView() {
//   const threadDetail: Thread = {
//     id: 1,
//     title: "Sample Thread",
//     category: "THREAD",
//     creationDate: "2023-09-04",
//     creator: {
//       id: 1,
//       name: "John Doe",
//       userName: "johndoe",
//     },
//     comments: [], // Initialize comments as an empty array
//   };

//   const [threads, setThreads] = useState<Thread[]>([threadDetail]); // Specify the type here

//   const addCommentToThread = (threadId: number, commentContent: string, commentCreator: string) => {
//     const newComment: Comment = {
//       content: commentContent,
//       creator: commentCreator,
//     };

//     setThreads((prevThreads) =>
//       prevThreads.map((thread) =>
//         thread.id === threadId
//           ? { ...thread, comments: [...(thread.comments || []), newComment] } // Use the empty array if comments is undefined
//           : thread
//       )
//     );
//   };

//   return (
//     <div className="details-container">
//       {threads.map((thread) => (
//         <div key={thread.id}>
//           <Thread thread={thread} />
//           <button
//             onClick={() => {
//               addCommentToThread(thread.id, "New Comment", "User123");
//             }}
//           >
//             Add Comment
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ThreadDetailView;
