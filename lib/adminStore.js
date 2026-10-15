import fs from "fs/promises";
import path from "path";
import connectToDatabase from "./mongodb";
import Appointment from "@/models/Appointment";
import GalleryItem from "@/models/GalleryItem";
import { beforeAfterGallery as defaultGallery } from "./data";

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");

const initialAppointments = [
  {
    id: "enq_1718012345001",
    type: "appointment",
    name: "Aarav Mehta",
    contact: "+91 98220 11223",
    email: "aarav.mehta@example.com",
    payload: {
      parentName: "Aarav Mehta",
      phone: "+91 98220 11223",
      email: "aarav.mehta@example.com",
      petName: "Coco",
      petBreed: "Shih Tzu (3 yrs)",
      serviceType: "Full Grooming & Breed Styling",
      preferredDate: "2026-10-08",
      preferredTime: "Morning (10:00 AM – 1:00 PM)",
      coatCondition: "Matted around ears & paws",
      specialNotes: "Coco gets nervous around loud blow dryers. Please take gentle breaks."
    },
    status: "pending",
    submittedAt: "2026-10-05T14:30:00.000Z"
  },
  {
    id: "enq_1718012345002",
    type: "appointment",
    name: "Sneha Patil",
    contact: "+91 98901 44556",
    email: "sneha.p@gmail.com",
    payload: {
      parentName: "Sneha Patil",
      phone: "+91 98901 44556",
      email: "sneha.p@gmail.com",
      petName: "Max",
      petBreed: "Golden Retriever (2 yrs)",
      serviceType: "Bath, Blow-Dry & De-shedding",
      preferredDate: "2026-10-07",
      preferredTime: "Afternoon (1:00 PM – 4:00 PM)",
      coatCondition: "Heavy seasonal shedding",
      specialNotes: "Loves water, needs thorough undercoat removal."
    },
    status: "confirmed",
    submittedAt: "2026-10-04T09:15:00.000Z"
  },
  {
    id: "enq_1718012345003",
    type: "appointment",
    name: "Rohan Deshmukh",
    contact: "+91 97654 32109",
    email: "rohan.desh@outlook.com",
    payload: {
      parentName: "Rohan Deshmukh",
      phone: "+91 97654 32109",
      email: "rohan.desh@outlook.com",
      petName: "Leo",
      petBreed: "Cockapoo (8 mos)",
      serviceType: "Puppy First-Groom Introduction",
      preferredDate: "2026-10-09",
      preferredTime: "Morning (10:00 AM – 1:00 PM)",
      coatCondition: "Soft puppy coat",
      specialNotes: "First professional groom ever. Very friendly but easily excited."
    },
    status: "pending",
    submittedAt: "2026-10-06T08:00:00.000Z"
  },
  {
    id: "enq_1718012345004",
    type: "appointment",
    name: "Kavita Shinde",
    contact: "+91 94223 88990",
    email: "kavita.s@yahoo.com",
    payload: {
      parentName: "Kavita Shinde",
      phone: "+91 94223 88990",
      email: "kavita.s@yahoo.com",
      petName: "Rocky",
      petBreed: "Indie Dog (4 yrs)",
      serviceType: "Full Grooming & Breed Styling",
      preferredDate: "2026-10-03",
      preferredTime: "Evening (4:00 PM – 7:30 PM)",
      coatCondition: "Normal",
      specialNotes: "Rescue dog, very gentle with treats."
    },
    status: "completed",
    submittedAt: "2026-10-02T11:45:00.000Z"
  }
];

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Ignore
  }
}

// ------------------- FILE FALLBACK HELPERS -------------------

async function getFileAppointments() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(APPOINTMENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(initialAppointments, null, 2), "utf-8");
    return initialAppointments;
  }
}

async function saveFileAppointments(list) {
  await ensureDataDir();
  await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(list, null, 2), "utf-8");
}

async function getFileGallery() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(GALLERY_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    await fs.writeFile(GALLERY_FILE, JSON.stringify(defaultGallery, null, 2), "utf-8");
    return defaultGallery;
  }
}

async function saveFileGallery(list) {
  await ensureDataDir();
  await fs.writeFile(GALLERY_FILE, JSON.stringify(list, null, 2), "utf-8");
}

// ------------------- APPOINTMENTS (MONGODB with FALLBACK) -------------------

export async function getAppointments() {
  try {
    await connectToDatabase();
    let docs = await Appointment.find({}).sort({ submittedAt: -1 }).lean();

    // Auto-seed if MongoDB collection is empty
    if (!docs || docs.length === 0) {
      await Appointment.insertMany(initialAppointments);
      docs = await Appointment.find({}).sort({ submittedAt: -1 }).lean();
    }

    return docs.map((doc) => ({
      id: doc.id,
      type: doc.type,
      name: doc.name,
      contact: doc.contact,
      email: doc.email,
      payload: doc.payload,
      status: doc.status,
      adminNote: doc.adminNote,
      submittedAt: doc.submittedAt,
    }));
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB query failed, using JSON file fallback:", mongoError.message);
    return getFileAppointments();
  }
}

export async function addAppointment(newAppointment) {
  const record = {
    id: newAppointment.id || "enq_" + Date.now(),
    type: newAppointment.type || "appointment",
    name: newAppointment.name || newAppointment.payload?.parentName || "Anonymous",
    contact: newAppointment.contact || newAppointment.payload?.phone || "",
    email: newAppointment.email || newAppointment.payload?.email || "",
    payload: newAppointment.payload || {},
    status: newAppointment.status || "pending",
    submittedAt: newAppointment.submittedAt || new Date().toISOString(),
  };

  try {
    await connectToDatabase();
    const created = await Appointment.create(record);
    return {
      id: created.id,
      type: created.type,
      name: created.name,
      contact: created.contact,
      email: created.email,
      payload: created.payload,
      status: created.status,
      submittedAt: created.submittedAt,
    };
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB insert failed, saving to file:", mongoError.message);
    const list = await getFileAppointments();
    list.unshift(record);
    await saveFileAppointments(list);
    return record;
  }
}

export async function updateAppointmentStatus(id, newStatus, adminNote = "") {
  try {
    await connectToDatabase();
    const update = { status: newStatus };
    if (adminNote) update.adminNote = adminNote;
    const updated = await Appointment.findOneAndUpdate({ id }, update, { new: true }).lean();
    if (updated) return updated;
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB update failed, updating file:", mongoError.message);
  }

  const list = await getFileAppointments();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return null;
  list[index].status = newStatus;
  if (adminNote) list[index].adminNote = adminNote;
  list[index].updatedAt = new Date().toISOString();
  await saveFileAppointments(list);
  return list[index];
}

export async function deleteAppointment(id) {
  try {
    await connectToDatabase();
    await Appointment.deleteOne({ id });
    return true;
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB delete failed, deleting from file:", mongoError.message);
    const list = await getFileAppointments();
    const filtered = list.filter((item) => item.id !== id);
    await saveFileAppointments(filtered);
    return true;
  }
}

// ------------------- GALLERY BEFORE / AFTER (MONGODB with FALLBACK) -------------------

export async function getGallery() {
  try {
    await connectToDatabase();
    let docs = await GalleryItem.find({}).sort({ createdAt: -1 }).lean();

    // Auto-seed if MongoDB collection is empty
    if (!docs || docs.length === 0) {
      await GalleryItem.insertMany(defaultGallery);
      docs = await GalleryItem.find({}).sort({ createdAt: -1 }).lean();
    }

    return docs.map((doc) => ({
      id: doc.id,
      petName: doc.petName,
      breed: doc.breed,
      service: doc.service,
      beforeImage: doc.beforeImage,
      afterImage: doc.afterImage,
      story: doc.story,
    }));
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB gallery query failed, using JSON file fallback:", mongoError.message);
    return getFileGallery();
  }
}

export async function addGalleryItem(item) {
  const record = {
    id: "pair-" + Date.now(),
    petName: item.petName || "Pet Transformation",
    breed: item.breed || "Dog Breed",
    service: item.service || "Full Grooming & Styling",
    beforeImage: item.beforeImage,
    afterImage: item.afterImage,
    story: item.story || "A wonderful grooming transformation at Beauty in the Beast.",
  };

  try {
    await connectToDatabase();
    const created = await GalleryItem.create(record);
    return {
      id: created.id,
      petName: created.petName,
      breed: created.breed,
      service: created.service,
      beforeImage: created.beforeImage,
      afterImage: created.afterImage,
      story: created.story,
    };
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB gallery insert failed, saving to file:", mongoError.message);
    const list = await getFileGallery();
    list.unshift(record);
    await saveFileGallery(list);
    return record;
  }
}

export async function updateGalleryItem(id, updatedFields) {
  try {
    await connectToDatabase();
    const updated = await GalleryItem.findOneAndUpdate({ id }, updatedFields, { new: true }).lean();
    if (updated) return updated;
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB gallery update failed, updating file:", mongoError.message);
  }

  const list = await getFileGallery();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updatedFields };
  await saveFileGallery(list);
  return list[index];
}

export async function deleteGalleryItem(id) {
  try {
    await connectToDatabase();
    await GalleryItem.deleteOne({ id });
    return true;
  } catch (mongoError) {
    console.warn("[AdminStore] MongoDB gallery delete failed, deleting from file:", mongoError.message);
    const list = await getFileGallery();
    const filtered = list.filter((item) => item.id !== id);
    await saveFileGallery(filtered);
    return true;
  }
}
