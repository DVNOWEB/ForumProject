import React, { useState, useEffect } from "react";
import "./details.css";
import Thread from "../Thread";
import CommentComponent from "./CommentComponent";
import AddComment from "./AddComment";
import { on } from "events";

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
    comments: [],
  };

  // const [threads, setThreads] = useState([threadDetail]);
  const [thread, setThread] = useState<Thread | QNAThread>();

  useEffect(() => {
    const threadData: string | null = localStorage.getItem("threads");
    // console.log(threadData);
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
  // console.log(thread);

  const newComment = {
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
  };
  // console.log(newComment);

  const [onClick, setOnClick] = useState(false)





  useEffect(() => {
    const addComment = (newComment: _Comment) => {
      if (thread) {
        const updatedThread: Thread = {
          ...thread,
          comments: [...thread.comments, newComment],
        };
        
        setThread(updatedThread);
        console.log(updatedThread)
      }
    };
    addComment(newComment);
    // console.log(newComment);
  }, [onClick])
  




  //-----------------------------------------------------------------
  //   // Existing comments
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
  //   },
  // ]);
  // const [comments, setComments] = useState<_Comment[]>([

  return (
    
    <div className="details-container">
      {/* {thread && <Thread thread={thread} comments={comments} />} */}

      {/* <AddComment /> */}
    <button onClick={() => setOnClick(state => !state)}>Submit</button>
      {/* {comments.map((comment) => (
      <CommentComponent comment={comment} />
    ))}    */}
    </div>
  );
}

export default ThreadDetailView;
