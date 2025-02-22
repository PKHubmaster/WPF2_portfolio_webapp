"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

// Define types for employer and candidate
interface Employer {
  _id: string;
  employerName: string;
  employerEmail: string;
}

interface Candidate {
  _id: string;
  employeeFirstName: string;
  employeeLastName: string;
}

const RequestProfile = () => {
  const [formData, setFormData] = useState({
    employerId: "",
    employerEmail: "",
    selectedCandidate: "",
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Fetch candidates and employers on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/requestprofileaccess');
      const data = await response.json();

      setCandidates(data.candidates);
      setEmployers(data.employers); // Remove filtering condition
    };

    fetchData();
  }, []);

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-populate email when employer is selected
    if (name === "employerId") {
      const selectedEmployer = employers.find(emp => emp._id === value);
      setFormData({
        ...formData,
        employerId: value,
        employerEmail: selectedEmployer ? selectedEmployer.employerEmail : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);

    const requestData = {
      systemUser: formData.employerId, 
      profile: formData.selectedCandidate, 
      requestDate: new Date().toISOString(),
      accessStatus: "Approved",
    };

    await fetch('/api/requestprofileaccess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative bg-cover" 
      style={{ backgroundImage: "url('/sign_in&sign_up_bg.jpg')" }}>

      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="card p-4 shadow rounded-4 position-relative glassmorphism text-dark"
        style={{ width: "750px", height: "450px", zIndex: 10 }}>

        <h2 className="text-center mb-4">Request access to a profile</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Candidate Selection */}
          <div className="mb-3">
            <label className="form-label">Select Candidate:</label>
            <select className="form-select" name="selectedCandidate" value={formData.selectedCandidate} onChange={handleChange}>
              <option value="" disabled>Select a candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.employeeFirstName} {candidate.employeeLastName}
                </option>
              ))}
            </select>
          </div>

          {/* Employer Selection */}
          <div className="mb-3">
            <label className="form-label">Your Name (Employer):</label>
            <select className="form-select" name="employerId" value={formData.employerId} onChange={handleChange}>
              <option value="" disabled>Select an employer</option>
              {employers.map((employer) => (
                <option key={employer._id} value={employer._id}>
                  {employer.employerName}
                </option>
              ))}
            </select>
          </div>

          {/* Employer Email - Auto-populated */}
          <div className="mb-3">
            <label className="form-label">Your Registered Email:</label>
            <input 
              type="email" 
              className="form-control" 
              name="employerEmail" 
              value={formData.employerEmail} 
              readOnly 
            />
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
                <p><b>Employer Name:</b> {employers.find(emp => emp._id === formData.employerId)?.employerName}</p>
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
