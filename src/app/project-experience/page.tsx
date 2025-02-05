"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ProjectExperiencePage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="container">
      <h1>Project Experience</h1>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Date Completed</th>
            <th>GitHub Link</th>
            <th>Live Web Link</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{new Date(project.dateCompleted).toLocaleDateString()}</td>
              <td><a href={project.githubLink} target="_blank">GitHub</a></td>
              <td><a href={project.liveLink} target="_blank">Live Link</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectExperiencePage;
