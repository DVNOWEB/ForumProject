import ThreadDetailView from './components/ThreadDetailView';

import { useState } from 'react'
import AuthForm from './components/AuthForm'
import ThreadCreationView from './components/ThreadCreationView'
import ThreadListView from './components/ThreadListView'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)

  return (
<<<<<<< HEAD
    <div className="App">
      <AuthForm setLoggedInUser={setLoggedInUser} />
      {/* Pass loggedInUser and threads to ThreadCreationView */}
      {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
      <ThreadListView />
      {loggedInUser && <ThreadDetailView loggedInUser={loggedInUser} />}
    </div>
  )
}
=======
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Details />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
>>>>>>> 6811b1346cc13b45b1b450ade75469d6d4538c71

export default App
