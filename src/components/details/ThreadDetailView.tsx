import React, { useState, useEffect } from "react";
import "./details.css";
import Thread from "../Thread";
import CommentComponent from "./CommentComponent";

// Define the Comment and Thread interfaces in the same file
interface Comment {
  content: string;
  creator: string;
}

function saveCommentToLocalStorage(commentData: _Comment) {
  try{
    const existingdata = localStorage.getItem('comments')
    const existingComments = existingdata ? JSON.parse(existingdata): []
    existingComments.push(commentData)
    localStorage.setItem('comments', JSON.stringify(existingComments))
  }
  catch (error){
    console.log('Error saving thread to localStorage:', error)
  }
}






// interface ThreadProps {
//   thread: Thread;
// }

//-------------------------------------------------------------------------------------------------------------------------

function ThreadDetailView() {
  // Create an instance of the Thread type
  const threadDetail: Thread = {
    id: 1,
    title: "Sample Thread",
    category: "THREAD",
    creationDate: "2023-09-04",
    description: "This is a sample thread.",
    creator: {
      id: 1,
      name: "John Doe",
      userName: "johndoe",
      password: "string",
    },
    // comments: [],
  };
  

  // const [threads, setThreads] = useState([threadDetail]);
  const [thread, setThread] = useState<Thread | QNAThread>();

  useEffect(() => {
    const threadData: string | null = localStorage.getItem("threads");
    console.log(threadData);
    if (threadData) {
      const parsedThreads: Thread[] | QNAThread[] = JSON.parse(threadData);

      const desiredThreadId: number = 1;
      const selected = parsedThreads.find(
        (thread) => thread.id === desiredThreadId
      );
      // console.log(selected)
      setThread(selected);
    }
  }, []);
  console.log(thread);

  // const comments: _Comment[] = [
  //   {
  //     id: 1,
  //     thread: 1,
  //     content: "This is a sample comment.",
  //     creator: {
  //       id: 1,
  //       name: "John Doe",
  //       userName: "johndoe",
  //       password: "123456",
  //     },
  //     isAnswer: false,
  //   }
  // ]; 
//-----------------------------------------------------------------

  const [comments, setComments] = useState<_Comment[]>([
    // Existing comments
    {
      id: 1,
      thread: 1,
      content: "This is a sample comment.",
      creator: {
        id: 1,
        name: "John Doe",
        userName: "johndoe",
        password: "123456",
      },
      isAnswer: false,
    },
  ]);

  const [newCommentContent, setNewCommentContent] = useState<string>("");

  const handleCreate = () => {
    if (newCommentContent.trim() === "") {
      // Do not create an empty comment
      return;
    }

    // Create a new comment object
    const newComment: _Comment = {
      id: comments.length + 1, // Assign a unique ID (you may need a more robust way to generate IDs)
      thread: 1, // Assuming it's for the same thread
      content: newCommentContent,
      creator: {
        id: 1, // Assuming the creator is the same user
        name: "John Doe",
        userName: "johndoe",
        password: "123456",
      },
      isAnswer: false,
    };

    // Update the state with the new comment
    setComments([...comments, newComment]);

    // Clear the input field after creating the comment
    setNewCommentContent("");

    // Optionally, save the updated comments to localStorage
    // saveCommentToLocalStorage([...comments, newComment]);
  



  }

  return <div className="details-container">

    {thread && <Thread thread={thread} comments={comments} />}

    <input placeholder="Write your comment here..."></input>
    <button 
    className="addComment-btn"
    onClick={handleCreate}
    >Add comment</button>

    {/* {comments.map((comment) => (
      <CommentComponent comment={comment} />
    ))}    */}

  </div>;
}

export default ThreadDetailView;
