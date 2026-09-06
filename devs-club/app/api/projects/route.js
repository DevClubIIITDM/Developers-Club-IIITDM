// pages/api/projects/index.js

import dbConnect from "../conn";

import Project from "../../models/project.model";

import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  console.log("Fetching projects...");

  try {
    await dbConnect();

    const projects = await Project.find({});

    return new Response(
      JSON.stringify({
        success: true,
        data: projects,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch projects",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: No user session found.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = await req.json();

    const {
      name,
      description,
      teamLead,
      fullDescription,
      teamMembers,
      status,
      key,
      featured,
    } = data;

    if (key !== process.env.NEXT_PUBLIC_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid API Key",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate status
    const validStatus = ["active", "completed", "on-hold"];

    const projectStatus = validStatus.includes(status)
      ? status
      : "completed";

    console.log("status: " + projectStatus);

    // Create new project
    const newProject = new Project({
      name,
      description,
      status: projectStatus,
      featured: featured ? 1 : 0,
      teamLead,
      fullDescription,
      teamMembers,
    });

    await newProject.save();

    console.log("Saved project with status:", newProject);

    return new Response(
      JSON.stringify({
        success: true,
        data: newProject,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding project:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error.message || "Failed to add project",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}


/*
 * PUT
 * Update an existing project
 */
export async function PUT(req) {
  console.log("Updating project...");

  try {
    await dbConnect();

    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: No user session found.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = await req.json();

    const {
      id,
      name,
      description,
      teamLead,
      fullDescription,
      teamMembers,
      status,
      key,
      featured,
    } = data;

    // Validate API key
    if (key !== process.env.NEXT_PUBLIC_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid API Key",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Make sure project ID exists
    if (!id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Project ID is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate status
    const validStatus = [
      "active",
      "completed",
      "on-hold",
    ];

    const projectStatus = validStatus.includes(status)
      ? status
      : "completed";

    console.log("Updating project with ID:", id);

    // Update project using custom `id` field
    const updatedProject = await Project.findOneAndUpdate(
      { id: id },
      {
        $set: {
          name,
          description,
          status: projectStatus,
          featured: featured ? 1 : 0,
          teamLead,
          fullDescription,
          teamMembers,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Project was not found
    if (!updatedProject) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Project not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log(
      "Updated project:",
      updatedProject
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: updatedProject,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error updating project:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error.message ||
          "Failed to update project",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}


export async function DELETE(req) {
  console.log("Deleting project...");

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: No user session found.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { id, key } = await req.json();

    console.log(id, key);

    if (key !== process.env.NEXT_PUBLIC_KEY) {
      console.log("Key is ", key);

      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid API Key",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await dbConnect();

    console.log("Id is " + id);

    // Find and delete using custom `id` field
    const deletedProject =
      await Project.findOneAndDelete({
        id: id,
      });

    if (!deletedProject) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Project not found",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: deletedProject,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error deleting project:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to delete project",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}