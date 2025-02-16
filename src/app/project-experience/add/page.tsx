"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddProjectPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateCompleted: "",
    githubLink: "",
    liveLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    router.push("/project-experience");
  };

  return (
    <div className="container">
      <h1>Add New Project</h1>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Project Name", type: "text", name: "name" },
          { label: "Description", type: "textarea", name: "description" },
          { label: "Date Completed", type: "date", name: "dateCompleted" },
          { label: "GitHub Link", type: "url", name: "githubLink" },
          { label: "Live Web Link", type: "url", name: "liveLink" },
        ].map(({ label, type, name }) => (
          <div key={name} className="mb-3">
            <label className="form-label">{label}</label>
            {type === "textarea" ? (
              <textarea className="form-control" name={name} value={formData[name]} onChange={handleChange} required />
            ) : (
              <input className="form-control" type={type} name={name} value={formData[name]} onChange={handleChange} required />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProjectPage;
