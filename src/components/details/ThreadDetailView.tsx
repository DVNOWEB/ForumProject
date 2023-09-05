import React, { useState, useEffect } from "react";
// import "./details.css";
import Thread from "../Thread";

// Define the Comment and Thread interfaces in the same file
interface Comment {
  content: string;
  creator: string;
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

  const comments: _Comment[] = [
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
    }
  ];
  





  return <div className="details-container">
    {thread && <Thread thread={thread} comments={comments} />}
    
  </div>;
}

export default ThreadDetailView;
