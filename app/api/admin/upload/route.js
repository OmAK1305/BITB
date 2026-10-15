import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const tag = formData.get("tag") || "image"; // 'before' or 'after' or generic

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
    await fs.mkdir(uploadDir, { recursive: true });

    // Clean filename
    const originalName = file.name || "upload.jpg";
    const ext = path.extname(originalName) || ".jpg";
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${tag}-${Date.now()}-${baseName}${ext}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/gallery/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: buffer.length,
    });
  } catch (error) {
    console.error("[API:Upload] Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to process image upload: " + error.message },
      { status: 500 }
    );
  }
}
