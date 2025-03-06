'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditSkillPage = () => {
  const { id, skillId } = useParams(); // Get the candidate ID and skill ID from the URL
  const [skill, setSkill] = useState<string>(''); // Store the fetched skill name
  const [loading, setLoading] = useState(true); // State to track loading status
  const router = useRouter(); // Next.js router for navigation

  // Fetch skill data when the component mounts or the params change
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        if (id && skillId) {
          const response = await fetch(`/api/candidate/${id}/skills/${skillId}`);
          const data = await response.json();

          if (response.ok) {
            setSkill(data.name); // Only set the name from the response
          } else {
            console.error('Skill not found');
          }
        }
      } catch (error) {
        console.error('Failed to fetch skill:', error);
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    fetchSkill(); // Call the fetch function on component mount or when params change
  }, [id, skillId]);

  // Handle input change for skill name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  // Handle form submission to update the skill
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading when submitting

    try {
      const response = await fetch(`/api/candidate/${id}/skills/${skillId}`, {
        method: 'PUT', // PUT request to update the skill
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: skill }), // Only send the updated name
      });

      if (response.ok) {
        router.push(`/candidate-details/${id}`); // Redirect to candidate details page after successful update
      } else {
        console.error('Failed to update skill');
      }
    } catch (error) {
      console.error('Error updating skill:', error);
    } finally {
      setLoading(false); // Stop loading after submission attempt
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Edit Skill</h1>
        <button className="btn btn-secondary" onClick={() => router.push(`/candidate-details/${id}`)}>
          Back to Candidate Details
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading skill details...</p>
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
              value={skill}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Skill
          </button>
        </form>
      )}
    </div>
  );
};

export default EditSkillPage;
