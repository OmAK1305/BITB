import { NextResponse } from "next/server";
import { addAppointment } from "@/lib/adminStore";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, email, payload, type = "appointment" } = body;

    if (!name || !contact) {
      return NextResponse.json(
        { error: { message: "Name and contact number are required." } },
        { status: 400 }
      );
    }

    const newRecord = await addAppointment({
      type,
      name,
      contact,
      email,
      payload: payload || {},
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    console.log("[API:Enquiries] New appointment saved:", newRecord);

    return NextResponse.json(
      {
        data: {
          success: true,
          message: "Enquiry logged successfully. Salon will confirm separately.",
          record: newRecord,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API:Enquiries] Error processing enquiry:", error);
    return NextResponse.json(
      { error: { message: "Failed to process enquiry." } },
      { status: 500 }
    );
  }
}
