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
  const [answer, setAnswer] = useState<_Comment | undefined>()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(thread.title)
  const [editedDescription, setEditedDescription] = useState(thread.description)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if ('isAnswered' in thread && thread.isAnswered === true) {
      const qnaThread = thread as QNAThread
      setAnswer(
        comments.find((comment) => comment.id === qnaThread.commentAnswerId)
      )
    }
  }, [thread, comments])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    const editedThread = {
      ...thread,
      title: editedTitle,
      description: editedDescription,
    }
    onUpdate(editedThread)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
  }

  const handleConfirmDelete = () => {
    onDelete(thread.id)
  }

  return (
    <div className="threadContainer">
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}></textarea>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
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
                  <p>Answer: {answer?.content}</p>
                  <p>By: {answer?.creator.userName}</p>
                </div>
              )}
          </div>
        )}
      </div>
      <div>
        {isDeleting ? (
          <div>
            <p>Confirm deletion: {thread.title}</p>
            <button onClick={handleConfirmDelete}>Yes, Delete</button>
            <button onClick={() => setIsDeleting(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <button className="btn_edit" onClick={handleEdit}>
              <FaEdit />
            </button>
            <button className="btn_delete" onClick={handleDelete}>
              <FaTrashAlt />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Thread
