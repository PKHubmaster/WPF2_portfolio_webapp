'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import './home.css'; // Import the custom CSS file

const LoginForm = () => {
  const [systemUserName, setSystemUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [newUser, setNewUser] = useState({
    systemUserName: '',
    employerName: '',
    employerEmail: '',
    password: '',
  });
  const router = useRouter();

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

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

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
          usertype: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('New user signed up successfully, you may login with your credentials');
        setShowSignUp(false);
      } else {
        setError(data.error || 'Sign up failed');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: 'url(/landing2.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="text-center text-light"
        style={{
          maxWidth: '320px', // 20% shorter than 400px
          position: 'absolute',
          top: '50%', // 50% up
          transform: 'translateY(-50%)', // Centers the content vertically
        }}
      >
        <h2 className="mb-4 font-weight-bold" style={{ fontSize: '1.5rem' }}>
          Sign-in to BiteJob
        </h2>
        {error && <p className="text-danger">{error}</p>}

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={systemUserName}
            onChange={(e) => setSystemUserName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary w-100" onClick={handleLogin}>
          Sign In
        </button>

        <p className="text-center mt-3" style={{ color: 'white' }}>
          Not an existing user?{' '}
          <span
            className="text-primary"
            role="button"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowSignUp(true)}
          >
            Register
          </span>
        </p>

        <p
          className="text-center mt-4"
          style={{ fontSize: '0.6rem', color: 'black' }}
        >
          &copy; Code Crafter Web Services - HR Talent Acquisition Systems
        </p>
        <p
          className="text-center mt-1"
          style={{ fontSize: '0.9rem', color: 'cyan', fontStyle: 'bold' }}
        >
          let BiteJob take a bite out of the job market for you
        </p>
      </div>

      {showSignUp && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content text-dark">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up for BiteJob</h5>
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