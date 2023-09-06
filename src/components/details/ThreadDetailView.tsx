import React, { useState, useEffect } from "react";
import "./details.css";
import Thread from "../Thread";
import CommentComponent from "./CommentComponent";
import AddComment from "./AddComment";
import { on } from "events";

//-------------------------------------------------------------------------------------------------------------------------

function ThreadDetailView() {
  // Create an instance of the Thread type

  const [thread, setThread] = useState<Thread | QNAThread>();
  const [threadsArray, setThreadsArray] = useState<Thread[] | QNAThread[]>([]);


  //Hämtar Threads från localstorage.
  useEffect(() => {
    const threadData: string | null = localStorage.getItem("threads");
    if (threadData) {
      const parsedThreads: Thread[] | QNAThread[] = JSON.parse(threadData);
      //Lägger alla threads i en array
      setThreadsArray(parsedThreads);


      //Lägger threaden vi är inne på i en variabel.
      const desiredThreadId: number = 1;
      const selected = parsedThreads.find(
        (thread) => thread.id === desiredThreadId
      );
      setThread(selected);
    }
  }, []);




//Hårdkodat exempel
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

  const [onClick, setOnClick] = useState(false);


//Tar Den gamla arrayen, söker igenom den efter rätt thread och uppdaterar med ny thread + kommentarer
  const pushNewThread = (threadsArray: Thread[], newThread: Thread) => {
    const index = threadsArray.findIndex(
      (thread) => thread.id === newThread.id
    );

      const updatedThreadsArray: Thread[] = threadsArray;

      if (index !== -1) {
        updatedThreadsArray[index] = newThread;
      } else {
        updatedThreadsArray.push(newThread);
      }

      if (!updatedThreadsArray) {
        return;
      }
      const data = JSON.stringify(updatedThreadsArray);
      if (!data) {
        return;
      }
    localStorage.setItem("threads", data);
    setThreadsArray(updatedThreadsArray)
  };



  //När vi klickar på submit
  useEffect(() => {
    const addComment = (newComment: _Comment) => {
      if (thread) {
        const updatedThread: Thread = {
          ...thread,
          comments: [...thread.comments, newComment],
        };
        //Uppdaterar så att nya kommentarer läggs till + gamla
        setThread(updatedThread);
        //Funktion som uppdaterar listan vi parsade med nya
        pushNewThread(threadsArray, updatedThread);
      }
    };
    addComment(newComment);
  }, [onClick]);



  
  return (
    <div className="details-container">
      
      <button onClick={() => setOnClick((state) => !state)}>Submit</button>
      
    </div>
  );
}

export default ThreadDetailView;
