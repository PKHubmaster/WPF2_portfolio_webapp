'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemUserId, setSystemUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<number | null>(null);
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

    const fetchUserType = async () => {
      try {
        const response = await fetch(`/api/user/${systemUserId}`);
        const data = await response.json();

        console.log('User API response:', data);

        if (response.ok) {
          setUserType(data.usertype);
        } else {
          console.error('Error fetching user type:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch user type:', error);
      }
    };

    fetchUserType();
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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome to the Dashboard</h1>
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
          <h2 className="mb-4">Candidate Profiles</h2>
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length > 0 ? (
                profiles.map((profile: any) => (
                  <tr key={profile._id}>
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
                <tr>
                  <td colSpan={3} className="text-center">No profiles available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Conditionally render the button based on userType */}
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
