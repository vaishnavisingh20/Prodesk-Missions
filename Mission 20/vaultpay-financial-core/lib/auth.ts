
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { JWTPayload } from "jose";
const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined.");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload extends JWTPayload {
  userId: string;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  passwordHash: string
) {
  return bcrypt.compare(password, passwordHash);
}

export async function generateToken(
  payload: TokenPayload
) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);

  return payload as unknown as TokenPayload;
}

export async function getCurrentUser() {
  await connectDB();

  const cookieStore = await cookies();

  const token = cookieStore.get(
    process.env.AUTH_COOKIE_NAME || "vaultpay_token"
  )?.value;

  if (!token) return null;

  try {
    const payload = await verifyToken(token);

    const user = await User.findById(payload.userId).select(
      "-passwordHash"
    );

    if (!user) return null;

    if (!user.isActive) return null;

    return user;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}

export async function requireClient() {
  const user = await requireAuth();

  if (user.role !== "client") {
    throw new Error("Forbidden");
  }

  return user;
}