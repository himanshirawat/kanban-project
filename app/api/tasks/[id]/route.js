import { authenticate } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Task from "@/models/Task";

export async function PUT(req) {
  try {
    await authenticate(req);
    await connectToDatabase();
    const id = req.url.split("/").pop();
    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
    if (!updatedTask) {
      return new Response("Task not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error updating task", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await authenticate(req);
    await connectToDatabase();
    const id = req.url.split("/").pop();
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return new Response("Task not found", { status: 404 });
    }
    return new Response("Task deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error deleting task", { status: 500 });
  }
}
