import React, { useState } from "react";
import "../src/styles/App.css";
import AuthForm from "./components/AuthForm";
import ThreadCreationView from "./components/ThreadCreationView";

import ThreadListView from './components/ThreadListView';
import ThreadDetailView from './components/details/ThreadDetailView';





function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <div className="App">
      <AuthForm setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
      {/* Pass loggedInUser and threads to ThreadCreationView */}
      {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
      <div className="ThreadListContainer">
        {/* <ThreadListView /> */}
      </div>
      <ThreadDetailView />
    </div>
  );
}

export default App;
