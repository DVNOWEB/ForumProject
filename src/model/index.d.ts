interface User {
  id: number
  name: string
  userName: string
  password: string
}

type ThreadCategory = 'THREAD' | 'QNA';

interface Thread {
  id: number
  title: string
  category: ThreadCategory
  creationDate: string
  description: string
  creator: User
}

interface QNAThread extends Thread {
  category: "QNA"
  isAnswered: boolean
  commentAnswerId?: number
}

interface Comment {
  id: number
  thread: number
  content: string
  creator: User
}

interface ThreadCreationViewProps {
  loggedInUser: User;
}


interface AuthFormProps {
  setLoggedInUser: (user: User | null) => void;
  loggedInUser: User | null;
}

