// import React, { useState } from 'react'

// interface ThreadCreationViewProps {
//   onCreateThread: (
//     title: string,
//     category: ThreadCategory,
//     description: string
//   ) => void
// }

// function ThreadCreationView({ onCreateThread }: ThreadCreationViewProps) {
//   const [title, setTitle] = useState('')
//   const [category, setCategory] = useState<ThreadCategory>('THREAD')
//   const [description, setDescription] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onCreateThread(title, category, description)
//     setTitle('')
//     setCategory('THREAD')
//     setDescription('')
//   }

//   return (
//     <div>
//       <h2>Create New Thread</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value as ThreadCategory)}>
//           <option value="THREAD">Thread</option>
//           <option value="QNA">Q&A</option>
//         </select>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//         />
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   )
// }

// export default ThreadCreationView

// ThreadCreationView.tsx
import React, { useEffect, useState } from 'react'

function ThreadCreationView({
  onCreateThread,
  loggedInUser,
}: ThreadCreationViewProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ThreadCategory>('THREAD')
  const [description, setDescription] = useState('')
  const [showMessageForm, setShowMessageForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loggedInUser) {
      onCreateThread(title, category, description)
      setTitle('')
      setCategory('THREAD')
      setDescription('')
    }
  }

  // Toggle the Message form based on loggedInUser
  useEffect(() => {
    if (loggedInUser) {
      setShowMessageForm(true)
    } else {
      setShowMessageForm(false)
    }
  }, [loggedInUser])

  return (
    <div>
      {showMessageForm && (
        <form onSubmit={handleSubmit}>
          <h2>Create New Thread</h2>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ThreadCategory)}>
              <option value="THREAD">Thread</option>
              <option value="QNA">Q&A</option>
            </select>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  )
}

export default ThreadCreationView
