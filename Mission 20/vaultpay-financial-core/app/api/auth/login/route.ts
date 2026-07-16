import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import {
  comparePassword,
  generateToken,
} from "@/lib/auth";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validation = loginSchema.safeParse(body);

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

    const { email, password } = validation.data;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been disabled.",
        },
        {
          status: 403,
        }
      );
    }

    const passwordMatched = await comparePassword(
      password,
      user.passwordHash
    );

    if (!passwordMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await generateToken({
      userId: user._id.toString(),
    });

    const cookieStore = await cookies();

    cookieStore.set({
      name:
        process.env.AUTH_COOKIE_NAME ||
        "vaultpay_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    user.lastLogin = new Date();
    await user.save();

    return NextResponse.json(
  {
    success: true,
    message: "Login successful.",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        avatar: user.avatar,
      },
    },
  },
  {
    status: 200,
  }
);
  } catch (error) {
    console.error(error);

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