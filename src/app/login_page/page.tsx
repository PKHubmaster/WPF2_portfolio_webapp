'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [systemUserName, setSystemUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center position-relative bg-dark">
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <div className="row g-0 shadow rounded-4 overflow-hidden position-relative" style={{ width: '400px', height: '380px', zIndex: 10, backgroundColor: 'white' }}>
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
          </div>

          <div className="text-center mt-3">
            <p>
              Don't have an account? <a href="/signup_page" className="text-primary">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
