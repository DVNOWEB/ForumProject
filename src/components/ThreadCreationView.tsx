import React, { useEffect, useState } from 'react'
import '../styles/ThreadCreationView.css'

const ThreadCreationView = ({ loggedInUser }: ThreadCreationViewProps) => {
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<ThreadCategory>('THREAD')
  const [description, setDescription] = useState<string>('')

  //Om vi vill få tag på den här globalt, flytta ut till Context/redux
  const [threadsArray, setThreadsArray] = useState([])

  const [user, setUser] = useState<User>({
    id: 2,
    name: 'Calle',
    userName: 'CalleKula',
    password: '1234',
  })

  const saveThreadToLocalStorage = (threadData: Thread | QNAThread) => {
    try {
      //Hämtar hem data från local
      const existingData = localStorage.getItem('threads')
      const existingThreads = existingData ? JSON.parse(existingData) : []
      existingThreads.push(threadData)

      localStorage.setItem('threads', JSON.stringify(existingThreads))
      setThreadsArray(existingThreads)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.length < 1 || description.length < 1) {
      return
    }

    //Följer Thread
    const newThread: Thread = {
      id: threadsArray.length + 1,
      title,
      category,
      creationDate: 'idag',
      description,
      creator: user,
    }

    console.log(loggedInUser)
    saveThreadToLocalStorage(newThread)


    // Clearing the form
    setTitle('')
    setCategory('THREAD')
    setDescription('')
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
            placeholder='Write your message here...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
          <button>Create</button>
        </form>
      </div>
    </div>
  )
}

export default ThreadCreationView
