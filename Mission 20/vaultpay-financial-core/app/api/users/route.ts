import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const role =
      request.nextUrl.searchParams.get("role");

    const filter =
      role ? { role } : {};

    const users = await User.find(filter)
      .select("name email role")
      .sort({
        name: 1,
      });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}