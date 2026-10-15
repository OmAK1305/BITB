import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => "pair-" + Date.now(),
    },
    petName: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      default: "Full Styling & Breed Grooming",
    },
    beforeImage: {
      type: String,
      required: true,
    },
    afterImage: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite error during Next.js hot reloads
export default mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);
