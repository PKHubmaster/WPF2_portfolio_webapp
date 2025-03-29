'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'; // Import your home.css styles

const Home = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemUserId, setSystemUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<number | null>(null);
  const [systemUserName, setSystemUserName] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('employeeFirstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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

        if (response.ok) {
          setUserType(data.usertype);
          setSystemUserName(data.systemUserName);
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
    router.push('/approvals');
  };

  const handleAddNewProfile = () => {
    router.push('/new-profile');
  };

  const handleSort = (field: string) => {
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
    <div
      className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: '#e3f2fd', // Light blue background
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div className="container mt-5 p-4 bg-white rounded shadow" style={{ maxWidth: '900px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="font-bold">
            Welcome to the candidate profile dashboard, {systemUserName}
          </h2>
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
              <div className="d-flex">
                {userType === 0 && (
                  <>
                    <button className="btn btn-success mt-2 me-2" onClick={handleAddNewProfile}>
                      Add New Profile
                    </button>

                    <button className="btn btn-warning mt-2 me-2" onClick={handleReviewPendingApprovals}>
                      Review Pending Approvals
                    </button>

                    <button className="btn btn-success mt-2 me-2" onClick={handleButtonClick}>
                      Send Invite to Employer
                    </button>
                  </>
                )}

                {userType === 1 && (
                  <button className="btn btn-primary mt-2" onClick={handleButtonClick}>
                    Request to View Candidate Profile
                  </button>
                )}
              </div>
            </div>

            <table id="candidateTable" className="table table-bordered table-hover shadow-sm">
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
              <tbody
                style={{
                  display: 'block',
                  maxHeight: '600px', // Limits to 10 rows approx.
                  overflowY: 'auto',
                  width: '100%',
                }}
              >
                {sortedProfiles.length > 0 ? (
                  sortedProfiles.slice(0, 15).map((profile: any) => (
                    <tr key={profile._id} style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                      <td>{profile.employeeFirstName}</td>
                      <td>{profile.employeeLastName}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => router.push(`/candidate-details/${profile._id}`)}
                        >
                          View Candidate Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                    <td colSpan={3} className="text-center">No profiles available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
