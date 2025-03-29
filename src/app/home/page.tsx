'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemUserId, setSystemUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<number | null>(null);
  const [systemUserName, setSystemUserName] = useState<string | null>(null); // New state for systemUserName
  const [sortField, setSortField] = useState<string>('employeeFirstName'); // Default sort field
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default sort order (ascending)
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('systemUserId');
    if (userId) {
      setSystemUserId(userId);
    } else {
      router.push('/landing_page');
    }
  }, [router]);

  useEffect(() => {
    if (!systemUserId) return;

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/user/${systemUserId}`);
        const data = await response.json();

        console.log('User API response:', data);

        if (response.ok) {
          setUserType(data.usertype);
          setSystemUserName(data.systemUserName); // Set the systemUserName here
        } else {
          console.error('Error fetching user type:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, [systemUserId]);

  useEffect(() => {
    if (!systemUserId) return;

    const fetchProfiles = async () => {
      try {
        const response = await fetch(`/api/profiles/${systemUserId}`);
        const data = await response.json();

        if (response.ok) {
          setProfiles(data);
        } else {
          setProfiles([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [systemUserId]);

  const handleLogout = () => {
    localStorage.removeItem('systemUserId');
    router.push('/landing_page');
  };

  const handleButtonClick = () => {
    if (userType === 0) {
      router.push('/send-invite');
    } else {
      router.push('/request-profile');
    }
  };

  const handleReviewPendingApprovals = () => {
    // Logic for reviewing pending approvals
    router.push('/approvals');
  };

  const handleAddNewProfile = () => {
    // Navigate to the new profile page
    router.push('/new-profile');
  };

  const handleSort = (field: string) => {
    // Toggle sort order if the same field is clicked
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const sortedProfiles = [...profiles].sort((a, b) => {
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome to the dashboard, {systemUserName}</h1> {/* Display systemUserName here */}
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading candidate profiles...</p>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Candidate Profiles</h2>
            {userType === 0 && (
              <div className="d-flex">
                {/* Add New Profile button */}
                <button className="btn btn-success mt-2 me-2" onClick={handleAddNewProfile}>
                  Add New Profile
                </button>

                {/* Review Pending Approvals button */}
                <button className="btn btn-warning mt-2" onClick={handleReviewPendingApprovals}>
                  Review Pending Approvals
                </button>
              </div>
            )}
          </div>

          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th onClick={() => handleSort('employeeFirstName')}>
                  First Name
                  {sortField === 'employeeFirstName' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </th>
                <th onClick={() => handleSort('employeeLastName')}>
                  Last Name
                  {sortField === 'employeeLastName' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProfiles.length > 0 ? (
                sortedProfiles.map((profile: any) => (
                  <tr key={profile._id}>
                    <td>{profile.employeeFirstName}</td>
                    <td>{profile.employeeLastName}</td>
                    <td>
                      {userType === 0 && (
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => router.push(`/candidate-details/${profile._id}`)}
                        >
                          View Candidate Details
                        </button>
                      )}

                      {userType === 1 && profile.accessStatus === 'Pending' && (
                        <button className="btn btn-secondary btn-sm" disabled>
                          Pending Admin Approval
                        </button>
                      )}

                      {userType === 1 && profile.accessStatus !== 'Pending' && profile.accessStatus !== 'Rejected' && (
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => router.push(`/candidate-details/${profile._id}`)}
                        >
                          View Candidate Details
                        </button>
                      )}

                      {/* Show a red "Rejected" button if accessStatus is 'Rejected' */}
                      {profile.accessStatus === 'Rejected' && (
                        <button className="btn btn-danger btn-sm" disabled>
                          Rejected
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">No profiles available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Conditionally render buttons based on userType */}
          <div className="text-center mt-4">
            {userType === 0 && (
              <button className="btn btn-success" onClick={handleButtonClick}>
                Send Invite to Employer
              </button>
            )}
            {userType === 1 && (
              <button className="btn btn-primary" onClick={handleButtonClick}>
                Request to View Candidate Profile
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
