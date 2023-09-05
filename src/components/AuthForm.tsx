import React, { useEffect, useState } from 'react'
import '../styles/AuthForm.css'

// Define the props interface for AuthForm
interface AuthFormProps {
  setLoggedInUser: (user: User | null) => void
}

function AuthForm({ setLoggedInUser }: AuthFormProps) {
  // Define state variables
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistered, setIsRegistered] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [messageColor, setMessageColor] = useState<string | null>(null)

  // Check for existing users in local storage when the component is mounted
  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers)
      // You can set the first user as the logged-in user here if needed
    }
      const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setLoggedInUser(user)
      setName(user.name) // Set the name from the logged-in user
    }
  }, [setLoggedInUser])

  // Function to generate a random user ID
  const generateUserId = () => {
    return Math.floor(Math.random() * 1000)
  }

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setMessage(null)
    setMessageColor(null)

    if (!userName || !password) {
      setMessage('Please fill in both email and password.')
      setMessageColor('red')
      setTimeout(() => {
        setMessage(null)
        setMessageColor(null)
      }, 3000)
      return
    }

    const storedUsers = localStorage.getItem('users')
    const users = storedUsers ? JSON.parse(storedUsers) : []

    if (isRegistered) {
      // Login
      const user = users.find(
        (user: User) => user.userName === userName && user.password === password
      )

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user))
        setLoggedInUser(user)
        setName(user.name)
      } else {
        setMessage('User not registered. Please register first.')
        setMessageColor('red')
        setTimeout(() => {
          setMessage(null)
          setMessageColor(null)
        }, 3000)
      }
    } else {
      // Registration
      const userExists = users.some((user: User) => user.userName === userName)

      if (userExists) {
        setMessage('User already exists. Log in instead.')
        setMessageColor('red')
      } else {
        const newUser = { id: generateUserId(), name, userName, password }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        localStorage.setItem('loggedInUser', JSON.stringify(newUser))
        setLoggedInUser(newUser)
        setIsRegistered(true)
        setUserName('')
        setPassword('')
        setName('') // Clear the name field after registration
        setMessage('Registration successful.')
        setMessageColor('green')
        setTimeout(() => {
          setMessage(null)
          setMessageColor(null)
        }, 3000)
      }
    }
  }

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser(null)
    setName('')
    setUserName('')
    setPassword('')
    setMessage('Logged out successfully.')
    setMessageColor('green')
    setTimeout(() => {
      setMessage(null)
      setMessageColor(null)
    }, 3000)
  }

  return (
    <div className="main_container">
      <div className="header">
        <h1>Online Forum</h1>
        {localStorage.getItem('loggedInUser') ? (
          <span>Logged in: {new Date().toISOString().split('T')[0]}</span>
        ) : (
          <span>{isRegistered ? 'Log in' : 'Register'}</span>
        )}
      </div>
      {localStorage.getItem('loggedInUser') ? (
        <div className="welcome_div">
          <h2>Welcome, {name || 'User'}!</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className="form_container">
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="Name">Name:</label>
              <input
                type="text"
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                id="Email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Password">Password:</label>
              <input
                type="password"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">
                {isRegistered ? 'Log in' : 'Register'}
              </button>
            </div>
          </form>
          <div>
            <button onClick={() => setIsRegistered(!isRegistered)}>
              {isRegistered
                ? "Don't have an account? Register here."
                : 'Already have an account? Log in here.'}
            </button>
          </div>
          <h2 style={{ color: messageColor || '' }}>{message}</h2>
        </div>
      )}
    </div>
  )
}

export default AuthForm
