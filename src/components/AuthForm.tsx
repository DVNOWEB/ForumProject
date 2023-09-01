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
      // Du kan sätta den första användaren som inloggad här om det behövs.
    }
  }, [])

  const generateUserId = () => {
    // Generera ett unikt användar-ID här (till exempel med hjälp av UUID eller någon annan metod).
    // I detta exempel använder vi en enkel tidsstämpel för att skapa ett ID.
    return Date.now().toString()
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setMessage(null)
    setMessageColor(null)

    if (!name && !email && !password && loggedInUser) {
      setLoggedInUser(null)
      setName('')
      setEmail('')
      setPassword('')
      setMessage('Loggad ut.')
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
        setMessage('Användaren finns redan. Logga in istället.')
        setMessageColor('red')
        return
      }

      const userId = generateUserId() // Skapa ett unikt användar-ID
      const newUser = { id: userId, name, email, password }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      setLoggedInUser(userId) // Sätt användarens ID som inloggad
      setIsRegistered(true)
      setName('')
      setEmail('')
      setPassword('')
      setMessage('Registreringen lyckades.')
      setMessageColor('green')
    } else {
      setMessage('Fyll i alla fält.')
      setMessageColor('red')
    }

    setTimeout(() => {
      setMessage(null)
      setMessageColor(null)
    }, 3000)
  }

  return (
    <div className="main_container">
      {loggedInUser ? (
        <div>
          <h2>Välkommen, användare {loggedInUser}!</h2>
          <button onClick={handleFormSubmit}>Logga ut</button>
        </div>
      ) : (
        <div>
          <h2 style={{ color: messageColor || '' }}>{message}</h2>
          <h2>{isRegistered ? 'Logga in' : 'Registrera'}</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="Name">Namn:</label>
              <input
                type="text"
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Email">E-post:</label>
              <input
                type="email"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Password">Lösenord:</label>
              <input
                type="password"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">
                {isRegistered ? 'Logga in' : 'Registrera'}
              </button>
            </div>
          </form>
          <div>
            <button onClick={() => setIsRegistered(!isRegistered)}>
              {isRegistered
                ? 'Har du inget konto? Registrera här.'
                : 'Har du redan ett konto? Logga in här.'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthForm
