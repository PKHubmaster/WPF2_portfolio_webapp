"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const LinkedInProfilePage = () => {
  return (
    <div
      style={{
        background: "url('/linkedin_bg.jpg') center/cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white p-4 rounded shadow"
        style={{ zIndex: 10, backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.2)" }}
      >
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          LinkedIn Profile
        </motion.h1>

        <motion.a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-50 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          View Profile
        </motion.a>
      </motion.div>
    </div>
  );
};

export default LinkedInProfilePage;
