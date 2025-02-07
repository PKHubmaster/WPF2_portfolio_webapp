"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";  // Import use hook

const ProjectEditPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Use `use()` hook to unwrap `params`
  const { id } = use(params);  // Unwrap the params here

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateCompleted: "",
    githubLink: "",
    liveLink: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProject(data);
            setFormData({
              name: data.name,
              description: data.description,
              dateCompleted: data.dateCompleted,
              githubLink: data.githubLink,
              liveLink: data.liveLink,
            });
          }
        })
        .catch((err) => setError("Error fetching project details"));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, dateCompleted, githubLink, liveLink } = formData;
    
    if (!name || !description || !dateCompleted || !githubLink || !liveLink) {
      setError("All fields are required.");
      return;
    }

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/projects/${id}` : `/api/projects`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/project-experience");
      })
      .catch((err) => setError("Error saving project"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>{id ? "Edit Project" : "Add New Project"}</h1>
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

export default ProjectEditPage;
