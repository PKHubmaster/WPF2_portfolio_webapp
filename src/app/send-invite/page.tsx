'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const SendInvite = () => {
  const [formData, setFormData] = useState({
    employerName: '',
    employerEmail: '',
  });
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility
  const [submittedData, setSubmittedData] = useState<any>(null); // To hold submitted form data
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData); // Set submitted data for modal
    setShowModal(true); // Show modal after form is submitted
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setFormData({ employerName: '', employerEmail: '' }); // Clear the form
  };

  const handleBack = () => {
    router.push('/home'); // Navigate back to home page
  };

  return (
    <div
      style={{
        backgroundImage: "url('/sign_in&sign_up_bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Dark overlay for better readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow rounded-4 overflow-hidden position-relative"
        style={{
          width: '750px',
          height: '450px',
          backdropFilter: 'blur(12px)', // Glassmorphism effect
          background: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
          border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
          zIndex: 10, // Ensure it's above overlay
        }}
      >
        <h2 className="text-center mb-4 text-white">Send an invite to a potential employer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Employer Name:</label>
            <input
              type="text"
              className="form-control bg-transparent border text-white"
              name="employerName"
              value={formData.employerName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Employer Email:</label>
            <input
              type="email"
              className="form-control bg-transparent border text-white"
              name="employerEmail"
              value={formData.employerEmail}
              onChange={handleChange}
            />
          </div>
          <p className="text-white">
            Candidate for which READ-only profile will be granted: <b>John Doe</b>
          </p>
          <p className="text-white">
            <i>
              Note: "Please check your email for a temporary password for candidate profile access."
            </i>
          </p>
          <button type="submit" className="btn btn-primary w-100">
            Send Invite
          </button>
        </form>

        {/* Back to Home button */}
        <button className="btn btn-secondary w-100 mt-3" onClick={handleBack}>
          Back to Home
        </button>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show"
          style={{ display: 'block', zIndex: 1050 }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Invite Summary</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal} // Close modal and clear form
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Employer Name:</strong> {submittedData?.employerName}</p>
                <p><strong>Employer Email:</strong> {submittedData?.employerEmail}</p>
                <p>
                  <strong>Candidate for Profile Access:</strong> <b>John Doe</b>
                </p>
                <p>
                  <i>
                    "Please check your email for a temporary password for candidate profile access."
                  </i>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal} // Close the modal and clear form
                >
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

export default SendInvite;
