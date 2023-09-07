import React, { useEffect } from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import ThreadCreationView from '../../components/ThreadCreationView';
import ThreadListView from '../../components/ThreadListView';
import { useUserContext } from '../../Context/Context';


const Home = () => {

const { loggedInUser, setLoggedInUser } = useUserContext();

console.log(loggedInUser)

  return (
    <div>
      <Link to="/1">hej</Link>
         <AuthForm setLoggedInUser={setLoggedInUser} />
        {/* Pass loggedInUser and threads to ThreadCreationView */}
        {loggedInUser && <ThreadCreationView loggedInUser={loggedInUser} />}
        <ThreadListView />
    </div>          
  )
}

export default Home