'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '@/src/app/candidate-details/[id]/candidate-details.css'; // Adjust path if needed

interface CandidateProfile {
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  phoneNumber: string;
  address: string;
  linkedInUrl?: string;
  projects: { _id: string; name: string; description: string; githubLink: string; liveLink: string }[];
  skills: { name: string }[];
}

const CandidateDetails = () => {
  const { id } = useParams<{ id: string }>(); // Ensure `id` is typed correctly
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/candidate/${id}`);
        if (!response.ok) throw new Error('Profile not found');

        const data: CandidateProfile = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleDelete = async (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/candidate/${id}/projects/${projectId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete project');

      // Refresh the page after deletion
      router.refresh();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="pageWrapper">
      {/* Header Section */}
      <div className="headerSection">
        <h1 className="heading">Candidate Details</h1>
        <div className="buttonContainer">
          <button className="add_project" onClick={() => router.push(`/candidate-details/${id}/add`)}>
            Add Project
          </button>
          <button className="back_to_home" onClick={() => router.push('/home')}>
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loadingContainer">
          <div className="loadingSpinner"></div>
          <p className="loadingText">Loading candidate details...</p>
        </div>
      ) : profile ? (
        <>
          {/* Candidate Profile Card */}
          <div className="profileCard">
            <h3 className="profileHeading">
              {profile.employeeFirstName} {profile.employeeLastName}
            </h3>
            <div className="profileDetails">
              <p><strong>Email:</strong> {profile.employeeEmail}</p>
              <p><strong>Phone:</strong> {profile.phoneNumber}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              {profile.linkedInUrl && (
                <p>
                  <strong>LinkedIn:</strong>{' '}
                  <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="viewDetailsButton">
                    View Profile
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <h4 className="sectionTitle">Projects</h4>
          <div className="tableContainer">
            <table className="customTable">
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
                {profile.projects.length > 0 ? (
                  profile.projects.map((project) => (
                    <tr key={project._id}>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="viewDetailsButton">
                          GitHub
                        </a>
                      </td>
                      <td>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="viewDetailsButton">
                          Live Link
                        </a>
                      </td>
                      <td>
                        <button className="editButton" onClick={() => router.push(`/candidate-details/${id}/edit/${project._id}`)}>
                          Edit
                        </button>
                        <button className="deleteButton" onClick={() => handleDelete(project._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="noProfiles">No projects available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Skills Section */}
          <h4 className="sectionTitle">Skills</h4>
          <ul className="skillsList">
            {profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => (
                <li key={index} className="skillItem">{skill.name}</li>
              ))
            ) : (
              <li className="skillItem">No skills listed</li>
            )}
          </ul>
        </>
      ) : (
        <p className="noProfiles">No candidate details available.</p>
      )}
    </div>
  );
};

export default CandidateDetails;
