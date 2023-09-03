import React, { useEffect, useState } from 'react'
import '../styles/AuthForm.css'

function AuthForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistered, setIsRegistered] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [messageColor, setMessageColor] = useState<string | null>(null)

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers)
      // You can set the first user as the logged-in user here if needed
    }
  }, [])

  const generateUserId = () => {
    // Generate a unique user ID here (e.g., using a library like uuid)
    // For simplicity, I'll just use a random number for demonstration purposes
    return Math.random().toString(36).substring(7)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setMessage(null)
    setMessageColor(null)

    if (!name && !email && !password && loggedInUser) {
      setLoggedInUser(null)
      setName('') // Reset the name
      setEmail('')
      setPassword('')
      setMessage('Logged out successfully.')
      setMessageColor('green')
      setTimeout(() => {
        setMessage(null)
        setMessageColor(null)
      }, 3000)
      return
    }

    if (name && email && password) {
      const storedUsers = localStorage.getItem('users')
      const users = storedUsers ? JSON.parse(storedUsers) : []

      const userExists = users.some((user: any) => user.email === email)

      if (userExists) {
        // Find the user by email
        const existingUser = users.find((user: any) => user.email === email)
        if (existingUser && existingUser.name === name) {
          // Redirect to welcome page if the name matches
          setLoggedInUser(existingUser.id) // Set the user ID as the logged-in user
          return
        }

        setMessage('User already exists. Log in instead.')
        setMessageColor('red')
        return
      }

      if (isRegistered) {
        setMessage('User not registered. Please register first.')
        setMessageColor('red')
        return
      }

      const newUser = { id: generateUserId(), name, email, password }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      setLoggedInUser(newUser.id) // Set the user ID as the logged-in user
      setIsRegistered(true)
      setEmail('')
      setPassword('')
      setMessage('Registration successful.')
      setMessageColor('green')
    } else {
      setMessage('Please fill in all fields.')
      setMessageColor('red')
    }

    setTimeout(() => {
      setMessage(null)
      setMessageColor(null)
    }, 3000)
  }

  const handleLogout = () => {
    setLoggedInUser(null)
    setName('')
    setEmail('')
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
          <span>Login or register</span>
      </div>
      {loggedInUser ? (
        <div>
          <h2>Welcome, {name || 'User'}!</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className="form_container">
          <h2>{isRegistered ? 'Log in' : 'Register'}</h2>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
