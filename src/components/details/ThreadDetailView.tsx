import React, { useState } from 'react'
import "./details.css" 

// interface Thread {
//   id: number
//   title: string
//   category: ThreadCategory
//   creationDate: string
//   description?: string
//   creator: User
// }

// Component for displaying a single comment
const CommentItem: React.FC<Comment> = ({ content, creator }) => (
  <div className="details-comment">
    {creator}: {content}
  </div>
);

const ThreadDetailView: React.FC<{ thread: Thread }> = ({ thread }) => {

  const [comments, setComments] = useState<Comment[]>([]);

  

}

  return (
    <div className='details-container'>
      <h2 className=''>This is the title, this is big and on top of the site</h2>

      <div className='details-comment'>
        <p>This is the message / comment 1</p>
      </div>

      <input className='details-input' placeholder='Write your message here..'></input>
      <button className='details-add-btn'>Add new comment</button>
    </div>
  )
}

export default ThreadDetailView