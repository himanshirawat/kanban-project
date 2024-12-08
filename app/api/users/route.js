import { authenticate } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import Task from "@/models/Task";

export async function GET(req) {
  try {
    await connectToDatabase();

    const userData = await authenticate(req);
    if (!userData) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await User.findById(userData.userId)
      .select("-password")
      .populate("tasks");
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Unauthorized", { status: 401 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return new Response("Missing required fields", { status: 400 });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    const userWithoutPassword = { ...newUser.toObject(), password: undefined };
    return new Response(JSON.stringify(userWithoutPassword), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Error registering user", { status: 500 });
  }
}
