'use client';

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
  accessStatus?: string; // Add accessStatus to identify existing requests
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
  const [modalFade, setModalFade] = useState(true);
  const router = useRouter();

  // Redirect to landing page if no valid JWT
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/landing_page');
    }
  }, [router]);
  
  // Fetch candidates and employers on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/requestprofileaccess');
      const data = await response.json();

      setEmployers(data.employers);

      // Store candidates and employers in localStorage as list_B
      localStorage.setItem('list_B', JSON.stringify(data));

      // Log the data to console
      console.log('list_B:', data);
    };

    fetchData();
  }, []);

  // Fetch systemUserId (Employer ID) and systemUserType from local storage
  useEffect(() => {
    const systemUserId = localStorage.getItem('systemUserId');
    const systemUserType = localStorage.getItem('systemUserType');

    if (systemUserId) {
      const selectedEmployer = employers.find(emp => emp._id === systemUserId);
      if (selectedEmployer) {
        setFormData({
          employerId: systemUserId,
          employerEmail: selectedEmployer.employerEmail,
          selectedCandidate: "",
        });

        // Log the employer details and system user data
        console.log('Employer Name:', selectedEmployer.employerName);
        console.log('Employer Email:', selectedEmployer.employerEmail);
        console.log('System User ID:', systemUserId);
        console.log('System User Type:', systemUserType);

        // Fetch profiles based on systemUserId and store them in LocalStorage
        const fetchProfiles = async () => {
          const response = await fetch(`/api/profiles/${systemUserId}`);
          const data = await response.json();
          
          // Store profiles in LocalStorage as list_A
          localStorage.setItem('list_A', JSON.stringify(data));

          // Print the profiles (list_A) to the console
          console.log('list_A:', data);
        };

        fetchProfiles();
      }
    }
  }, [employers]); // This will run only once when employers data is fetched

  // Compute list_C once list_B and list_A are loaded
  const computeListC = () => {
    const list_B = JSON.parse(localStorage.getItem('list_B') || 'null');
    const list_A = JSON.parse(localStorage.getItem('list_A') || 'null');

    if (list_B && list_A) {
      // Extract only the candidates portion of list_B
      const candidates_B = list_B.candidates;

      // Filter out candidates from list_A based on _id
      const list_C = candidates_B.filter(candidateB => 
        !list_A.some(candidateA => candidateA._id === candidateB._id)
      );

      // Sort list_C alphabetically
      const sortedList_C = list_C.sort((a, b) => {
        const nameA = `${a.employeeFirstName} ${a.employeeLastName}`.toLowerCase();
        const nameB = `${b.employeeFirstName} ${b.employeeLastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });

      // Store sorted list_C in localStorage
      localStorage.setItem('list_C', JSON.stringify(sortedList_C));

      // Set the candidates state to sorted list_C for dropdown population
      setCandidates(sortedList_C);

      // Log sorted list_C to the console (only once)
      console.log('sorted list_C:', sortedList_C);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);

    const requestData = {
      systemUser: formData.employerId,
      profile: formData.selectedCandidate,
      requestDate: new Date().toISOString(),
      accessStatus: "Pending",
    };

    await fetch('/api/requestprofileaccess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });

    // Fade out modal after a delay
    setTimeout(() => setModalFade(false), 500);
    setTimeout(() => router.push('/home'), 1000);
  };

  // Refresh list_C when dropdown is clicked
  const handleDropdownClick = () => {
    console.log("Dropdown clicked, refreshing list_C...");
    computeListC(); // Trigger a refresh of list_C
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative bg-cover"
      style={{ backgroundImage: "url('/landing.jpg')" }}>

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
            <select 
              className="form-select" 
              name="selectedCandidate" 
              value={formData.selectedCandidate} 
              onChange={handleChange}
              onClick={handleDropdownClick} // Trigger refresh when dropdown is clicked
            >
              <option value="" disabled>Select a candidate</option>
              {candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <option key={candidate._id} value={candidate._id}>
                    {candidate.employeeFirstName} {candidate.employeeLastName}
                  </option>
                ))
              ) : (
                <option disabled>No candidates available</option>
              )}
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
        <div className={`modal show d-block ${modalFade ? 'opacity-100' : 'opacity-0'}`} 
          style={{ transition: 'opacity 0.5s ease-in-out', zIndex: 1050 }} tabIndex={-1}>
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
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestProfile;
