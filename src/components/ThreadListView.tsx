import React, { useEffect, useState } from 'react';
import Thread from './Thread';

// Function to save a thread to localStorage
function saveThreadToLocalStorage(threadData: Thread | QNAThread) {
  try {
    // Retrieve existing thread data from localStorage
    const existingData = localStorage.getItem('threads');
    const existingThreads = existingData ? JSON.parse(existingData) : [];

    // Add the new thread to the existing threads
    existingThreads.push(threadData);

    // Save the updated threads to localStorage
    localStorage.setItem('threads', JSON.stringify(existingThreads));
  } catch (error) {
    // Handle errors (e.g., localStorage is full, data is too large)
    console.error('Error saving thread to localStorage:', error);
  }
}

const newThread: Thread = {
  id: 2,
  title: 'En till tråd',
  category: 'THREAD',
  creationDate: 'idag',
  description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  creator: {
    id: 3,
    name: 'Banan Mannen',
    userName: 'Banana',
  },
};

saveThreadToLocalStorage(newThread);
//--------------------------------------------------------------------------------------------------
function ThreadListView() {

const [threads, setThreads] = useState<(Thread)[]>([])

useEffect(() => {
  const fetchData = async () => {
    const threadData = localStorage.getItem('threads')
    if(threadData) {
      const parsedThreads = JSON.parse(threadData)
      setThreads(parsedThreads)
    }
  }

  fetchData()
}, [])



  return (
    <div >
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadListView;