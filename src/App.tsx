import React from 'react';
import '../src/styles/App.css';
import AuthForm from './components/AuthForm'
import './styles/App.css';
import ThreadCreationView from './components/ThreadCreationView';



function App() {
  return (
    <div className="App">
      <AuthForm />
      <ThreadCreationView />
    </div>
  );
}

export default App;
