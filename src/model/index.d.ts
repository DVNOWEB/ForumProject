interface User {
  id: number
  name: string
  userName: string
}

type ThreadCategory = 'THREAD' | 'QNA'

interface Thread {
  id: number
  title: string
  category: ThreadCategory
  creationDate: string
  description: string
  creator: User
}

interface QNAThread extends Thread {
  category: 'QNA'
  isAnswered: boolean
  commentAnswerId?: number
}

interface _Comment {
  id: number
  thread: number
  content: string
  creator: User
  isAnswer: boolean
}

interface ThreadProps {
  thread: Thread | QNAThread
  comments: _Comment[]
}

