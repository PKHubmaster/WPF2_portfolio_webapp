'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const Approvals = () => {
  const [pendingProfiles, setPendingProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPendingProfiles = async () => {
      try {
        const response = await fetch(`/api/approvals`);
        const data = await response.json();

        if (response.ok) {
          setPendingProfiles(data);
        } else {
          setPendingProfiles([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch pending profiles:', error);
        setLoading(false);
      }
    };

    fetchPendingProfiles();
  }, []);

  const handleApproval = async (profileId: string) => {
    try {
      const response = await fetch(`/api/approvals/${profileId}`, {
        method: 'PUT',
        body: JSON.stringify({ accessStatus: 'Approved' }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setPendingProfiles(pendingProfiles.filter(profile => profile._id !== profileId));
      }
    } catch (error) {
      console.error('Error approving profile:', error);
    }
  };

  const handleRejection = async (profileId: string) => {
    try {
      const response = await fetch(`/api/approvals/${profileId}`, {
        method: 'PUT',
        body: JSON.stringify({ accessStatus: 'Rejected' }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setPendingProfiles(pendingProfiles.filter(profile => profile._id !== profileId));
      }
    } catch (error) {
      console.error('Error rejecting profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Pending Profile Approvals</h1>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading pending profiles...</p>
        </div>
      ) : (
        <div>
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingProfiles.length > 0 ? (
                pendingProfiles.map((profile: any) => (
                  <tr key={profile._id}>
                    <td>{profile.employeeFirstName}</td>
                    <td>{profile.employeeLastName}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleApproval(profile._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleRejection(profile._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">No pending approvals</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Approvals;
