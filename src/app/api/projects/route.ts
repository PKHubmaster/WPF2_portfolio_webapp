import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

// GET method to fetch all projects
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({});
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST method to create a new project
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const project = new Project({
      name: data.name,
      description: data.description,
      dateCompleted: new Date(data.dateCompleted),
      githubLink: data.githubLink,
      liveLink: data.liveLink,
    });
    await project.save();
    return NextResponse.json({ message: "Project created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
