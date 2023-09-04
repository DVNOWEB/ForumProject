import React, { useState } from "react";
import "../src/styles/App.css";
import AuthForm from "./components/AuthForm";
import ThreadCreationView from "./components/ThreadCreationView";
import React from 'react';
import '../src/styles/App.css';
import '../src/styles/Thread.css';
import '../src/styles/TreadListView.css';
import AuthForm from './components/AuthForm'

import ThreadListView from './components/ThreadListView';



function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
<<<<<<< HEAD
    <div className="App">
      <AuthForm setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
      {/* Pass loggedInUser and threads to ThreadCreationView */}
      {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
=======
    <div className="ThreadListContainer">
      <ThreadListView />
>>>>>>> fd652d30f3c86353dfd9d86abf49f701768f06d4
    </div>
  );
}

export default App;
