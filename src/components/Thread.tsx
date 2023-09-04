import React from 'react';

interface ThreadProps {
  thread: Thread | QNAThread
}

function Thread({ thread }: ThreadProps) {
  return (
    <div className='threadContainer'>
      <h2>{thread.title}</h2>
      <p>Category: {thread.category}</p>
      <p>Creation Date: {thread.creationDate}</p>
      <p>Creator: {thread.creator.name}</p>
      <p>Description: {thread.description}</p>
      {thread.category === 'QNA' && 'isAnswered' in thread &&(
        <div>
          <p>Is Answered: {thread.isAnswered ? 'yes' : 'no'}</p>
          {thread.commentAnswerId && (
            <p>Answer ID: {thread.commentAnswerId}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Thread;