// import React from 'react'
// import '../src/styles/App.css'
// import './styles/App.css'
// import AuthForm from './components/AuthForm'
// import ThreadCreationView from './components/ThreadCreationView'

// function App() {

//   const handleCreateThread = (
//     title: string,
//     category: ThreadCategory,
//     description: string
//   ) => {
//     console.log('Skapa tråd:', title, category, description)
//   }

//   return (
//     <div className="App">
//       <AuthForm />
//       {/* Skicka med onCreateThread-funktionen som en prop */}
//       <ThreadCreationView onCreateThread={handleCreateThread} />
//     </div>
//   )
// }

// export default App








// App.tsx
import React, { useState } from 'react';
import '../src/styles/App.css';
import AuthForm from './components/AuthForm';
import ThreadCreationView from './components/ThreadCreationView';

function App() {
  const [messages, setMessages] = useState<Message[]>([]); // Array to store messages
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  // Function to handle thread creation and store messages
  const handleCreateThread = (
    title: string,
    category: ThreadCategory,
    description: string
  ) => {
    if (loggedInUser) {
      const newThread = {
        title,
        category,
        description,
        user: loggedInUser, // Store the user ID with the message
      };

      // Add the new message to the messages array
      setMessages([...messages, newThread]);

      // Store the messages array in local storage
      localStorage.setItem('messages', JSON.stringify([...messages, newThread]));
    }
  };

  return (
    <div className="App">
      <AuthForm onLogin={(user) => setLoggedInUser(user)} />
      {/* Pass loggedInUser to ThreadCreationView */}
      <ThreadCreationView
        onCreateThread={handleCreateThread}
        loggedInUser={loggedInUser}
      />
    </div>
  );
}

export default App;

