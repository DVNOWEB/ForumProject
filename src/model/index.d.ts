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
  description?: string
  creator: User
  comments: Comment[];

}

interface QNAThread extends Thread {
  category: "QNA"
  isAnswered: boolean
  commentAnswerId?: number
}

interface _Comment {
  id: number
  // thread: number
  content: string
  creator: User
  isAnswer: boolean
}

interface ThreadCreationViewProps {
  loggedInUser: User;
}


interface AuthFormProps {
  setLoggedInUser: (user: User | null) => void;
  loggedInUser: User | null;

}

interface ThreadProps {
  thread: Thread | QNAThread
  comments: _Comment[]
}

interface ThreadCreationViewProps {
  loggedInUser: User;
}


interface AuthFormProps {
  setLoggedInUser: (user: User | null) => void;
  loggedInUser: User | null;
}


