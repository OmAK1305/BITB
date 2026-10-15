import { NextResponse } from "next/server";
import { getAppointments, updateAppointmentStatus, deleteAppointment, addAppointment } from "@/lib/adminStore";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const query = searchParams.get("q")?.toLowerCase();

    let list = await getAppointments();

    if (status && status !== "all") {
      list = list.filter((item) => item.status?.toLowerCase() === status.toLowerCase());
    }

    if (query) {
      list = list.filter((item) => {
        const name = (item.name || "").toLowerCase();
        const petName = (item.payload?.petName || "").toLowerCase();
        const breed = (item.payload?.petBreed || "").toLowerCase();
        const contact = (item.contact || "").toLowerCase();
        const service = (item.payload?.serviceType || "").toLowerCase();
        return (
          name.includes(query) ||
          petName.includes(query) ||
          breed.includes(query) ||
          contact.includes(query) ||
          service.includes(query)
        );
      });
    }

    return NextResponse.json({ success: true, appointments: list });
  } catch (error) {
    console.error("[API:Admin:Appointments] Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newRecord = await addAppointment(body);
    return NextResponse.json({ success: true, record: newRecord }, { status: 201 });
  } catch (error) {
    console.error("[API:Admin:Appointments] Error adding appointment:", error);
    return NextResponse.json(
      { error: "Failed to add appointment" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, adminNote } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Appointment ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await updateAppointmentStatus(id, status, adminNote);
    if (!updated) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error("[API:Admin:Appointments] Error updating status:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    await deleteAppointment(id);
    return NextResponse.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    console.error("[API:Admin:Appointments] Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
