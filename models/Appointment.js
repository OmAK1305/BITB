import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => "enq_" + Date.now(),
    },
    type: {
      type: String,
      default: "appointment",
    },
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
    payload: {
      parentName: String,
      phone: String,
      email: String,
      petName: String,
      petBreed: String,
      serviceType: String,
      preferredDate: String,
      preferredTime: String,
      coatCondition: String,
      specialNotes: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    adminNote: {
      type: String,
      default: "",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite error during Next.js hot reloads
export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
