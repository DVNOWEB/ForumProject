import React, { useState } from 'react'
import '../styles/ThreadCreationView.css'

const ThreadCreationView = ({ loggedInUser }: ThreadCreationViewProps) => {
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<ThreadCategory>('THREAD')
  const [description, setDescription] = useState<string>('')

  // Om vi vill få tag på den här globalt, flytta ut till Context/redux
  const [threadsArray, setThreadsArray] = useState([])

  const saveThreadToLocalStorage = (threadData: Thread | QNAThread) => {
    try {
      // Hämtar hem data från local
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
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Ensure two digits
    const day = currentDate.getDate().toString().padStart(2, '0') // Ensure two digits

    return `${year}/${month}/${day}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.length < 1 || description.length < 1) {
      return
    }

    if (category === 'THREAD') {
      // Följer Thread
      const newThread: Thread = {
        id: threadsArray.length + 1,
        title,
        category,
        creationDate: formatCurrentDate(), // Format the creationDate as "year/month/day"
        description,
        creator: loggedInUser,
        comments:[],
      } 
      
      saveThreadToLocalStorage(newThread) 
      setTitle('')
      setDescription('')
    } 

    if (category === 'QNA') {
      // Följer QNAThread
      const newQNAThread: QNAThread = {
        id: threadsArray.length + 1,
        title,
        category,
        creationDate: formatCurrentDate(), // Format the creationDate as "year/month/day"
        isAnswered: false,
        commentAnswerId: 1,
        description,
        creator: loggedInUser,
        comments:[],
      };
  
      saveThreadToLocalStorage(newQNAThread)
      setTitle('')
      setDescription('')
  }
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

