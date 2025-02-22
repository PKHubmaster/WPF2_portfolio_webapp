'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpForm = () => {
  const [systemUserName, setSystemUserName] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [employerEmail, setEmployerEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState(1); // Assuming 1 is a default value for user type
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemUserName, employerName, employerEmail, password, usertype }),
      });

      const data = await res.json();

      if (res.ok) {
        // After successful signup, redirect to login page
        router.push('/login_page');
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

      <div className="row g-0 shadow rounded-4 overflow-hidden position-relative" style={{ width: '400px', height: '550px', zIndex: 10, backgroundColor: 'white' }}>
        <div className="col-md-12 p-4 d-flex flex-column justify-content-center text-dark">
          <h2 className="text-center mb-3">Sign Up</h2>

          {error && <p className="text-danger text-center">{error}</p>}

          <div className="mb-2">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={systemUserName} onChange={(e) => setSystemUserName(e.target.value)} />
          </div>

          <div className="mb-2">
            <label className="form-label">Employer Name</label>
            <input type="text" className="form-control" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
          </div>

          <div className="mb-2">
            <label className="form-label">Employer Email</label>
            <input type="email" className="form-control" value={employerEmail} onChange={(e) => setEmployerEmail(e.target.value)} />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="text-center">
            <button type="button" className="btn btn-primary w-50 mt-2" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>

          <div className="mt-3 text-center">
            <span>Already have an account? </span>
            <a href="/login_page" className="text-primary">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
