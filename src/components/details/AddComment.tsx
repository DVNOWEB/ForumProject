import React, { useState } from 'react';


// Define the AddComment component
const AddComment: React.FC<AddCommentProps> = ({ onSubmit }) => {
  // State to manage the content of the comment input field
  const [content, setContent] = useState('');

  // Function to handle changes in the comment input field
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === '') return; // Prevent empty comments
    onSubmit(content); // Pass the comment content to the parent component for submission
    setContent(''); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="Add a comment..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddComment;
