import React, { useEffect, useState } from 'react';
import Thread from './Thread';
import '../styles/TreadListView.css';

function ThreadListView() {
const [comments, setComments] = useState<(_Comment)[]>([])
const [threads, setThreads] = useState<(Thread)[] | (QNAThread)[]>([])
useEffect(() => {
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
