'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div
      style={{
        backgroundImage: "url('/sign_in&sign_up_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Dark overlay for better readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`row g-0 shadow rounded-4 overflow-hidden position-relative ${isSignup ? 'flex-row-reverse' : ''}`}
        style={{
          width: '750px',
          height: '450px',
          backdropFilter: "blur(12px)",  // Glassmorphism effect
          background: "rgba(255, 255, 255, 0.2)", // Semi-transparent
          border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
          zIndex: 10, // Ensure it's above overlay
        }}
      >
        {/* Left Form Section */}
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center text-white">
          <motion.h2
            key={isSignup ? 'signup' : 'signin'}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-3"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </motion.h2>

          <motion.div
            key={isSignup ? 'signupForm' : 'signinForm'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSignup ? (
              <form>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary w-50 mt-2">Sign Up</button>
                </div>
              </form>
            ) : (
              <form>
                <div className="mb-2">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary w-50 mt-2">Sign In</button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Social Media Icons */}
          <div className="text-center mt-3">
            <p className="text-muted small">or sign in with:</p>
            <div className="d-flex justify-content-center gap-2">
              <img src="/facebook.png" alt="Facebook" width="25" height="25" />
              <img src="/twitter.png" alt="Twitter" width="25" height="25" />
              <img src="/linkedin.png" alt="LinkedIn" width="25" height="25" />
              <img src="/instagram.png" alt="Instagram" width="25" height="25" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <motion.div
          className="col-md-6 text-white text-center d-flex flex-column justify-content-center"
          initial={{ opacity: 0, x: isSignup ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
            backdropFilter: "blur(15px)", // More blur for stronger effect
          }}
        >
          <motion.h1
            key={isSignup ? 'switchTextSignup' : 'switchTextSignin'}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            {isSignup ? 'One of us?' : 'New here?'}
          </motion.h1>
          <p className="small">{isSignup ? 'Just sign in' : 'Sign up and discover'}</p>
          <button className="btn btn-outline-light w-50 mx-auto" onClick={toggleForm}>
            {isSignup ? 'Sign In' : 'Sign Up'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;