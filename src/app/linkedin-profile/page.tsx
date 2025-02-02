'use client'; // Make this component client-side

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const LinkedInProfilePage = () => {
  const linkedInUrl = 'https://www.linkedin.com/in/your-profile'; // Replace with actual LinkedIn URL

  return (
    <div
      style={{
        backgroundImage: "url('/linkedin_bg.jpg')", // Use a background image
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
          LinkedIn Profile
        </motion.h1>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-50"
            style={{ padding: '10px 30px' }}
          >
            View LinkedIn Profile
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LinkedInProfilePage;
