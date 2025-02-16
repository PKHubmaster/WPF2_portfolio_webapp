'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditProjectPage = () => {
  const { id, projectId } = useParams(); // Get the candidate ID and project ID from the URL
  const [project, setProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dateCompleted: '',
    githubLink: '',
    liveLink: '',
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/candidate/${id}/projects/${projectId}`);
        const data = await response.json();

        if (response.ok) {
          setProject(data);
          setFormData({
            name: data.name,
            description: data.description,
            dateCompleted: data.dateCompleted,
            githubLink: data.githubLink,
            liveLink: data.liveLink,
          });
        } else {
          console.error('Project not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch project:', error);
        setLoading(false);
      }
    };

    if (id && projectId) {
      fetchProject();
    }
  }, [id, projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/candidate/${id}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/candidate-details/${id}`); // Redirect back to candidate details page after successful update
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Edit Project</h1>
        <button className="btn btn-secondary" onClick={() => router.push(`/candidate-details/${id}`)}>
          Back to Candidate Details
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading project details...</p>
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
            Update Project
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProjectPage;
