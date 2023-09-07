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
