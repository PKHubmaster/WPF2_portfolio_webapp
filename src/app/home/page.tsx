"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div
      style={{
        backgroundImage: "url('/home_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white shadow rounded-4 p-4"
        style={{
          zIndex: 10,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.3)",
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
          className="d-flex flex-wrap justify-content-center gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="btn btn-primary w-50" onClick={() => handleNavigate("/project-experience")}>
            Project Experience
          </button>
          <button className="btn btn-primary w-50" onClick={() => handleNavigate("/skills-education")}>
            IT Skills/Education
          </button>
          <button className="btn btn-success w-50" onClick={() => handleNavigate("/request-profile")}>
            Request Candidate Profile
          </button>
          <button className="btn btn-info w-50" onClick={() => handleNavigate("/send-invite")}>
            Send Invite to Employer
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
