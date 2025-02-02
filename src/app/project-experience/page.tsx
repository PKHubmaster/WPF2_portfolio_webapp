'use client'; // Make this component client-side

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const ProjectExperiencePage = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/project_experience_bg.jpg')", // Use a background image
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
        className="container text-white shadow rounded-4 p-5"
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
          className="text-center"
        >
          Project Experience
        </motion.h1>

        <motion.table
          className="table table-striped mt-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Date Completed</th>
              <th>GitHub Link</th>
              <th>Live Web Link</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Project 1</td>
              <td>Description of project 1</td>
              <td>January 2023</td>
              <td><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></td>
              <td><a href="https://example.com" target="_blank" rel="noopener noreferrer">Live Link</a></td>
            </tr>
            <tr>
              <td>Project 2</td>
              <td>Description of project 2</td>
              <td>February 2023</td>
              <td><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></td>
              <td><a href="https://example.com" target="_blank" rel="noopener noreferrer">Live Link</a></td>
            </tr>
          </tbody>
        </motion.table>
      </motion.div>
    </div>
  );
};

export default ProjectExperiencePage;
