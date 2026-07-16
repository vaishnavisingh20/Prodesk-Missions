import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import Invoice from "@/models/Invoice";
import User from "@/models/User";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
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

    await connectDB();

    let invoices;

    if (user.role === "admin") {
      invoices = await Invoice.find()
        .populate("client", "name email")
        .sort({
          createdAt: -1,
        });
    } else {
      invoices = await Invoice.find({
        client: user._id,
      })
        .populate("client", "name email")
        .sort({
          createdAt: -1,
        });
    }

    return NextResponse.json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch invoices",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const body = await request.json();

    const {
      client,
      items,
      dueDate,
      notes,
      currency,
    } = body;

    if (
      !client ||
      !items ||
      items.length === 0 ||
      !dueDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const clientUser = await User.findById(client);

    if (!clientUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Client not found",
        },
        {
          status: 404,
        }
      );
    }

    let subtotal = 0;

    const invoiceItems = items.map(
      (item: {
        description: string;
        quantity: number;
        unitPrice: number;
      }) => {
        const total =
          item.quantity * item.unitPrice;

        subtotal += total;

        return {
          ...item,
          total,
        };
      }
    );

    const tax = subtotal * 0.18;

    const total = subtotal + tax;

    const count =
      await Invoice.countDocuments();

    const invoiceNumber =
      `INV-${String(count + 1).padStart(5, "0")}`;

    const invoice = await Invoice.create({
      invoiceNumber,

      client,

      items: invoiceItems,

      subtotal,

      tax,

      total,

      dueDate,

      notes,

      currency:
        currency || "USD",

      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        invoice,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create invoice",
      },
      {
        status: 500,
      }
    );
  }
}