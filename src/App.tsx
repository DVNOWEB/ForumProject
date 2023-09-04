// import React, { useState } from 'react';
// import '../src/styles/App.css';
// import AuthForm from './components/AuthForm';
// import ThreadCreationView from './components/ThreadCreationView';

// function App() {
//   const [messages, setMessages] = useState<Message[]>([]); // Array to store messages
//   const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

//   // Function to handle thread creation and store messages
//   const handleCreateThread = (
//     title: string,
//     category: ThreadCategory,
//     description: string
//   ) => {
//     if (loggedInUser) {
//       const newThread = {
//         title,
//         category,
//         description,
//         user: loggedInUser, // Store the user ID with the message
//       };

//       // Add the new message to the messages array
//       setMessages([...messages, newThread]);

//       // Store the messages array in local storage
//       localStorage.setItem('messages', JSON.stringify([...messages, newThread]));
//     }
//   };

//   return (
//     <div className="App">
//       <AuthForm onLogin={(user) => setLoggedInUser(user)} />
//       {/* Pass loggedInUser to ThreadCreationView */}
//       <ThreadCreationView
//         onCreateThread={handleCreateThread}
//         loggedInUser={loggedInUser}
//       />
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react'
import '../src/styles/App.css'
import AuthForm from './components/AuthForm'
import ThreadCreationView from './components/ThreadCreationView'
import { handleCreateThread } from '../src/components/ThreadCreationView' // Import the function

function App() {
  const [threads, setThreads] = useState<Thread[]>([]) // Array to store threads
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null)

  const onCreateThread = (
    title: string,
    category: ThreadCategory,
    description: string
  ) => {
    // Call the handleCreateThread function from threadUtils.ts
    const updatedThreads = handleCreateThread(
      threads,
      loggedInUser || '', // Ensure loggedInUser is a string or empty string
      title,
      category,
      description
    )

    // Update the threads state
    setThreads(updatedThreads)

    // Store the updated threads array in local storage
    localStorage.setItem('threads', JSON.stringify(updatedThreads))
  }

  return (
    <div className="App">
      <AuthForm
        onLogin={(user) =>
          setLoggedInUser(user !== null ? user.toString() : null)
        }
      />
      {/* Pass loggedInUser and threads to ThreadCreationView */}
      <ThreadCreationView
        onCreateThread={onCreateThread} // Use the local onCreateThread function
        loggedInUser={loggedInUser}
        threads={threads}
      />
    </div>
  )
}

export default App



