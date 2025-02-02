'use client'; // Make this component client-side

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { motion } from 'framer-motion'; // Import framer-motion for animations
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path); // Navigate to the specified route
  };

  return (
    <div
      style={{
        backgroundImage: "url('/home_bg.jpg')", // Use a background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
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
        className="text-center text-white shadow rounded-4 p-4"
        style={{
          zIndex: 10,
          backdropFilter: "blur(12px)",  // Glassmorphism effect
          background: "rgba(255, 255, 255, 0.3)", // Semi-transparent background
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to the Home Page
        </motion.h1>

        <motion.div
          className="d-flex justify-content-center gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="btn btn-primary w-50"
            onClick={() => handleNavigate('/project-experience')}
          >
            Project Experience
          </button>
          <button
            className="btn btn-primary w-50"
            onClick={() => handleNavigate('/skills-education')}
          >
            IT Skills/Education
          </button>
          <button
            className="btn btn-primary w-50"
            onClick={() => handleNavigate('/linkedin-profile')}
          >
            LinkedIn Profile
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
