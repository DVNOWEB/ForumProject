import React from 'react';
import '../src/styles/App.css';
import AuthForm from './components/AuthForm'
import './styles/App.css';
import ThreadDetailView from './components/details/ThreadDetailView';



function App() {
  return (
    <div className="App">
      <AuthForm />
      <ThreadDetailView/>
    </div>
  );
}

export default App;
