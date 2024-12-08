import { authenticate } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";

export async function GET(req) {
  try {
    await authenticate(req);
    await connectToDatabase();
    const tasks = await Task.find().populate("userId", "username email");
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching tasks", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await authenticate(req); // Authenticate the user
    await connectToDatabase(); // Connect to MongoDB

    const body = await req.json();
    const { title, priority, status, userId, description = "", order = 0 } = body;

    // Validate the required fields
    if (!title || !priority || !status || !userId) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    console.log("User before task update:", user);

    // Create the new task
    const newTask = new Task({
      title,
      description,
      priority,
      status,
      order,
      userId,
    });

    // Save the new task
    await newTask.save();
    console.log("New Task ID:", newTask._id);

    // Update the user's tasks array
    user.tasks.push(newTask._id); // Push the new task ID to the array
    await user.save(); // Save the updated user

    console.log("Updated User after adding task:", user);

    // Return the new task as a response
    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response("Error creating task", { status: 500 });
  }
}


