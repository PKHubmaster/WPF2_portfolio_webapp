'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const AddProjectPage = () => {
  const { id } = useParams(); // Get the candidate ID from the URL
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateCompleted: '',
    githubLink: '',
    liveLink: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/candidate/${id}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/candidate-details/${id}`); // Redirect back to candidate details page after successful add
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Add New Project</h1>
        <button className="btn btn-secondary" onClick={() => router.push(`/candidate-details/${id}`)}>
          Back to Candidate Details
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Adding new project...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dateCompleted" className="form-label">Date Completed</label>
            <input
              type="date"
              className="form-control"
              id="dateCompleted"
              name="dateCompleted"
              value={formData.dateCompleted}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="githubLink" className="form-label">GitHub Link</label>
            <input
              type="url"
              className="form-control"
              id="githubLink"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="liveLink" className="form-label">Live Link</label>
            <input
              type="url"
              className="form-control"
              id="liveLink"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProjectPage;
