import { NextResponse } from "next/server";
import { getGallery, addGalleryItem, deleteGalleryItem, updateGalleryItem } from "@/lib/adminStore";

export async function GET() {
  try {
    const items = await getGallery();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { petName, breed, service, beforeImage, afterImage, story } = body;

    if (!beforeImage || !afterImage) {
      return NextResponse.json(
        { error: "Both Before Image and After Image are required." },
        { status: 400 }
      );
    }

    const newItem = await addGalleryItem({
      petName: petName || "Pet Transformation",
      breed: breed || "Dog",
      service: service || "Grooming Transformation",
      beforeImage,
      afterImage,
      story: story || "",
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    const updated = await updateGalleryItem(id, updates);
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    await deleteGalleryItem(id);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
