"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative bg-cover" 
      style={{ backgroundImage: "url('/sign_in&sign_up_bg.jpg')" }}>
      
      {/* Dark Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      {/* Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="card p-4 shadow rounded-4 position-relative glassmorphism text-dark"
        style={{ width: "750px", height: "450px", zIndex: 10 }}>
        
        <h2 className="text-center mb-4">Request access to a profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Candidate:</label>
            <select className="form-select" name="selectedCandidate" value={formData.selectedCandidate} onChange={handleChange}>
              {["Apurva", "Parm", "Christian", "Sue", "John"].map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Your Name (Employer):</label>
            <input type="text" className="form-control" name="employerName" value={formData.employerName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Email:</label>
            <input type="email" className="form-control" name="employerEmail" value={formData.employerEmail} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        <button className="btn btn-secondary w-100 mt-3" onClick={() => router.push("/home")}>Back to Home</button>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal show d-block" style={{ zIndex: 1050 }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content text-dark">
              <div className="modal-header">
                <h5 className="modal-title">Request Summary</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <p><b>Candidate:</b> {formData.selectedCandidate}</p>
                <p><b>Employer Name:</b> {formData.employerName}</p>
                <p><b>Employer Email:</b> {formData.employerEmail}</p>
                <p><i>Request has been sent to portfolio_manager@hotmail.com</i></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .bg-cover {
          background-size: cover;
          background-position: center;
        }
        .glassmorphism {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.3);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default RequestProfile;
