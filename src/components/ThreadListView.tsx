import React, { useEffect, useState } from 'react';
import Thread from './Thread';
import '../styles/TreadListView.css';

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


/* const newComment: _Comment = {
  id: 9,
  thread: 9,
  content: 'Bra tråd detta!',
  creator: {
    id: 1,
    name: 'Gustav',
    userName: 'Gusten'
  },
  isAnswer: true
}
saveCommentToLocalStorage(newComment) */

/* const newThread: Thread | QNAThread = {
  id: 3,
  title: 'Vanlig tråd som INTE är QNA',
  category: 'THREAD',
  creationDate: 'idag',
  description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  creator: {
    id: 3,
    name: 'Banan Mannen',
    userName: 'Banana',
  },
  
  
};

saveThreadToLocalStorage(newThread); */
//--------------------------------------------------------------------------------------------------
function ThreadListView() {
const [comments, setComments] = useState<(_Comment)[]>([])
const [threads, setThreads] = useState<(Thread)[] | (QNAThread)[]>([])
useEffect(() => {
  const fetchData = async () => {
    const threadData: string|null = localStorage.getItem('threads')
    const commentData: string|null = localStorage.getItem('comments')
    if(threadData) {
      const parsedThreads: Thread[]|QNAThread[] = JSON.parse(threadData)
      setThreads(parsedThreads)
    }
    if(commentData) {
      const parsedComments: _Comment[] = JSON.parse(commentData)
      setComments(parsedComments)
    }
  }
  fetchData()
}, [])


  return (
    <div className="ThreadListContainer">
      {threads.map((thread) => (
        <Thread thread={thread} comments={comments.filter((comments) => comments.thread === thread.id)} />
      ))}
    </div>
  );
}

export default ThreadListView;