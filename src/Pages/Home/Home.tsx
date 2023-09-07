import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import ThreadCreationView from "../../components/ThreadCreationView";
import ThreadListView from "../../components/ThreadListView";
import { useUserContext } from "../../Context/Context";

const Home = () => {
  const { loggedInUser, setLoggedInUser, toggleView } = useUserContext();

  const [threads, setThreads] = useState<Thread[]>([]);
  //Bestämmer vad som ska visas på sidan

  useEffect(() => {
    const threadData: string | null = localStorage.getItem("threads");
    if (threadData) {
      const parsedThreads: Thread[] | QNAThread[] = JSON.parse(threadData);
      setThreads(parsedThreads);
    }
  }, []);

  // Function to handle thread updates
  const handleThreadUpdate = (updatedThread: Thread) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    setThreads(updatedThreads);
  };

  // Function to handle thread deletions
  const handleThreadDelete = (threadId: number) => {
    const updatedThreads = threads.filter((thread) => thread.id !== threadId);
    setThreads(updatedThreads);
  };

  console.log(loggedInUser);

  return (
    <div>
      <AuthForm setLoggedInUser={setLoggedInUser} />

      {toggleView && loggedInUser ? (
        <ThreadCreationView loggedInUser={loggedInUser} />

      ) : (
        <ThreadListView
          threads={threads}
          setThreads={setThreads}
          loggedInUser={loggedInUser} // Pass the loggedInUser prop here
          onUpdate={handleThreadUpdate}
          onDelete={handleThreadDelete}
        />

      )}
    </div>
  );
};

export default Home;
