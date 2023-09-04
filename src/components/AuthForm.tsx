import React, { useEffect, useState } from 'react'
import '../styles/AuthForm.css'

function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistered, setIsRegistered] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [messageColor, setMessageColor] = useState<string | null>(null)

  // This useEffect runs once when the component is mounted
  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers)
      // You can set the first user as the logged-in user here if needed
    }
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear any existing message
    setMessage(null)
    setMessageColor(null)

    // Check if user is logging out
    if (!email && !password && loggedInUser) {
      // Do not remove user data from localStorage
      setLoggedInUser(null)
      setEmail('')
      setPassword('')
      setMessage('Logged out successfully.')
      setMessageColor('green')
      setTimeout(() => {
        setMessage(null)
        setMessageColor(null)
      }, 3000) // Clear message after 3 seconds
      return
    }

    // Validate and save the user to localStorage
    if (email && password) {
      const storedUsers = localStorage.getItem('users')
      const users = storedUsers ? JSON.parse(storedUsers) : []

      const userExists = users.some((user: any) => user.email === email)

      if (userExists) {
        setMessage('User already exists. Login instead.')
        setMessageColor('red')
        return
      }

      const newUser = { email, password }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      setLoggedInUser(email)
      setIsRegistered(true) // Reset to login form
      setEmail('')
      setPassword('')
      setMessage('Registration successful.')
      setMessageColor('green')
    } else {
      setMessage('Please fill in both email and password.')
      setMessageColor('red')
    }

    setTimeout(() => {
      setMessage(null)
      setMessageColor(null)
    }, 3000) // Clear message after 3 seconds
  }

  return (
    <div className="authContainer">
      
    </div>
  )
}

export default AuthForm
