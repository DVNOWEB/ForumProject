
import React, { useEffect, useState } from 'react';
import '../styles/Thread.css'



  function Thread({ thread, comments }: ThreadProps) {
  const [answer, setAnswer] = useState<(_Comment)>()
  useEffect(() => {
    if('isAnswered' in thread && thread.isAnswered === true){
      const qnaThread = thread as QNAThread
      setAnswer(comments.find((comment) => (comment.id === qnaThread.commentAnswerId)))
    }
  }, [])
  
  
  return (
    <div className='threadContainer'>
      <h2>{thread.title}</h2>
      <p>Category: {thread.category}</p>
      <p>Creation Date: {thread.creationDate}</p>
      <p>Creator: {thread.creator.name}</p>
      <p>Description: {thread.description}</p>
      
      {thread.category === 'QNA' && 'isAnswered' in thread && thread.isAnswered === true &&(
        <div>
          <h3>Answered!</h3>
          <p>Answer: {answer?.content}</p>
          <p>By: {answer?.creator.userName}</p>
        </div>
      )}
      {thread.category === 'QNA' && 'isAnswered' in thread && thread.isAnswered === false &&(
        <div>
          <h3>This QNA is not yet answered</h3>
        </div>
      )}
    </div>
  );
};

export default Thread;