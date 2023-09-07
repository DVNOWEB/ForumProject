import React, { useState, useEffect } from "react";
import "../styles/ThreadDetailView.css";



const ThreadDetailView = ({ loggedInUser }: ThreadDetailViewProps) => {
  // Create an instance of the Thread type

  const [thread, setThread] = useState<Thread | QNAThread>();
  const [threadsArray, setThreadsArray] = useState<Thread[] | QNAThread[]>([]);
  const [content, setContent] = useState<string>("")

  const searchProps: string = window.location.pathname.split("/")[1]; 
  const propsId: number = parseInt(searchProps);
  console.log(propsId)

  //Hämtar Threads från localstorage.
  useEffect(() => {
    const threadData: string | null = localStorage.getItem("threads");
    if (threadData) {
      const parsedThreads: Thread[] | QNAThread[] = JSON.parse(threadData);
      //Lägger alla threads i en array
      setThreadsArray(parsedThreads);


      //Lägger threaden vi är inne på i en variabel.
      const desiredThreadId: number = propsId;
      const selected = parsedThreads.find(
        (thread) => thread.id === desiredThreadId
      );
      setThread(selected);
    }
  }, []);


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



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (content.length < 1) {
      return
    }
        if(thread) {
        const newComment: _Comment =  {
        id: thread.comments.length + 1,
        thread: propsId,
        content: content,
        creator: loggedInUser,
      }
      const addComment = (newComment: _Comment) => {
      
        const updatedThread: Thread = {
          ...thread,
          comments: [...thread.comments, newComment],
        };
        //Uppdaterar så att nya kommentarer läggs till + gamla
        setThread(updatedThread);
        //Funktion som uppdaterar listan vi parsade med nya
        pushNewThread(threadsArray, updatedThread);
      
    };
    addComment(newComment);
    }
  }






  
  return (
    <div className="details-container">
      {/* {thread &&  <Thread thread={thread} comments={thread?.comments} />} */}
      <form onSubmit={handleSubmit} className="form" action="submit">
          <input
            type="text"
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="addComment-btn">Add comment</button>
      </form>
            
    </div>
  );
}

export default ThreadDetailView;
