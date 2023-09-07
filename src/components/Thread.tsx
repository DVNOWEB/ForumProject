import { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import '../styles/Thread.css';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';

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
  };

  const [threadData, setThreadData] = useState(initialThreadData);

  useEffect(() => {
    if ('isAnswered' in thread && thread.isAnswered === true) {
      const qnaThread = thread as QNAThread;
      setThreadData((prevState) => ({
        ...prevState,
        answer: comments.find((comment) => comment.id === qnaThread.commentAnswerId) || undefined,
      }));
    }
  }, [thread, comments]);

  const userIsCreator = loggedInUser && loggedInUser.id === thread.creator.id;

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (userIsCreator) {
      setThreadData((prevState) => ({ ...prevState, isEditing: true }));
    }
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (userIsCreator) {
      const editedThread = {
        ...thread,
        title: threadData.editedTitle,
        description: threadData.editedDescription,
      };
      onUpdate(editedThread);
      setThreadData((prevState) => ({ ...prevState, isEditing: false }));
    }
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (userIsCreator) {
      setThreadData((prevState) => ({ ...prevState, isDeleting: true }));
    }
  };

  const handleConfirmDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (userIsCreator) {
      onDelete(thread.id);
      window.location.reload();
    }
  };

  return (
<<<<<<< HEAD
    
    <Link to={`/${thread.id}`}  className="threadContainer">
=======
    <Link to={`/${thread.id}`} className="threadContainer">
>>>>>>> 8fd03d2b44aad8e430a5db73640df4fed9c89d78
      <div>
        {threadData.isEditing ? (
          <div className="thread_input-container" onClick={(e: MouseEvent<HTMLElement>) => { 
            e.preventDefault();
            e.stopPropagation();
          }}>
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
              }
            ></textarea>
            <button onClick={handleSave}>Save</button>
            <button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                setThreadData((prevState) => ({
                  ...prevState,
                  isEditing: false,
                }));
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <h2>{thread.title}</h2>
            <p>Creator: {thread.creator.name}</p>
            <p>Description: {thread.description}</p>
            {thread.category === 'QNA' && 'isAnswered' in thread && thread.isAnswered === true && (
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
            <button className="btn_delete" onClick={handleConfirmDelete}>
              Yes, Delete
            </button>
            <button
              className="btn_edit"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                setThreadData((prevState) => ({
                  ...prevState,
                  isDeleting: false,
                }));
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="thread_right-box">
            <div>
              <div>
                <span>{thread.category}</span>
              </div>
              <span>{thread.creationDate}</span>
            </div>
            <div>
              {userIsCreator ? (
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
          </div>
        )}
      </div>
    </Link>
  );
}

export default Thread;

