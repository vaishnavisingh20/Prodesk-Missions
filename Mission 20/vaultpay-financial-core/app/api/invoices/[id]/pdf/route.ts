import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { getCurrentUser } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  
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
if (user.role !== "client") {
  return NextResponse.json(
    { success: false, message: "Forbidden" },
    { status: 403 }
  );
}
    await connectDB();

    const invoice = await Invoice.findOne({
      _id: params.id,
      client: user._id,
    }).lean();


    if (!invoice) {
      return NextResponse.json(
        {
          success: false,
          message: "Invoice not found",
        },
        {
          status: 404,
        }
      );
    }


    const pdfDoc =
      await PDFDocument.create();


    const page = pdfDoc.addPage([
      595,
      842,
    ]);


    const font =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );


    page.drawText(
      "VaultPay Financial Core",
      {
        x: 50,
        y: 780,
        size: 22,
        font,
      }
    );


    page.drawText(
      `Invoice: ${invoice.invoiceNumber}`,
      {
        x: 50,
        y: 740,
        size: 14,
        font,
      }
    );


    page.drawText(
      `Status: ${invoice.status}`,
      {
        x: 50,
        y: 715,
        size: 14,
        font,
      }
    );


    page.drawText(
      `Amount: $${invoice.total}`,
      {
        x: 50,
        y: 690,
        size: 14,
        font,
      }
    );


    page.drawText(
      "Items:",
      {
        x: 50,
        y: 640,
        size: 14,
        font,
      }
    );


    let y = 610;


    invoice.items.forEach(
      (item: any) => {

        page.drawText(
          `${item.description} x${item.quantity} - $${item.total}`,
          {
            x: 60,
            y,
            size: 12,
            font,
          }
        );

        y -= 25;
      }
    );


    page.drawText(
      "Thank you for your business.",
      {
        x: 50,
        y: 120,
        size: 12,
        font,
      }
    );


    const pdfBytes =
  await pdfDoc.save();

const pdfBuffer =
  Buffer.from(pdfBytes);


    return new NextResponse(
  pdfBuffer,
  {
    status: 200,
    headers: {
      "Content-Type":
        "application/pdf",

      "Content-Disposition":
        `attachment; filename="${invoice.invoiceNumber}.pdf"`,
    },
  }
);


  } catch (error) {

    console.error(
      "PDF GENERATION ERROR:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to generate PDF",
      },
      {
        status: 500,
      }
    );

  }
}