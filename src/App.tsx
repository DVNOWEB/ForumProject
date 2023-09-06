import ThreadDetailView from './components/ThreadDetailView';

import { useState } from 'react'
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
      {loggedInUser && <ThreadDetailView loggedInUser={loggedInUser} />}
    </div>
  )
}

export default App
