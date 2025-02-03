"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

const RequestProfile = () => {
  const [formData, setFormData] = useState({
    employerName: "",
    employerEmail: "",
    selectedCandidate: "Apurva",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleBack = () => {
    router.push("/home"); // Navigate back to home page
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow rounded-4 overflow-hidden position-relative"
        style={{
          width: "750px",
          height: "450px",
          backdropFilter: "blur(12px)", // Glassmorphism effect
          background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
          border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
          zIndex: 10, // Ensure it's above overlay
        }}
      >
        <h2 className="text-center mb-4 text-white">Request access to a profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Select Candidate:</label>
            <select
              className="form-select bg-light text-dark border"
              name="selectedCandidate"
              value={formData.selectedCandidate}
              onChange={handleChange}
              style={{
                backgroundColor: '#f8f9fa', // Light grey background
                color: '#212529', // Dark text
                border: '1px solid #ced4da', // Border color
              }}
            >
              <option>Apurva</option>
              <option>Parm</option>
              <option>Christian</option>
              <option>Sue</option>
              <option>John</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Your Name (Employer):</label>
            <input
              type="text"
              className="form-control bg-transparent text-white border"
              name="employerName"
              value={formData.employerName}
              onChange={handleChange}
              style={{
                border: '1px solid #ced4da', // Border color
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Your Email:</label>
            <input
              type="email"
              className="form-control bg-transparent text-white border"
              name="employerEmail"
              value={formData.employerEmail}
              onChange={handleChange}
              style={{
                border: '1px solid #ced4da', // Border color
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>

        {/* Back to Home button */}
        <button className="btn btn-secondary w-100 mt-3" onClick={handleBack}>
          Back to Home
        </button>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal show" style={{ display: "block", zIndex: 1050 }} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Request Summary</h5>
                <button type="button" className="close" onClick={() => setModalOpen(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <b>Candidate:</b> {formData.selectedCandidate}
                </p>
                <p>
                  <b>Employer Name:</b> {formData.employerName}
                </p>
                <p>
                  <b>Employer Email:</b> {formData.employerEmail}
                </p>
                <p>
                  <i>Request has been sent to portfolio_manager@hotmail.com</i>
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestProfile;
