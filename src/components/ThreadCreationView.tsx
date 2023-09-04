import React, { useEffect, useState } from 'react'
import '../styles/ThreadCreationView.css'

export const handleCreateThread = (
  threads: Thread[],
  loggedInUser: string | null,
  title: string,
  category: ThreadCategory,
  description: string
): Thread[] => {
  if (loggedInUser) {
    const newThread: Thread = {
      id: threads.length + 1, // Generate a unique ID for the thread
      title,
      category,
      creationDate: new Date().toISOString(),
      description,
      creator: {
        id: loggedInUser ? parseInt(loggedInUser, 10) : 0,
        name: '', 
        userName: '', 
      },
      comments: [], 
    }

    // Return the new threads array with the added thread
    return [...threads, newThread]
  }

  // Return the original threads array if not logged in
  return threads
}

function ThreadCreationView({
  onCreateThread,
  loggedInUser,
  threads,
}: ThreadCreationViewProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ThreadCategory>('THREAD')
  const [description, setDescription] = useState('')
  const [showMessageForm, setShowMessageForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loggedInUser) {
      onCreateThread(title, category, description)
      setTitle('')
      setCategory('THREAD')
      setDescription('')
    }
  }

  // Toggle the Message form based on loggedInUser
  useEffect(() => {
    if (loggedInUser) {
      setShowMessageForm(true)
    } else {
      setShowMessageForm(false)
    }
  }, [loggedInUser])

  return (
    <div className="main_container">
      {showMessageForm && (
        <form onSubmit={handleSubmit}>
          <h2>Create New Thread</h2>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ThreadCategory)}>
              <option value="THREAD">Thread</option>
              <option value="QNA">Q&A</option>
            </select>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  )
}

export default ThreadCreationView
