
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddProjectPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateCompleted: "",
    githubLink: "",
    liveLink: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, dateCompleted, githubLink, liveLink } = formData;

    if (!name || !description || !dateCompleted || !githubLink || !liveLink) {
      setError("All fields are required.");
      return;
    }

    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/project-experience");
      })
      .catch((err) => setError("Error adding project"));
  };

  return (
    <div className="container">
      <h1>Add New Project</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date Completed</label>
          <input
            type="date"
            name="dateCompleted"
            className="form-control"
            value={formData.dateCompleted}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GitHub Link</label>
          <input
            type="url"
            name="githubLink"
            className="form-control"
            value={formData.githubLink}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Live Web Link</label>
          <input
            type="url"
            name="liveLink"
            className="form-control"
            value={formData.liveLink}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProjectPage;
