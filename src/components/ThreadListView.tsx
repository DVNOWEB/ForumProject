import { useEffect, useState } from 'react'
import Thread from './Thread'
import '../styles/TreadListView.css'

function ThreadListView({ threads, setThreads }: ThreadListViewProps) {
  // State to store comments and the logged-in user
  const [comments, setComments] = useState<_Comment[]>([])
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  // Load threads and comments from localStorage when the component mounts
  useEffect(() => {
    // Retrieve thread and comment data from localStorage
    const threadData: string | null = localStorage.getItem('threads')
    const commentData: string | null = localStorage.getItem('comments')

    if (threadData) {
      // Parse and set threads from localStorage
      const parsedThreads: (Thread | QNAThread)[] = JSON.parse(threadData)
      setThreads(parsedThreads)
    }

    if (commentData) {
      // Parse and set comments from localStorage
      const parsedComments: _Comment[] = JSON.parse(commentData)
      setComments(parsedComments)
    }
  }, [setThreads]) // Dependency array ensures this effect runs only once on component mount

  // Load the logged-in user from localStorage when the component mounts
  useEffect(() => {
    const loggedInUserData: string | null = localStorage.getItem('loggedInUser')

    if (loggedInUserData) {
      // Parse and set the logged-in user
      const user: User = JSON.parse(loggedInUserData)
      setLoggedInUser(user)
    }
  }, []) // This effect runs only once on component mount

  // Handle updating a thread
  const handleThreadUpdate = (updatedThread: Thread) => {
    const updatedThreads: Thread[] = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    )
    setThreads(updatedThreads)

    // Update the threads in localStorage
    localStorage.setItem('threads', JSON.stringify(updatedThreads))
  }

  // Handle deleting a thread
  const handleThreadDelete = (threadId: number) => {
    const updatedThreads: Thread[] = threads.filter((thread) => thread.id !== threadId)
    setThreads(updatedThreads)

    // Update the threads in localStorage
    localStorage.setItem('threads', JSON.stringify(updatedThreads))
  }

  return (
    <div className="ThreadListContainer">
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          thread={thread}
          comments={comments.filter((comment) => comment.thread === thread.id)}
          loggedInUser={loggedInUser}
          onUpdate={handleThreadUpdate}
          onDelete={handleThreadDelete}
        />
      ))}
    </div>
  )
}

export default ThreadListView

