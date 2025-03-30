'use client';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const NewProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    linkedInUrl: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect to landing page if no valid JWT
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const userType = localStorage.getItem('userType'); // Assuming userType is stored in localStorage

   if (!token) {
     router.push('/landing_page');
   } else if (userType === '1') {
     router.push('/unauthorized'); // Redirect userType 1 to an unauthorized page
   }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateFirstName: formData.firstName,
          candidateLastName: formData.lastName,
          candidateEmail: formData.email,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          linkedInUrl: formData.linkedInUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to create profile');

      alert('Candidate profile created successfully!');
      router.push('/home');
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating candidate profile. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-center align-items-center position-relative bg-cover"
      style={{ backgroundImage: "url('/landing.jpg')" }} // Background applied
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow rounded-4 position-relative glassmorphism text-dark"
        style={{ width: '40vw', minWidth: '350px', minHeight: '550px', zIndex: 10 }} // Adjusted width
      >
        <h2 className="text-center mb-4">Create a New Candidate Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Candidate First Name:</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Candidate Last Name:</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Candidate Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">LinkedIn URL (optional):</label>
            <input
              type="text"
              className="form-control"
              name="linkedInUrl"
              value={formData.linkedInUrl}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Profile'}
          </button>
        </form>

        <button className="btn btn-secondary w-100 mt-3" onClick={() => router.push('/home')}>
          Back to Home
        </button>
      </motion.div>

      <style jsx>{`
        .bg-cover {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .glassmorphism {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default NewProfile;
