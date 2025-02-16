import mongoose, { Schema, Document, ObjectId } from 'mongoose';

interface Project {
  _id: ObjectId;
  name: string;
  description: string;
  dateCompleted: string;
  githubLink: string;
  liveLink: string;
}

interface Skill {
  _id: ObjectId;
  name: string;
}

interface Profile extends Document {
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  address: string;
  phoneNumber: string;
  linkedInUrl: string;
  projects: Project[];
  skills: Skill[];
}

const profileSchema: Schema = new Schema(
  {
    employeeFirstName: { type: String, required: true },
    employeeLastName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    linkedInUrl: { type: String, required: true },
    projects: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        dateCompleted: { type: String, required: true },
        githubLink: { type: String, required: true },
        liveLink: { type: String, required: true },
      }
    ],
    skills: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

const Profile = mongoose.model<Profile>('Profile', profileSchema);

export default Profile;
