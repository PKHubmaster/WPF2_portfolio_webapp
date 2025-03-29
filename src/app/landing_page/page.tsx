'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import './home.css'; // Import the custom CSS file
import { motion, AnimatePresence } from 'framer-motion';

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
  const [modalVisible, setModalVisible] = useState(false);
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
        setModalVisible(true);
        setTimeout(() => setModalVisible(false), 2000); // Fade out after 2 seconds
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
          maxWidth: '320px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
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
      </div>

      {showSignUp && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content text-dark">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up for BiteJob</h5>
                <button type="button" className="btn-close" onClick={() => setShowSignUp(false)} />
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" name="systemUserName" placeholder="Username" value={newUser.systemUserName} onChange={handleSignUpChange} />
                <input type="text" className="form-control mb-2" name="employerName" placeholder="Employer Name" value={newUser.employerName} onChange={handleSignUpChange} />
                <input type="email" className="form-control mb-2" name="employerEmail" placeholder="Employer Email" value={newUser.employerEmail} onChange={handleSignUpChange} />
                <input type="password" className="form-control mb-2" name="password" placeholder="Password" value={newUser.password} onChange={handleSignUpChange} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSignUp(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {modalVisible && (
          <motion.div 
            className="modal show d-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content text-dark">
                <div className="modal-body text-center">
                  <p className="text-success">New user signed up successfully! You may log in.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;
