'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const SendInvite = () => {
  const [formData, setFormData] = useState({ employerName: '', employerEmail: '' });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center position-relative bg-cover" 
      style={{ backgroundImage: "url('/sign_in&sign_up_bg.jpg')" }}>
      
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="card p-4 shadow rounded-4 position-relative glassmorphism text-dark"
        style={{ width: "750px", height: "450px", zIndex: 10 }}>
        
        <h2 className="text-center mb-4">Send an invite to a potential employer</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employer Name:</label>
            <input type="text" className="form-control" name="employerName" value={formData.employerName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Employer Email:</label>
            <input type="email" className="form-control" name="employerEmail" value={formData.employerEmail} onChange={handleChange} />
          </div>
          <p><b>Candidate:</b> John Doe</p>
          <p><i>Check your email for a temporary password.</i></p>
          <button type="submit" className="btn btn-primary w-100">Send Invite</button>
        </form>

        <button className="btn btn-secondary w-100 mt-3" onClick={() => router.push('/home')}>Back to Home</button>
      </motion.div>

      {showModal && (
        <div className="modal show d-block" style={{ zIndex: 1050 }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content text-dark">
              <div className="modal-header">
                <h5 className="modal-title">Invite Summary</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><b>Employer Name:</b> {formData.employerName}</p>
                <p><b>Employer Email:</b> {formData.employerEmail}</p>
                <p><b>Candidate:</b> John Doe</p>
                <p><i>Check your email for a temporary password.</i></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-cover { background-size: cover; background-position: center; }
        .glassmorphism { backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0, 0, 0, 0.3); }
      `}</style>
    </div>
  );
};

export default SendInvite;
