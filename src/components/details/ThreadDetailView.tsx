import React, { useState } from "react";
import "./details.css";
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
    creator: {
      id: 1,
      name: "John Doe",
      userName: "johndoe",
    },
    comments: [],
  };

  const [threads, setThreads] = useState([threadDetail]);









  
  return (
    <div className="details-container">
      {threads.map((props) => (
        <Thread key={props.id} thread={props} />
      ))}
    </div>
  );
}

export default ThreadDetailView;
