// import { useState, useEffect } from 'react'
// import { FaTrashAlt, FaEdit } from 'react-icons/fa'
// import '../styles/Thread.css'

// function Thread({
//   thread,
//   comments,
//   loggedInUser,
//   onUpdate,
//   onDelete,
// }: ThreadProps) {
//   const [answer, setAnswer] = useState<_Comment | undefined>()
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedTitle, setEditedTitle] = useState(thread.title)
//   const [editedDescription, setEditedDescription] = useState(thread.description)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [refresh, setRefresh] = useState(false)

//   useEffect(() => {
//     if ('isAnswered' in thread && thread.isAnswered === true) {
//       const qnaThread = thread as QNAThread
//       setAnswer(
//         comments.find((comment) => comment.id === qnaThread.commentAnswerId)
//       )
//     }
//     if (refresh) {
//       // Reset the refresh state after rendering
//       setRefresh(false)
//     }
//   }, [thread, comments, refresh])

//   const handleEdit = () => {
//     setIsEditing(true)
//   }

//   const handleSave = () => {
//     const editedThread = {
//       ...thread,
//       title: editedTitle,
//       description: editedDescription,
//     }
//     onUpdate(editedThread)
//     setIsEditing(false)
//   }

//   const handleDelete = () => {
//     setIsDeleting(true)
//   }

//   const handleConfirmDelete = () => {
//     onDelete(thread.id)
//   }

//   return (
//     <div className="threadContainer">
//       <div>
//         {isEditing ? (
//           <div>
//             <input
//               type="text"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//             />
//             <textarea
//               value={editedDescription}
//               onChange={(e) => setEditedDescription(e.target.value)}></textarea>
//             <button onClick={handleSave}>Save</button>
//             <button onClick={() => setIsEditing(false)}>Cancel</button>
//           </div>
//         ) : (
//           <div>
//             <h2>{thread.title}</h2>
//             <p>Creator: {thread.creator.name}</p>
//             <p>Description: {thread.description}</p>
//             {thread.category === 'QNA' &&
//               'isAnswered' in thread &&
//               thread.isAnswered === true && (
//                 <div>
//                   <h3>Answered!</h3>
//                   <p>Answer: {answer?.content}</p>
//                   <p>By: {answer?.creator.userName}</p>
//                 </div>
//               )}
//           </div>
//         )}
//       </div>
//       <div>
//         {isDeleting ? (
//           <div>
//             <button onClick={handleConfirmDelete}>Yes, Delete</button>
//             <button onClick={() => setIsDeleting(false)}>Cancel</button>
//           </div>
//         ) : (
//           <>
//             <div>
//               <div>
//                 <div>
//                   <span>{thread.category}</span>
//                 </div>
//                 <span>{thread.creationDate}</span>
//               </div>
//               { loggedInUser ? (
//                 <>
//               <button className="btn_edit" onClick={handleEdit}>
//                 <FaEdit />
//               </button>
//               <button className="btn_delete" onClick={handleDelete}>
//                 <FaTrashAlt />
//               </button>
//               </>
//               )
//               : null
//               }
              
              
//             </div>
//             <div>
//               <span>{comments.length} comments</span>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Thread


import { useState, useEffect } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import '../styles/Thread.css'

function Thread({
  thread,
  comments,
  loggedInUser,
  onUpdate,
  onDelete,
}: ThreadProps) {
  const initialThreadData = {
    answer: undefined as _Comment | undefined,
    isEditing: false,
    editedTitle: thread.title,
    editedDescription: thread.description,
    isDeleting: false,
  }

  const [threadData, setThreadData] = useState(initialThreadData)

  useEffect(() => {
    if ('isAnswered' in thread && thread.isAnswered === true) {
      const qnaThread = thread as QNAThread
      setThreadData((prevState) => ({
        ...prevState,
        answer:
          comments.find(
            (comment) => comment.id === qnaThread.commentAnswerId
          ) || undefined, // Ensure the answer is either a _Comment or undefined
      }))
    }
  }, [thread, comments])

  const handleEdit = () => {
    // Check if the logged-in user is the creator of the thread
    if (loggedInUser && loggedInUser.id === thread.creator.id) {
      setThreadData((prevState) => ({ ...prevState, isEditing: true }))
    }
  }

  const handleSave = () => {
    if (loggedInUser && loggedInUser.id === thread.creator.id) {
      const editedThread = {
        ...thread,
        title: threadData.editedTitle,
        description: threadData.editedDescription,
      }
      onUpdate(editedThread)
      setThreadData((prevState) => ({ ...prevState, isEditing: false }))
    }
  }

  const handleDelete = () => {
    // Check if the logged-in user is the creator of the thread
    if (loggedInUser && loggedInUser.id === thread.creator.id) {
      setThreadData((prevState) => ({ ...prevState, isDeleting: true }))
    }
  }

  const handleConfirmDelete = () => {
    if (loggedInUser && loggedInUser.id === thread.creator.id) {
      onDelete(thread.id)
      window.location.reload()
    }
  }

  return (
    <div className="threadContainer">
      <div>
        {threadData.isEditing ? (
          <div>
            <input
              type="text"
              value={threadData.editedTitle}
              onChange={(e) =>
                setThreadData((prevState) => ({
                  ...prevState,
                  editedTitle: e.target.value,
                }))
              }
            />
            <textarea
              value={threadData.editedDescription}
              onChange={(e) =>
                setThreadData((prevState) => ({
                  ...prevState,
                  editedDescription: e.target.value,
                }))
              }></textarea>
            <button onClick={handleSave}>Save</button>
            <button
              onClick={() =>
                setThreadData((prevState) => ({
                  ...prevState,
                  isEditing: false,
                }))
              }>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <h2>{thread.title}</h2>
            <p>Creator: {thread.creator.name}</p>
            <p>Description: {thread.description}</p>
            {thread.category === 'QNA' &&
              'isAnswered' in thread &&
              thread.isAnswered === true && (
                <div>
                  <h3>Answered!</h3>
                  <p>Answer: {threadData.answer?.content}</p>
                  <p>By: {threadData.answer?.creator.userName}</p>
                </div>
              )}
          </div>
        )}
      </div>
      <div>
        {threadData.isDeleting ? (
          <div>
            <button onClick={handleConfirmDelete}>
              Yes, Delete
            </button>
            <button
              onClick={() =>
                setThreadData((prevState) => ({
                  ...prevState,
                  isDeleting: false,
                }))
              }>
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div>
              <div>
                <div>
                  <span>{thread.category}</span>
                </div>
                <span>{thread.creationDate}</span>
              </div>
              {loggedInUser ? (
                <>
                  <button className="btn_edit" onClick={handleEdit}>
                    <FaEdit />
                  </button>
                  <button className="btn_delete" onClick={handleDelete}>
                    <FaTrashAlt />
                  </button>
                </>
              ) : null}
            </div>
            <div>
              <span>{comments.length} comments</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Thread
