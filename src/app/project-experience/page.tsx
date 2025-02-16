'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemUserId, setSystemUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve systemUserId from localStorage
    const userId = localStorage.getItem('systemUserId');
    if (userId) {
      setSystemUserId(userId);
    } else {
      router.push('/landing_page'); // Redirect to login if no user is logged in
    }
  }, [router]);

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

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Welcome to the Dashboard</h1>

      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button>

      {loading ? (
        <p>Loading candidate profiles...</p>
      ) : (
        <div>
          <h2 className="mb-3">Candidate Profiles</h2>
          <table className="table table-striped table-hover">
            <thead>
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
                        className="btn btn-info"
                        onClick={() => router.push(`/candidate-details/${profile._id}`)}
                      >
                        View Candidate Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No profiles available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
