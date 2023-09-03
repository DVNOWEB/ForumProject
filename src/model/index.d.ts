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

interface Comment {
  id: number
  thread: number
  content: string
  creator: User
}

interface Message {
  title: string;
  category: ThreadCategory;
  description: string;
  user: string; // User ID
}

interface AuthFormProps {
  onLogin: (user: string | null) => void // Define the onLogin prop
}


interface ThreadCreationViewProps {
  onCreateThread: (
    title: string,
    category: ThreadCategory,
    description: string
  ) => void
  loggedInUser: string | null // Pass the logged-in user ID
}