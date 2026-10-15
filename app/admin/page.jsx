"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";

export default function AdminPortal() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  // Portal State
  const [activeTab, setActiveTab] = useState("appointments"); // 'overview' | 'appointments' | 'gallery'
  const [notification, setNotification] = useState(null);

  // Appointments State
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);
  const [manualAppointmentForm, setManualAppointmentForm] = useState({
    parentName: "",
    phone: "",
    email: "",
    petName: "",
    petBreed: "",
    serviceType: "Full Grooming & Breed Styling",
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "Morning (10:00 AM – 1:00 PM)",
    coatCondition: "Normal",
    specialNotes: "",
  });

  // Gallery State
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [gallerySubmitting, setGallerySubmitting] = useState(false);

  // Gallery Upload Form State
  const [galleryForm, setGalleryForm] = useState({
    petName: "",
    breed: "",
    service: "Full Styling & Breed Grooming",
    story: "",
  });

  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [beforePreviewUrl, setBeforePreviewUrl] = useState("");
  const [afterPreviewUrl, setAfterPreviewUrl] = useState("");

  const beforeFileInputRef = useRef(null);
  const afterFileInputRef = useRef(null);

  // Show Toast Notification helper
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Check persisted auth on mount
  useEffect(() => {
    const session = sessionStorage.getItem("bitb_admin_session");
    if (session === "authenticated_bitb") {
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  // Fetch appointments and gallery data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
      fetchGallery();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (pinInput === "bitb2026" || pinInput === "admin" || pinInput === "1234") {
      sessionStorage.setItem("bitb_admin_session", "authenticated_bitb");
      setIsAuthenticated(true);
      setAuthError("");
      showToast("Welcome to Beauty in the Beast Admin Portal!");
    } else {
      setAuthError("Incorrect PIN. Please enter 'bitb2026' or click Quick Demo Access.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bitb_admin_session");
    setIsAuthenticated(false);
    setPinInput("");
    showToast("Logged out successfully.", "info");
  };

  // API Call: Fetch Appointments
  const fetchAppointments = async () => {
    setAppointmentsLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      showToast("Failed to load appointments", "error");
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // API Call: Fetch Gallery Items
  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setGalleryItems(data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
      showToast("Failed to load gallery items", "error");
    } finally {
      setGalleryLoading(false);
    }
  };

  // Update Appointment Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedAppointment && selectedAppointment.id === id) {
          setSelectedAppointment((prev) => ({ ...prev, status: newStatus }));
        }
        showToast(`Appointment status changed to ${newStatus}`);
      }
    } catch (err) {
      showToast("Failed to update status", "error");
    }
  };

  // Delete Appointment
  const handleDeleteAppointment = async (id, petName) => {
    if (!confirm(`Are you sure you want to delete the enquiry for ${petName}?`)) return;
    try {
      const res = await fetch(`/api/admin/appointments?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));
        if (selectedAppointment?.id === id) setSelectedAppointment(null);
        showToast(`Appointment for ${petName} deleted`);
      }
    } catch (err) {
      showToast("Failed to delete appointment", "error");
    }
  };

  // Manual Add Appointment Submit
  const handleCreateManualAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "appointment",
          name: manualAppointmentForm.parentName,
          contact: manualAppointmentForm.phone,
          email: manualAppointmentForm.email,
          payload: manualAppointmentForm,
          status: "confirmed",
          submittedAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => [data.record, ...prev]);
        setShowAddAppointmentModal(false);
        setManualAppointmentForm({
          parentName: "",
          phone: "",
          email: "",
          petName: "",
          petBreed: "",
          serviceType: "Full Grooming & Breed Styling",
          preferredDate: new Date().toISOString().split("T")[0],
          preferredTime: "Morning (10:00 AM – 1:00 PM)",
          coatCondition: "Normal",
          specialNotes: "",
        });
        showToast("New appointment added successfully!");
      }
    } catch (err) {
      showToast("Failed to create appointment", "error");
    }
  };

  // Handle Before Image file selection
  const handleBeforeFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBeforeFile(file);
      const objectUrl = URL.createObjectURL(file);
      setBeforePreviewUrl(objectUrl);
    }
  };

  // Handle After Image file selection
  const handleAfterFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAfterFile(file);
      const objectUrl = URL.createObjectURL(file);
      setAfterPreviewUrl(objectUrl);
    }
  };

  // Handle Gallery Upload & Creation
  const handleAddGallerySubmit = async (e) => {
    e.preventDefault();
    if (!beforeFile && !beforePreviewUrl) {
      alert("Please upload the Before image.");
      return;
    }
    if (!afterFile && !afterPreviewUrl) {
      alert("Please upload the After image.");
      return;
    }
    if (!galleryForm.petName || !galleryForm.breed) {
      alert("Please provide the Pet's Name and Breed.");
      return;
    }

    setGallerySubmitting(true);
    try {
      let finalBeforeUrl = beforePreviewUrl;
      let finalAfterUrl = afterPreviewUrl;

      // 1. Upload Before Image if a file was selected
      if (beforeFile) {
        const formData = new FormData();
        formData.append("file", beforeFile);
        formData.append("tag", "before");
        const resBefore = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const dataBefore = await resBefore.json();
        if (dataBefore.success) {
          finalBeforeUrl = dataBefore.url;
        } else {
          throw new Error("Failed to upload Before image: " + dataBefore.error);
        }
      }

      // 2. Upload After Image if a file was selected
      if (afterFile) {
        const formData = new FormData();
        formData.append("file", afterFile);
        formData.append("tag", "after");
        const resAfter = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const dataAfter = await resAfter.json();
        if (dataAfter.success) {
          finalAfterUrl = dataAfter.url;
        } else {
          throw new Error("Failed to upload After image: " + dataAfter.error);
        }
      }

      // 3. Create Gallery Record
      const resGallery = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petName: galleryForm.petName,
          breed: galleryForm.breed,
          service: galleryForm.service,
          story: galleryForm.story,
          beforeImage: finalBeforeUrl,
          afterImage: finalAfterUrl,
        }),
      });

      const dataGallery = await resGallery.json();
      if (dataGallery.success) {
        setGalleryItems((prev) => [dataGallery.item, ...prev]);
        setShowAddGalleryModal(false);
        // Reset form
        setGalleryForm({
          petName: "",
          breed: "",
          service: "Full Styling & Breed Grooming",
          story: "",
        });
        setBeforeFile(null);
        setAfterFile(null);
        setBeforePreviewUrl("");
        setAfterPreviewUrl("");
        showToast(`Transformation for ${galleryForm.petName} published successfully!`);
      } else {
        throw new Error(dataGallery.error || "Failed to save transformation");
      }
    } catch (err) {
      console.error("Gallery submit error:", err);
      showToast(err.message || "Failed to publish transformation", "error");
    } finally {
      setGallerySubmitting(false);
    }
  };

  // Delete Gallery Item
  const handleDeleteGalleryItem = async (id, petName) => {
    if (!confirm(`Are you sure you want to delete the transformation image pair for ${petName}? This will remove it from both the admin portal and public gallery.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setGalleryItems((prev) => prev.filter((item) => item.id !== id));
        showToast(`Transformation pair for ${petName} deleted.`);
      }
    } catch (err) {
      showToast("Failed to delete gallery item", "error");
    }
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesStatus = statusFilter === "all" || app.status?.toLowerCase() === statusFilter.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (app.name || "").toLowerCase().includes(q) ||
        (app.contact || "").toLowerCase().includes(q) ||
        (app.payload?.petName || "").toLowerCase().includes(q) ||
        (app.payload?.petBreed || "").toLowerCase().includes(q) ||
        (app.payload?.serviceType || "").toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [appointments, statusFilter, searchQuery]);

  // Metrics for overview
  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const completed = appointments.filter((a) => a.status === "completed").length;
    const galleryCount = galleryItems.length;
    return { total, pending, confirmed, completed, galleryCount };
  }, [appointments, galleryItems]);

  // Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#1A4684] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-[#1A4684]">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  // Passcode / Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#F9F1E7]/60 via-white to-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#F3C097]/30 rounded-full blur-2xl pointer-events-none"></div>
          <div className="text-center space-y-3 mb-8 relative">
            <div className="w-16 h-16 bg-[#1A4684] text-white rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-md">
              🔐
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A4684] font-['Nunito']">
              Salon Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Beauty in the Beast · Karvenagar Salon Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Enter Admin Passcode / PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter passcode (e.g. bitb2026)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1A4684] focus:ring-2 focus:ring-[#1A4684]/20 outline-none transition-all text-center tracking-widest font-mono text-base"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-600 text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#1A4684] text-white hover:bg-[#123363] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Portal</span>
              <span>→</span>
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setPinInput("bitb2026");
                  sessionStorage.setItem("bitb_admin_session", "authenticated_bitb");
                  setIsAuthenticated(true);
                  showToast("Logged in with Quick Demo Access!");
                }}
                className="text-xs font-semibold text-[#C6742A] hover:underline cursor-pointer"
              >
                ⚡ Quick Demo Access (bitb2026)
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-[#1A4684] transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Portal UI
  return (
    <div className="min-h-screen bg-slate-50/80 pb-24">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all animate-fadeIn ${
            notification.type === "error"
              ? "bg-rose-600 text-white"
              : notification.type === "info"
              ? "bg-[#1A4684] text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          <span>{notification.type === "error" ? "⚠️" : "✓"}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1A4684] text-white flex items-center justify-center font-bold text-base shadow-sm">
              🐾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-[#1A4684] font-['Nunito'] leading-tight">
                  Beauty in the Beast
                </h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Salon Operations, Bookings & Transformation Gallery</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "appointments"
                  ? "bg-white text-[#1A4684] shadow-xs"
                  : "text-slate-600 hover:text-[#1A4684]"
              }`}
            >
              <span>📅 Appointments</span>
              {stats.pending > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {stats.pending}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "gallery"
                  ? "bg-white text-[#1A4684] shadow-xs"
                  : "text-slate-600 hover:text-[#1A4684]"
              }`}
            >
              <span>📸 Before & After Gallery</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {stats.galleryCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-white text-[#1A4684] shadow-xs"
                  : "text-slate-600 hover:text-[#1A4684]"
              }`}
            >
              📊 Stats
            </button>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold text-slate-600 hover:text-[#1A4684] flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>🌐 Public Site</span>
              <span className="text-[10px]">↗</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Quick Top Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</p>
              <h3 className="text-2xl font-black text-[#1A4684] font-['Nunito'] mt-0.5">{stats.total}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A4684] flex items-center justify-center text-lg font-bold">
              📋
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Pending Action</p>
              <h3 className="text-2xl font-black text-amber-600 font-['Nunito'] mt-0.5">{stats.pending}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg font-bold">
              ⏳
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Confirmed Slots</p>
              <h3 className="text-2xl font-black text-emerald-600 font-['Nunito'] mt-0.5">{stats.confirmed}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
              ✓
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-purple-200 bg-purple-50/30 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">Gallery Pairs</p>
              <h3 className="text-2xl font-black text-purple-700 font-['Nunito'] mt-0.5">{stats.galleryCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-bold">
              🖼️
            </div>
          </div>
        </div>

        {/* ----------------- TAB 1: APPOINTMENTS ----------------- */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            {/* Header / Actions Controls */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by pet name, parent, phone, breed..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#1A4684] focus:ring-1 focus:ring-[#1A4684] outline-none"
                />
                <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "all", label: "All" },
                  { id: "pending", label: "Pending" },
                  { id: "confirmed", label: "Confirmed" },
                  { id: "completed", label: "Completed" },
                  { id: "cancelled", label: "Cancelled" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      statusFilter === filter.id
                        ? "bg-[#1A4684] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Add Manual Appointment Button */}
              <button
                onClick={() => setShowAddAppointmentModal(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C6742A] text-white hover:bg-[#a85f1e] transition-colors shadow-xs flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>+ New Booking</span>
              </button>
            </div>

            {/* Appointments Table / Card List */}
            {appointmentsLoading ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <div className="w-8 h-8 border-3 border-[#1A4684] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs font-semibold text-slate-500">Loading appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
                  📭
                </div>
                <h4 className="text-base font-bold text-slate-700">No appointments found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search query or status filter."
                    : "No appointment enquiries have been submitted yet."}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-4 sm:px-6">Pet & Breed</th>
                        <th className="py-3.5 px-4 sm:px-6">Parent & Contact</th>
                        <th className="py-3.5 px-4 sm:px-6">Service Requested</th>
                        <th className="py-3.5 px-4 sm:px-6">Preferred Slot</th>
                        <th className="py-3.5 px-4 sm:px-6">Status</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredAppointments.map((app) => {
                        const payload = app.payload || {};
                        const petName = payload.petName || "Pet";
                        const petBreed = payload.petBreed || "Dog";
                        const parentName = app.name || payload.parentName || "Parent";
                        const phone = app.contact || payload.phone || "";
                        const date = payload.preferredDate || "Not specified";
                        const time = payload.preferredTime || "Flexible";
                        const service = payload.serviceType || "Grooming";
                        const cleanPhone = phone.replace(/[^0-9]/g, "");

                        const waMessage = encodeURIComponent(
                          `Hello ${parentName}! This is Mihir from Beauty in the Beast Pet Salon, Karvenagar. Regarding your booking enquiry for ${petName} (${service}) on ${date} (${time}): We would love to confirm your slot! Please let us know if this time works for you.`
                        );

                        return (
                          <tr
                            key={app.id}
                            className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                            onClick={() => setSelectedAppointment(app)}
                          >
                            {/* Pet Info */}
                            <td className="py-4 px-4 sm:px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#1A4684]/10 text-[#1A4684] font-black flex items-center justify-center text-sm font-['Nunito']">
                                  {petName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-sm text-[#1A4684] font-['Nunito']">
                                    {petName}
                                  </div>
                                  <div className="text-slate-500 text-[11px]">{petBreed}</div>
                                </div>
                              </div>
                            </td>

                            {/* Parent Info */}
                            <td className="py-4 px-4 sm:px-6">
                              <div className="font-semibold text-slate-800">{parentName}</div>
                              <div className="text-slate-500 text-[11px]">{phone}</div>
                            </td>

                            {/* Service */}
                            <td className="py-4 px-4 sm:px-6">
                              <span className="inline-block px-2.5 py-1 rounded-md bg-[#F9F1E7] text-[#C6742A] font-bold text-[11px]">
                                {service}
                              </span>
                              {payload.specialNotes && (
                                <div className="text-[10px] text-amber-700 mt-1 line-clamp-1 italic">
                                  Note: {payload.specialNotes}
                                </div>
                              )}
                            </td>

                            {/* Preferred Slot */}
                            <td className="py-4 px-4 sm:px-6">
                              <div className="font-semibold text-slate-800">{date}</div>
                              <div className="text-slate-500 text-[11px]">{time}</div>
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={app.status || "pending"}
                                onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                                className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none transition-all ${
                                  app.status === "confirmed"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                    : app.status === "completed"
                                    ? "bg-blue-50 text-blue-700 border-blue-300"
                                    : app.status === "cancelled"
                                    ? "bg-slate-100 text-slate-500 border-slate-300"
                                    : "bg-amber-50 text-amber-800 border-amber-300 animate-pulse"
                                }`}
                              >
                                <option value="pending">⏳ Pending</option>
                                <option value="confirmed">✓ Confirmed</option>
                                <option value="completed">🌟 Completed</option>
                                <option value="cancelled">✕ Cancelled</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2">
                                {phone && (
                                  <>
                                    <a
                                      href={`https://wa.me/${cleanPhone}?text=${waMessage}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      title="WhatsApp Parent"
                                      className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                    >
                                      💬
                                    </a>
                                    <a
                                      href={`tel:${cleanPhone}`}
                                      title="Call Parent"
                                      className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                    >
                                      📞
                                    </a>
                                  </>
                                )}
                                <button
                                  onClick={() => setSelectedAppointment(app)}
                                  className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-bold text-xs"
                                  title="View Details"
                                >
                                  👁️
                                </button>
                                <button
                                  onClick={() => handleDeleteAppointment(app.id, petName)}
                                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors text-xs"
                                  title="Delete Appointment"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 2: BEFORE & AFTER GALLERY ----------------- */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            {/* Gallery Control Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-[#1A4684] font-['Nunito']">
                  Before & After Transformations
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload transformation image pairs. They will automatically be positioned into the Before/After interactive slider on the public website.
                </p>
              </div>
              <button
                onClick={() => {
                  setBeforeFile(null);
                  setAfterFile(null);
                  setBeforePreviewUrl("");
                  setAfterPreviewUrl("");
                  setGalleryForm({
                    petName: "",
                    breed: "",
                    service: "Full Styling & Breed Grooming",
                    story: "",
                  });
                  setShowAddGalleryModal(true);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold bg-[#1A4684] text-white hover:bg-[#123363] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>+ Upload New Transformation Pair</span>
              </button>
            </div>

            {/* Gallery Grid */}
            {galleryLoading ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <div className="w-8 h-8 border-3 border-[#1A4684] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs font-semibold text-slate-500">Loading gallery images...</p>
              </div>
            ) : galleryItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl mx-auto">
                  🖼️
                </div>
                <h4 className="text-base font-bold text-slate-700">No transformations added yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the &quot;Upload New Transformation Pair&quot; button above to add your first before & after grooming comparison.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Interactive Slider Component */}
                      <div className="p-3 bg-slate-100/60 border-b border-slate-100">
                        <BeforeAfterSlider
                          beforeImage={item.beforeImage}
                          afterImage={item.afterImage}
                          petName={item.petName}
                          breed={item.breed}
                          service={item.service}
                          story={item.story}
                        />
                      </div>
                    </div>

                    {/* Admin Item Actions */}
                    <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
                      <div className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Pair ID:</span> {item.id}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/gallery"
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          View on Public Page ↗
                        </Link>
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id, item.petName)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        >
                          🗑️ Delete Pair
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB 3: OVERVIEW & SALON SUMMARY ----------------- */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-xl font-black text-[#1A4684] font-['Nunito']">
                Salon Daily Snapshot & Guidelines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F9F1E7]/70 border border-[#F3C097]/40 space-y-1.5">
                  <span className="text-xs font-bold text-[#C6742A] uppercase">Confirmation Protocol</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Always review pet coat description before confirming slots. For double-coated or matted pets, allocate minimum 90–120 minutes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/40 space-y-1.5">
                  <span className="text-xs font-bold text-[#1A4684] uppercase">Parent WhatsApp Communication</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Use the 💬 WhatsApp action button in the Appointments table to instantly send prefilled confirmation messages to pet parents.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1A4684] mb-3">Recent Bookings (Last 5)</h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {appointments.slice(0, 5).map((app) => (
                    <div key={app.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                      <div>
                        <span className="font-bold text-[#1A4684]">{app.payload?.petName || "Pet"}</span>{" "}
                        <span className="text-slate-500">({app.payload?.petBreed || "Dog"})</span>
                        <div className="text-[11px] text-slate-500">
                          Parent: {app.name} · {app.contact}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          app.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#1A4684] font-['Nunito']">Admin Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab("gallery");
                    setShowAddGalleryModal(true);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-[#1A4684] hover:text-white transition-all text-xs font-semibold text-slate-700 flex items-center justify-between group"
                >
                  <span>📸 Upload Before & After Pair</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("appointments");
                    setShowAddAppointmentModal(true);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-[#1A4684] hover:text-white transition-all text-xs font-semibold text-slate-700 flex items-center justify-between group"
                >
                  <span>📅 Record Offline / Phone Booking</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <Link
                  href="/gallery"
                  target="_blank"
                  className="w-full block p-3 rounded-xl bg-slate-50 hover:bg-[#1A4684] hover:text-white transition-all text-xs font-semibold text-slate-700 flex items-center justify-between group"
                >
                  <span>🌐 View Live Gallery Page</span>
                  <span className="group-hover:translate-x-1 transition-transform">↗</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600">
                  <strong>Admin PIN:</strong> <code className="font-mono bg-white px-1 rounded">bitb2026</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ----------------- MODAL: ADD BEFORE & AFTER GALLERY PAIR ----------------- */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl my-8 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-[#F9F1E7] text-[#C6742A]">
                  Double Image Upload
                </span>
                <h3 className="text-2xl font-black text-[#1A4684] font-['Nunito'] mt-1">
                  Add Before & After Transformation
                </h3>
                <p className="text-xs text-slate-500">
                  Upload both images. They will automatically be positioned into the Before/After comparison slider.
                </p>
              </div>
              <button
                onClick={() => setShowAddGalleryModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddGallerySubmit} className="space-y-6">
              {/* Dual Upload Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Before Image Upload */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A4684] flex items-center gap-1">
                      <span>1. Before Image *</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">Left Side</span>
                    </label>
                    {beforePreviewUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setBeforeFile(null);
                          setBeforePreviewUrl("");
                          if (beforeFileInputRef.current) beforeFileInputRef.current.value = "";
                        }}
                        className="text-[11px] text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={beforeFileInputRef}
                    accept="image/*"
                    onChange={handleBeforeFileChange}
                    className="hidden"
                    id="before-image-upload"
                  />

                  {beforePreviewUrl ? (
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-emerald-500 bg-slate-100 group">
                      <Image
                        src={beforePreviewUrl}
                        alt="Before Preview"
                        fill
                        className="object-cover"
                        unoptimized={beforePreviewUrl.startsWith("blob:")}
                      />
                      <div className="absolute top-2 left-2 bg-[#1A4684] text-[#F9F1E7] text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Before (Uploaded)
                      </div>
                      <button
                        type="button"
                        onClick={() => beforeFileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="before-image-upload"
                      className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 hover:border-[#1A4684] bg-slate-50 hover:bg-slate-100/80 transition-colors flex flex-col items-center justify-center p-4 cursor-pointer text-center group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-[#1A4684]/10 text-slate-600 group-hover:text-[#1A4684] flex items-center justify-center text-lg mb-2 transition-colors">
                        📸
                      </div>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-[#1A4684]">
                        Click to Upload &quot;Before&quot;
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG or WEBP (pre-grooming)</span>
                    </label>
                  )}
                </div>

                {/* 2. After Image Upload */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                      <span>2. After Image *</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">Right Side</span>
                    </label>
                    {afterPreviewUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setAfterFile(null);
                          setAfterPreviewUrl("");
                          if (afterFileInputRef.current) afterFileInputRef.current.value = "";
                        }}
                        className="text-[11px] text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={afterFileInputRef}
                    accept="image/*"
                    onChange={handleAfterFileChange}
                    className="hidden"
                    id="after-image-upload"
                  />

                  {afterPreviewUrl ? (
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-emerald-500 bg-slate-100 group">
                      <Image
                        src={afterPreviewUrl}
                        alt="After Preview"
                        fill
                        className="object-cover"
                        unoptimized={afterPreviewUrl.startsWith("blob:")}
                      />
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                        After (Uploaded)
                      </div>
                      <button
                        type="button"
                        onClick={() => afterFileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="after-image-upload"
                      className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-600 bg-slate-50 hover:bg-slate-100/80 transition-colors flex flex-col items-center justify-center p-4 cursor-pointer text-center group"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mb-2">
                        ✨
                      </div>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-700">
                        Click to Upload &quot;After&quot;
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG or WEBP (styled & fresh)</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Real-time Slider Preview if both images are present */}
              {beforePreviewUrl && afterPreviewUrl && (
                <div className="p-4 bg-[#F9F1E7]/50 rounded-2xl border border-[#F3C097]">
                  <div className="text-xs font-bold text-[#1A4684] mb-2 flex items-center gap-1.5">
                    <span>✨ Live Slider Preview:</span>
                    <span className="text-[10px] font-normal text-slate-500">(Test drag before saving)</span>
                  </div>
                  <BeforeAfterSlider
                    beforeImage={beforePreviewUrl}
                    afterImage={afterPreviewUrl}
                    petName={galleryForm.petName || "Pet Preview"}
                    breed={galleryForm.breed || "Breed"}
                    service={galleryForm.service}
                    story={galleryForm.story}
                  />
                </div>
              )}

              {/* Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pet&apos;s Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.petName}
                    onChange={(e) => setGalleryForm({ ...galleryForm, petName: e.target.value })}
                    placeholder="e.g. Milo, Oscar, Bruno, Bella"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#1A4684] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dog Breed *
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.breed}
                    onChange={(e) => setGalleryForm({ ...galleryForm, breed: e.target.value })}
                    placeholder="e.g. Shih Tzu, Lhasa Apso, Golden Retriever"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#1A4684] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Performed *
                </label>
                <select
                  value={galleryForm.service}
                  onChange={(e) => setGalleryForm({ ...galleryForm, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#1A4684] outline-none bg-white"
                >
                  <option value="Full Styling & Breed Grooming">Full Styling & Breed Grooming</option>
                  <option value="Full Styling & Matt Removal">Full Styling & Matt Removal</option>
                  <option value="De-Shedding & Teddy Face Cut">De-Shedding & Teddy Face Cut</option>
                  <option value="Bath, Blow-Dry & Coat Revival">Bath, Blow-Dry & Coat Revival</option>
                  <option value="Puppy First-Groom Introduction">Puppy First-Groom Introduction</option>
                  <option value="Precision Scissor Trim">Precision Scissor Trim</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Transformation Story / Grooming Notes
                </label>
                <textarea
                  rows={3}
                  value={galleryForm.story}
                  onChange={(e) => setGalleryForm({ ...galleryForm, story: e.target.value })}
                  placeholder="Describe the condition upon arrival and the result (e.g. arrived with matted face, restored after gentle hand scissoring)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#1A4684] outline-none resize-none"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddGalleryModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={gallerySubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1A4684] text-white hover:bg-[#123363] transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {gallerySubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Uploading & Publishing...
                    </>
                  ) : (
                    <>
                      <span>Publish Transformation</span>
                      <span>✓</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: MANUAL OFFLINE BOOKING ----------------- */}
      {showAddAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="text-xl font-black text-[#1A4684] font-['Nunito']">
                Record Offline / Phone Appointment
              </h3>
              <button
                onClick={() => setShowAddAppointmentModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualAppointment} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pet Name *</label>
                  <input
                    type="text"
                    required
                    value={manualAppointmentForm.petName}
                    onChange={(e) =>
                      setManualAppointmentForm({ ...manualAppointmentForm, petName: e.target.value })
                    }
                    placeholder="e.g. Bruno"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Breed & Age *</label>
                  <input
                    type="text"
                    required
                    value={manualAppointmentForm.petBreed}
                    onChange={(e) =>
                      setManualAppointmentForm({ ...manualAppointmentForm, petBreed: e.target.value })
                    }
                    placeholder="e.g. Golden Retriever (2y)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Name *</label>
                  <input
                    type="text"
                    required
                    value={manualAppointmentForm.parentName}
                    onChange={(e) =>
                      setManualAppointmentForm({ ...manualAppointmentForm, parentName: e.target.value })
                    }
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={manualAppointmentForm.phone}
                    onChange={(e) =>
                      setManualAppointmentForm({ ...manualAppointmentForm, phone: e.target.value })
                    }
                    placeholder="+91..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Required</label>
                <select
                  value={manualAppointmentForm.serviceType}
                  onChange={(e) =>
                    setManualAppointmentForm({ ...manualAppointmentForm, serviceType: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none bg-white"
                >
                  <option value="Full Grooming & Breed Styling">Full Grooming & Breed Styling</option>
                  <option value="Bath, Blow-Dry & De-shedding">Bath, Blow-Dry & De-shedding</option>
                  <option value="Puppy First-Groom Introduction">Puppy First-Groom Introduction</option>
                  <option value="Daycare / Day Boarding">Daycare / Day Boarding</option>
                  <option value="Intermediate Grooming Academy (Diploma)">Intermediate Grooming Academy (Diploma)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={manualAppointmentForm.preferredDate}
                    onChange={(e) =>
                      setManualAppointmentForm({ ...manualAppointmentForm, preferredDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={manualAppointmentForm.preferredTime}
                    onChange={(e) =>
                      setManualAppointmentForm({ ...manualAppointmentForm, preferredTime: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none bg-white"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Evening (4:00 PM – 7:30 PM)">Evening (4:00 PM – 7:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Notes / Requests</label>
                <textarea
                  rows={2}
                  value={manualAppointmentForm.specialNotes}
                  onChange={(e) =>
                    setManualAppointmentForm({ ...manualAppointmentForm, specialNotes: e.target.value })
                  }
                  placeholder="e.g. Nervous with nails, matting on legs..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#1A4684] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddAppointmentModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#1A4684] text-white font-bold hover:bg-[#123363]"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: APPOINTMENT DETAIL DRAWER ----------------- */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl my-8 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-[#1A4684]">
                  Appointment Enquiry Details
                </span>
                <h3 className="text-xl font-black text-[#1A4684] font-['Nunito'] mt-1">
                  {selectedAppointment.payload?.petName || selectedAppointment.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Pet Name & Breed</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">
                    {selectedAppointment.payload?.petName || "N/A"}
                  </p>
                  <p className="text-slate-600 text-[11px]">{selectedAppointment.payload?.petBreed || "N/A"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Parent Name</span>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">
                    {selectedAppointment.name || selectedAppointment.payload?.parentName || "N/A"}
                  </p>
                  <p className="text-slate-600 text-[11px]">{selectedAppointment.contact || "N/A"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Service</span>
                  <p className="font-bold text-[#C6742A] mt-0.5">
                    {selectedAppointment.payload?.serviceType || "Grooming"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Preferred Date & Time</span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {selectedAppointment.payload?.preferredDate || "Flexible"}
                  </p>
                  <p className="text-slate-500">{selectedAppointment.payload?.preferredTime || ""}</p>
                </div>
              </div>

              {selectedAppointment.payload?.email && (
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Email Address</span>
                  <p className="font-semibold text-slate-700">{selectedAppointment.payload?.email}</p>
                </div>
              )}

              {selectedAppointment.payload?.coatCondition && (
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Coat Condition</span>
                  <p className="font-semibold text-slate-700 bg-amber-50 p-2 rounded-lg border border-amber-200 text-[11px]">
                    {selectedAppointment.payload?.coatCondition}
                  </p>
                </div>
              )}

              {selectedAppointment.payload?.specialNotes && (
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Special Notes</span>
                  <p className="font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
                    {selectedAppointment.payload?.specialNotes}
                  </p>
                </div>
              )}

              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Submitted At</span>
                <p className="text-slate-500 text-[11px]">
                  {selectedAppointment.submittedAt
                    ? new Date(selectedAppointment.submittedAt).toLocaleString("en-IN")
                    : "Recently"}
                </p>
              </div>

              {/* Status Selector */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Update Booking Status:</span>
                <select
                  value={selectedAppointment.status || "pending"}
                  onChange={(e) => handleUpdateStatus(selectedAppointment.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-bold bg-white"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="confirmed">✓ Confirmed</option>
                  <option value="completed">🌟 Completed</option>
                  <option value="cancelled">✕ Cancelled</option>
                </select>
              </div>

              {/* Quick Communication Buttons */}
              <div className="pt-3 grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${(selectedAppointment.contact || "").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-center hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>💬 WhatsApp</span>
                </a>
                <a
                  href={`tel:${selectedAppointment.contact}`}
                  className="py-2.5 px-4 rounded-xl bg-[#1A4684] text-white font-bold text-center hover:bg-[#123363] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>📞 Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
