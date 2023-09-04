interface ThreadProps {
  thread: Thread;
}

function Thread({ thread }: ThreadProps) {
  return (
    <div className='threadContainer'>
      <h2>{thread.title}</h2>
      <p>Category: {thread.category}</p>
      <p>Creation Date: {thread.creationDate}</p>
      <p>Creator: {thread.creator.name}</p>
      <p>Description: {thread.description}</p>
    </div>
  );
};
export default Thread;