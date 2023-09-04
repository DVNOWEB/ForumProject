
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


























import React from 'react'

const ThreadDetailViewComment = () => {
  return (
    <div>ThreadDetailViewComment</div>
  )
}

export default ThreadDetailViewComment


// Component for displaying a single comment
// const CommentItem: React.FC<Comment> = ({ content, creator }) => (
//     <div className="details-comment">
//       {creator}: {content}
//     </div>
//   );  
  
  // const App: React.FC = () => {
  //   const thread = {
  //     id: 1,
  //     title: 'Sample Thread',
  //     creationDate: '2023-09-04',
  //     creator: 'John Doe',
  //     // Other properties...
  //   };
  // }
  
  //   return (
  //     <div className="App">
  //       <ThreadDetailView thread={thread} />
  //     </div>
  //   );
  // };
  
  // export default App;