'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [systemUserName, setSystemUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);  // State to control modal visibility
  const [newUser, setNewUser] = useState({
    systemUserName: '',
    employerName: '',
    employerEmail: '',
    password: '',
  });
  const router = useRouter();

  // Handle Login
  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemUserName, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('systemUserId', data.systemUserId);
        router.push('/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  // Handle Sign-Up form data change
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Sign-Up submission
  const handleSignUp = async () => {
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemUserName: newUser.systemUserName,
          employerName: newUser.employerName,
          employerEmail: newUser.employerEmail,
          password: newUser.password,
          usertype: 1, // Assigned as employer (1)
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('New user signed up successfully, you may login with your credentials');
        setShowSignUp(false);  // Close the modal
      } else {
        setError(data.error || 'Sign up failed');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center position-relative bg-dark">
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <div className="row g-0 shadow rounded-4 overflow-hidden position-relative" style={{ width: '400px', height: '450px', zIndex: 10, backgroundColor: 'white' }}>
        <div className="col-md-12 p-4 d-flex flex-column justify-content-center text-dark">
          <h2 className="text-center mb-3">Sign In</h2>
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="mb-2">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={systemUserName} onChange={(e) => setSystemUserName(e.target.value)} />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="text-center">
            <button type="button" className="btn btn-primary w-50 mt-2" onClick={handleLogin}>
              Sign In
            </button>
            <button type="button" className="btn btn-secondary w-50 mt-2" onClick={() => setShowSignUp(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Sign Up */}
      {showSignUp && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button type="button" className="btn-close" onClick={() => setShowSignUp(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="systemUserName"
                    value={newUser.systemUserName}
                    onChange={handleSignUpChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Employer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="employerName"
                    value={newUser.employerName}
                    onChange={handleSignUpChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Employer Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="employerEmail"
                    value={newUser.employerEmail}
                    onChange={handleSignUpChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={newUser.password}
                    onChange={handleSignUpChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSignUp(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
