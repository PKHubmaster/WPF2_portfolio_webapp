'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './home.module.css';

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
      router.push('/login_page');
    }
  }, [router]);

  useEffect(() => {
    if (!systemUserId) return;

    const fetchUserType = async () => {
      try {
        const response = await fetch(`/api/user/${systemUserId}`);
        const data = await response.json();

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
    router.push('/login_page');
  };

  const handleButtonClick = () => {
    if (userType === 0) {
      router.push('/send-invite');
    } else {
      router.push('/request-profile');
    }
  };

  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className={styles.heading}>Dashboard</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading candidate profiles...</p>
        </div>
      ) : (
        <div>
          <h2 className="mb-4 text-center text-success">Candidate Profiles</h2>

          <div className={styles.tableContainer}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Action</th>
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
                          className={styles.viewDetailsButton}
                          onClick={() => router.push(`/candidate-details/${profile._id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className={styles.noProfiles}>No profiles available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            {userType === 0 && (
              <button className={`${styles.conditionalButton} ${styles.sendInviteButton}`} onClick={handleButtonClick}>
                Send Invite to Employer
              </button>
            )}
            {userType === 1 && (
              <button className={`${styles.conditionalButton} ${styles.requestProfileButton}`} onClick={handleButtonClick}>
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
