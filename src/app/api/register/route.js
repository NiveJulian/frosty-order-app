import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass?.length < 5) {
    new Error("La contraseña debe tener mas de 5 caracteres");
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
