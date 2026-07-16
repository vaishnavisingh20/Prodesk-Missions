
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name is required")
    .max(150),

  phone: z
    .string()
    .trim()
    .optional()
    .default(""),

  address: z
    .string()
    .trim()
    .optional()
    .default("")
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      email,
      password,
      companyName,
      phone,
      address,
    } = validation.data;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered.",
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      passwordHash,

      role: "client",

      companyName,

      phone,

      address,

      avatar: "",

      emailVerified: false,

      lastLogin: null,

      createdBy: null,

      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyName: user.companyName,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}