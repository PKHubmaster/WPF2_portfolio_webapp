'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const CandidateDetails = () => {
  const { id } = useParams(); // Get the candidate ID from the URL
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/candidate/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        } else {
          console.error('Profile not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await fetch(`/api/candidate/${id}/projects/${projectId}`, {
        method: 'DELETE',
      });
      router.refresh(); // Refresh the page to show updated data
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Candidate Details</h1>
        <button className="btn btn-success" onClick={() => router.push(`/candidate-details/${id}/add`)}>
          Add Project
        </button>
        <button className="btn btn-primary" onClick={() => router.push('/home')}>
          Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading candidate details...</p>
        </div>
      ) : (
        profile ? (
          <div className="card shadow-lg p-4 mb-4">
            <h3 className="card-title">{profile.employeeFirstName} {profile.employeeLastName}</h3>
            <p className="card-text"><strong>Email:</strong> {profile.employeeEmail}</p>
            <p className="card-text"><strong>Phone:</strong> {profile.phoneNumber}</p>
            <p className="card-text"><strong>Address:</strong> {profile.address}</p>
            <p className="card-text">
              <strong>LinkedIn:</strong>{' '}
              <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
                View Profile
              </a>
            </p>

            <h4 className="mt-4 mb-2">Projects</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>GitHub</th>
                  <th>Live Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(profile.projects) && profile.projects.length > 0 ? (
                  profile.projects.map((project: any) => (
                    <tr key={project._id}>
                      <td>{String(project.name)}</td>
                      <td>{String(project.description)}</td>
                      <td>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                          GitHub
                        </a>
                      </td>
                      <td>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                          Live Link
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => router.push(`/candidate-details/${id}/edit/${project._id}`)}
                        >
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(project._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">No projects available</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h4 className="mt-4">Skills</h4>
            <ul className="list-group">
              {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                profile.skills.map((skill: any, index: number) => (
                  <li key={index} className="list-group-item">{skill.name}</li>
                ))
              ) : (
                <li className="list-group-item">No skills listed</li>
              )}
            </ul>
          </div>
        ) : (
          <p>No candidate details available.</p>
        )
      )}
    </div>
  );
};

export default CandidateDetails;
