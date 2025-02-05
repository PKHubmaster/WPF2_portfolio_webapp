import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateCompleted: { type: Date, required: true },
    githubLink: { type: String, required: true },
    liveLink: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
