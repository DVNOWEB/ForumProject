

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
  comments: _Comment[];

}

interface QNAThread extends Thread {
  category: "QNA"
  isAnswered: boolean
  commentAnswerId?: number
}

interface _Comment {
  id: number
  thread: number
  content: string
  creator: User
}

interface commentProps {
  comment: _Comment
}

interface ThreadCreationViewProps {
  loggedInUser: User;
}

interface ThreadDetailViewProps {
  loggedInUser: User;
}


interface AuthFormProps {
  setLoggedInUser: (user: User | null) => void;
  loggedInUser: User | null;
}

interface ThreadProps {
  thread: Thread | QNAThread
  comments: _Comment[]
  loggedInUser: User | null // Add the loggedInUser prop
  onUpdate: (updatedThread: Thread) => void // Add the onUpdate prop
  onDelete: (threadId: number) => void // Add the onDelete prop
}

interface ThreadOverviewProps {
  thread: Thread | QNAThread
  comments: _Comment[]
}

interface commentProps {
  comment: _Comment
}

interface ThreadCreationViewProps {
  loggedInUser: User;
}

interface ThreadListViewProps {
  threads: Thread[]
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>
  loggedInUser: User | null
  onUpdate: (updatedThread: Thread) => void // Add this line
  onDelete: (threadId: number) => void // Add this line
}

// Define the props required for the AddComment component
interface AddCommentProps {
  onSubmit: (content: string) => void; // Function to handle comment submission
}


