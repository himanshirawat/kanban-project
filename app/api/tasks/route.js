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
    await authenticate(req); 
    await connectToDatabase();
    const body = await req.json();
    const { title, priority, status, dueDate, userId, description = "", order = 0 } = body;
    console.log(dueDate);
    if (!title || !priority || !status || !userId  || !dueDate) {
      return new Response("Missing required fields", { status: 400 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    console.log("User before task update:", user);
    const newTask = new Task({
      title,
      description,
      priority,
      status,
      order,
      userId,
      dueDate
    });
    await newTask.save();
    console.log(newTask);
    console.log("New Task ID:", newTask._id);
    user.tasks.push(newTask._id); 
    await user.save(); 
    console.log("Updated User after adding task:", user);
    return new Response(JSON.stringify(newTask), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response("Error creating task", { status: 500 });
  }
}


