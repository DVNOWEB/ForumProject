import React, { useEffect, useState } from "react";
import "../styles/ThreadCreationView.css";

const ThreadCreationView = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<ThreadCategory>("QNA");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newThread = {
      title,
      category,
      description,
    };

    console.log(newThread);
  };

  return (
    <div className="threadCreationView">
      <h1>Add new thread.</h1>

      <form onSubmit={handleSubmit} className="form" action="submit">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          name=""
          id=""
          onChange={(e) => setCategory(e.target.value as ThreadCategory)}
        >
          <option value="THREAD">Thread</option>
          <option value="QNA">Q'n'A</option>
        </select>
        <textarea
          className="description"
          name=""
          id=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button>Create</button>
      </form>
    </div>
  );
};

export default ThreadCreationView;
