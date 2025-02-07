"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

const ProjectExperiencePage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        alert("Project deleted");
        router.refresh();
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    }
  };

  return (
    <div className="container">
      <h1>Project Experience</h1>
      <button className="btn btn-primary mb-3" onClick={() => router.push("/project-experience/add")}>
        Add New Project
      </button>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Date Completed</th>
            <th>GitHub</th>
            <th>Live</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map(({ _id, name, description, dateCompleted, githubLink, liveLink }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>{new Date(dateCompleted).toLocaleDateString()}</td>
                <td>{githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}</td>
                <td>{liveLink && <a href={liveLink} target="_blank" rel="noopener noreferrer">Live</a>}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => router.push(`/project-experience/edit/${_id}`)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No projects available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectExperiencePage;
