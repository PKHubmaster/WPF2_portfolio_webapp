'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const SkillsEducationPage = () => {
  const router = useRouter();

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center position-relative bg-cover"
      style={{ backgroundImage: "url('/skills_education_bg.jpg')" }}>

      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="container shadow rounded-4 p-5 glassmorphism text-dark" 
        style={{ zIndex: 10 }}>

        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} 
          className="text-center">IT Skills and Education</motion.h1>

        <motion.table className="table table-striped mt-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <thead>
            <tr><th>Course Name</th><th>Description</th><th>Date Completed</th></tr>
          </thead>
          <tbody>
            <tr><td>React Development</td><td>Learned to build React apps</td><td>March 2023</td></tr>
            <tr><td>Web Design</td><td>Learned HTML, CSS, JavaScript</td><td>December 2022</td></tr>
          </tbody>
        </motion.table>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mt-4">
          <button className="btn btn-primary w-100" onClick={() => router.push('/home')}>Back to Home</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mt-4">
          <a href="https://www.linkedin.com/in/sample-profile" target="_blank" rel="noopener noreferrer" className="btn btn-link text-dark w-100">
            LinkedIn Profile
          </a>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .bg-cover { background-size: cover; background-position: center; }
        .glassmorphism { backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0, 0, 0, 0.3); }
      `}</style>
    </div>
  );
};

export default SkillsEducationPage;
