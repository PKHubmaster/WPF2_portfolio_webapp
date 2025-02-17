'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditProjectPage = () => {
  const { id, projectId } = useParams(); // Get the candidate ID and project ID from the URL
  const [project, setProject] = useState<any>(null); // State to store the fetched project data
  const [formData, setFormData] = useState({ // State to hold form input values
    name: '',
    description: '',
    dateCompleted: '',
    githubLink: '',
    liveLink: '',
  });
  const [loading, setLoading] = useState(true); // State to track loading status
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    // Fetch project data using GET request when the component mounts or the params change
    const fetchProject = async () => {
      try {
        // Check if id and projectId exist to avoid triggering an empty fetch request
        if (id && projectId) {
          const response = await fetch(`/api/candidate/${id}/projects/${projectId}`); // GET request
          const data = await response.json();

          if (response.ok) {
            setProject(data); // Store fetched project data
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
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    fetchProject(); // Call the fetch function on component mount or when params change
  }, [id, projectId]); // Re-run effect when the ID or project ID changes

  // Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the project using PUT request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading when submitting

    try {
      const response = await fetch(`/api/candidate/${id}/projects/${projectId}`, {
        method: 'PUT', // PUT request to update the project
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send updated form data as JSON
      });

      if (response.ok) {
        router.push(`/candidate-details/${id}`); // Redirect to candidate details page after successful update
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setLoading(false); // Stop loading after submission attempt
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
        // Show a loading spinner while fetching or submitting
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading project details...</p>
        </div>
      ) : (
        // Display the form with project data if loading is done
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
            Update Project (PUT)
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProjectPage;
