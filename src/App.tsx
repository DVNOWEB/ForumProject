import React, { useState } from "react";
import "../src/styles/App.css";
import AuthForm from "./components/AuthForm";
import ThreadCreationView from "./components/ThreadCreationView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <div className="App">
      <AuthForm setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
      {/* Pass loggedInUser and threads to ThreadCreationView */}
      {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
    </div>
  );
}

export default App;
