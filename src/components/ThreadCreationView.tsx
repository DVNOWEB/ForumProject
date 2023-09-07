import { useState, useEffect } from 'react'
import '../styles/ThreadCreationView.css'

const ThreadCreationView = ({ loggedInUser }: ThreadCreationViewProps) => {
  // State variables to manage the form inputs
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<ThreadCategory>('THREAD')
  const [description, setDescription] = useState<string>('')

  // State to track the next available thread ID
  const [nextThreadId, setNextThreadId] = useState<number>(1)

  useEffect(() => {
    // When the component mounts, set the nextThreadId to the next available ID
    const existingData = localStorage.getItem('threads')
    const existingThreads = existingData ? JSON.parse(existingData) : []

    setNextThreadId(existingThreads.length + 1)
  }, [])

  // Function to save a thread to localStorage
  const saveThreadToLocalStorage = (threadData: Thread | QNAThread) => {
    try {
      const existingData = localStorage.getItem('threads')
      const existingThreads = existingData ? JSON.parse(existingData) : []

      // Add the new thread data to the existing threads
      existingThreads.push(threadData)

      // Update localStorage with the updated threads
      localStorage.setItem('threads', JSON.stringify(existingThreads))
    } catch (error) {
      console.error('Error saving thread to localStorage:', error)
      // Handle the error here, e.g., display a message to the user
    }
  }

  // Function to format the current date in 'YYYY-MM-DD' format
  const formatCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if the title and description fields are not empty
    if (title.length < 1 || description.length < 1) {
      return
    }

    let newThread: Thread | QNAThread | null = null

    if (category === 'THREAD') {
      // Create a new thread object for the 'THREAD' category
      newThread = {
        id: nextThreadId,
        title,
        category,
        creationDate: formatCurrentDate(),
        description,
        creator: loggedInUser,
        comments: [],
      }
    } else if (category === 'QNA') {
      // Create a new Q'n'A thread object for the 'QNA' category
      newThread = {
        id: nextThreadId,
        title,
        category,
        creationDate: formatCurrentDate(),
        isAnswered: false,
        commentAnswerId: 1,
        description,
        creator: loggedInUser,
        comments: [],
      }
    } else {
      console.error('Error: Invalid category')
      // Handle the error here, e.g., display a message to the user
    }

    if (newThread) {
      // Save the new thread to localStorage
      saveThreadToLocalStorage(newThread)

      // Clear the form inputs
      setTitle('')
      setDescription('')

      // Increment the next available ID for the next thread
      setNextThreadId(nextThreadId + 1)
    }
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
