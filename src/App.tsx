// import React, { useState } from "react";
// import "../src/styles/App.css";
// import AuthForm from "./components/AuthForm";
// import ThreadCreationView from "./components/ThreadCreationView";

// import ThreadListView from './components/ThreadListView';

// function App() {
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

//   return (
//     <div className="App">
//       <AuthForm setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
//       {/* Pass loggedInUser and threads to ThreadCreationView */}
//       {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
//       <div className="ThreadListContainer">
//         <ThreadListView />
//       </div>
//     </div>
//   );
// }
import ThreadDetailView from './components/details/ThreadDetailView';



// export default App;

import React, { useState } from 'react'
import './styles/App.css'
import AuthForm from './components/AuthForm'
import ThreadCreationView from './components/ThreadCreationView'
import ThreadListView from './components/ThreadListView'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  return (
    <div className="App">
      <AuthForm setLoggedInUser={setLoggedInUser} />
      {/* Pass loggedInUser and threads to ThreadCreationView */}
      {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
      <ThreadListView />
      <ThreadDetailView />
    </div>
  )
}

export default App
