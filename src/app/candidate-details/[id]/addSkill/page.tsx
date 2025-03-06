'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const AddSkillPage = () => {
  const { id } = useParams(); // Get the candidate ID from the URL
  const [formData, setFormData] = useState({
    name: '', // Only 'name' is required for the skill
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // POST to the correct route for adding a skill to the profile
      const response = await fetch(`/api/candidate/${id}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/candidate-details/${id}`); // Redirect back to candidate details page after successful add
      } else {
        console.error('Failed to add skill');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Add New Skill</h1>
        <button className="btn btn-secondary" onClick={() => router.push(`/candidate-details/${id}`)}>
          Back to Candidate Details
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Adding new skill...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Skill Name</label>
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddSkillPage;
