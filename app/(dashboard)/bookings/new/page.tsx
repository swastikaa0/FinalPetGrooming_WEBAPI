"use client";
import { ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { handleCreateBooking } from "@/lib/actions/booking-action";


export default function NewBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId") || "";
const serviceName = searchParams.get("serviceName") || "";
const servicePrice = searchParams.get("servicePrice") || "";
const serviceDuration = searchParams.get("serviceDuration") || "";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
    const query = new URLSearchParams({
      serviceId: serviceId,
      serviceName,
    servicePrice,
    serviceDuration,
      ownerName: formData.ownerName,
      petName: formData.petName,
      phone: formData.phone,
      appointmentDate: formData.date,
      appointmentTime: formData.time,
      notes: formData.notes,
    });
    
router.push(`/bookings/summary?${query.toString()}`);

  } catch (error) {
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
   
};

 return (
  <div className="min-h-screen bg-[#F8F6F1] py-12 px-6">
    <div className="mx-auto max-w-3xl">

      {/* Back Button */}
      <button
        onClick={() => router.push("/services")}
        className="mb-6 flex items-center gap-2 text-[#445D42] font-medium hover:text-[#354832] transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Services
      </button>

      {/* Booking Card */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[#445D42]">
          Book an Appointment
        </h1>

        <p className="mt-2 text-gray-500">
          Fill out the details below to schedule your pet's appointment.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Selected Service */}
          <div>
            <label className="mb-2 block font-semibold">
              Selected Service
            </label>

            <input
              type="text"
              value={serviceName}
              readOnly
              className="w-full rounded-lg border bg-gray-100 px-4 py-3"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="mb-2 block font-semibold">
              Owner Name
            </label>

            <input
              type="text"
              name="ownerName"
              required
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter owner's name"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#445D42]"
            />
          </div>

          {/* Pet Name */}
          <div>
            <label className="mb-2 block font-semibold">
              Pet Name
            </label>

            <input
              type="text"
              name="petName"
              required
              value={formData.petName}
              onChange={handleChange}
              placeholder="Enter pet name"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#445D42]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block font-semibold">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#445D42]"
            />
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block font-semibold">
              Appointment Date
            </label>

           <input
                type="date"
                 name="date"
                  required
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                 onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#445D42]"
/>
          </div>

          {/* Time */}
          <div>
            <label className="mb-2 block font-semibold">
              Appointment Time
            </label>

            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#445D42]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block font-semibold">
              Additional Notes
            </label>

            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special instructions..."
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#445D42]"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg border border-[#445D42] py-3 font-semibold text-[#445D42] hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-[#445D42] py-3 font-semibold text-white hover:bg-[#354832] disabled:opacity-50"
                  >
                  {loading ? "Booking..." : "Confirm Booking"}
</button>
          </div>

        </form>
      </div>
    </div>
  </div>
);
}