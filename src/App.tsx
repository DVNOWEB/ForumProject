import React from 'react'
import '../src/styles/App.css'
import './styles/App.css'
import AuthForm from './components/AuthForm'
import ThreadCreationView from './components/ThreadCreationView'

function App() {

  const handleCreateThread = (
    title: string,
    category: ThreadCategory,
    description: string
  ) => {
    console.log('Skapa tråd:', title, category, description)
  }

  return (
    <div className="App">
      <AuthForm />
      {/* Skicka med onCreateThread-funktionen som en prop */}
      <ThreadCreationView onCreateThread={handleCreateThread} />
    </div>
  )
}

export default App
