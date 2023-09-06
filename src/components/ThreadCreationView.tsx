import React, { useState, useEffect } from 'react'
import '../styles/ThreadCreationView.css'

const ThreadCreationView = ({ loggedInUser }: ThreadCreationViewProps) => {
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<ThreadCategory>('THREAD')
  const [description, setDescription] = useState<string>('')

  const [threadsArray, setThreadsArray] = useState([])
  const [nextThreadId, setNextThreadId] = useState(1) // Initialize with 1

  useEffect(() => {
    // When the component mounts, set the nextThreadId to the next available ID
    const existingData = localStorage.getItem('threads')
    const existingThreads = existingData ? JSON.parse(existingData) : []
    setNextThreadId(existingThreads.length + 1)
  }, [])

  const saveThreadToLocalStorage = (threadData: Thread | QNAThread) => {
    try {
      const existingData = localStorage.getItem('threads')
      const existingThreads = existingData ? JSON.parse(existingData) : []
      existingThreads.push(threadData)

      localStorage.setItem('threads', JSON.stringify(existingThreads))
      setThreadsArray(existingThreads)
    } catch (error) {
      console.log(error)
    }
  }

  const formatCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')

    return `${year}/${month}/${day}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.length < 1 || description.length < 1) {
      return
    }

    if (category === 'THREAD') {
      const newThread: Thread = {
        id: nextThreadId, // Use the next available ID
        title,
        category,
        creationDate: formatCurrentDate(),
        description,
        creator: loggedInUser,
        comments: [],
      }

      saveThreadToLocalStorage(newThread)
      setTitle('')
      setDescription('')
    }

    if (category === 'QNA') {
      const newQNAThread: QNAThread = {
        id: nextThreadId, // Use the next available ID
        title,
        category,
        creationDate: formatCurrentDate(),
        isAnswered: false,
        commentAnswerId: 1,
        description,
        creator: loggedInUser,
        comments: [],
      }

      saveThreadToLocalStorage(newQNAThread)
      setTitle('')
      setDescription('')
    } else {
      console.log('Error: Invalid category')
    }

    // Increment the next available ID for the next thread
    setNextThreadId(nextThreadId + 1)

    // Reload the page after successfully creating the thread
    window.location.reload()
  }

  return (
    <div className="threadCreationView_container">
      <div className="header_thread">
        <h2>Add new thread.</h2>
      </div>
      <div className="formView_container">
        <form onSubmit={handleSubmit} className="form" action="submit">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={category}
            name=""
            id=""
            onChange={(e) => setCategory(e.target.value as ThreadCategory)}>
            <option value="THREAD">Thread</option>
            <option value="QNA">Q'n'A</option>
          </select>
          <textarea
            className="description"
            name=""
            id=""
            placeholder="Write your message here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
          <button>Create</button>
        </form>
      </div>
    </div>
  )
}

export default ThreadCreationView
