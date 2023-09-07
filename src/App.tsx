<<<<<<< HEAD
import ThreadDetailView from './components/ThreadDetailView';

import { useState } from 'react'
=======
import { useEffect, useState } from 'react'
>>>>>>> 4a955bc033d17bb5f31cedc6d63c75385322f03f
import AuthForm from './components/AuthForm'
import ThreadCreationView from './components/ThreadCreationView'
import ThreadListView from './components/ThreadListView'
import ThreadDetailView from './components/details/ThreadDetailView'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    const threadData: string | null = localStorage.getItem('threads')
    if (threadData) {
      const parsedThreads: Thread[] | QNAThread[] = JSON.parse(threadData)
      setThreads(parsedThreads)
    }
  }, [])


  // Function to handle thread updates
  const handleThreadUpdate = (updatedThread: Thread) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    )
    setThreads(updatedThreads)
  }

  // Function to handle thread deletions
  const handleThreadDelete = (threadId: number) => {
    const updatedThreads = threads.filter((thread) => thread.id !== threadId)
    setThreads(updatedThreads)
  }

  return (
    <div className="App">
      <AuthForm setLoggedInUser={setLoggedInUser} />
      {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
<<<<<<< HEAD
      <ThreadListView />
      {loggedInUser && <ThreadDetailView loggedInUser={loggedInUser} />}
=======
      <ThreadListView
        threads={threads}
        setThreads={setThreads}
        loggedInUser={loggedInUser} // Pass the loggedInUser prop here
        onUpdate={handleThreadUpdate}
        onDelete={handleThreadDelete}
      />
      <ThreadDetailView />
>>>>>>> 4a955bc033d17bb5f31cedc6d63c75385322f03f
    </div>
  )
}

export default App
