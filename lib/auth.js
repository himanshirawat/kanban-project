import jwt from "jsonwebtoken";
export async function authenticate(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Response("Unauthorized", { status: 401 });
  }
}
