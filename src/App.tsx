import React from 'react';
import '../src/styles/App.css';
import '../src/styles/Thread.css';
import '../src/styles/TreadListView.css';
import AuthForm from './components/AuthForm'

import ThreadListView from './components/ThreadListView';



function App() {
  return (
    <div className="ThreadListContainer">
      <ThreadListView />
    </div>
  );
}

export default App;
