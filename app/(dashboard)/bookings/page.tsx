"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  handleGetMyBookings,
  handleCancelBooking,
} from "@/lib/actions/booking-action";

export default function BookingsPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);

    const response = await handleGetMyBookings();

    if (response.success) {
      setBookings(response.data);
    } else {
      alert(response.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === "pending" ||
      booking.status === "confirmed"
  );

  const previousBookings = bookings.filter(
    (booking) =>
      booking.status === "completed" ||
      booking.status === "cancelled"
  );


  const handleCancel = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    const response = await handleCancelBooking(id);

    if (response.success) {
      alert("Booking cancelled.");
      loadBookings();
    } else {
      alert(response.message);
    }
  };


  const statusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading bookings...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F8F6F1] px-8 py-10">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#445D42]">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-600">
            View your upcoming and previous appointments.
          </p>
        </div>

        <button
          onClick={() => router.push("/services")}
          className="rounded-xl bg-[#445D42] px-6 py-3 text-white hover:bg-[#354832]"
        >
          Book Service
        </button>
      </div>


      {/* Upcoming */}
      <div className="mb-12">

        <h2 className="mb-6 text-2xl font-semibold text-[#445D42]">
          Upcoming Appointments
        </h2>


        {upcomingBookings.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center shadow">
            No upcoming appointments.
          </div>
        ) : (

          <div className="grid gap-6 md:grid-cols-2">

            {upcomingBookings.map((booking) => (

              <div
                key={booking._id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    {booking.service}
                  </h3>


                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>


                <div className="mt-5 space-y-2 text-gray-600">

                  <p>
                    <strong>Pet:</strong> {booking.petName}
                  </p>


                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      booking.appointmentDate
                    ).toLocaleDateString()}
                  </p>


                  <p>
                    <strong>Time:</strong> {booking.appointmentTime}
                  </p>

                </div>


                <div className="mt-6 grid grid-cols-3 gap-3">


                  <button
                    onClick={() =>
                      router.push(
                        `/bookings/view/${booking._id}`
                      )
                    }
                    className="rounded-lg bg-[#445D42] py-3 text-sm font-semibold text-white transition hover:bg-[#354832]"
                  >
                    View
                  </button>


                  <button
                    onClick={() =>
                      router.push(
                        `/bookings/edit/${booking._id}`
                      )
                    }
                    className="rounded-lg border border-[#445D42] py-3 text-sm font-semibold text-[#445D42] transition hover:bg-[#445D42] hover:text-white"
                  >
                    Reschedule
                  </button>


                  <button
                    onClick={() =>
                      handleCancel(booking._id)
                    }
                    className="rounded-lg bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Cancel
                  </button>


                </div>

              </div>

            ))}

          </div>

        )}

      </div>



      {/* Previous */}
      <div>

        <h2 className="mb-6 text-2xl font-semibold text-[#445D42]">
          Previous Appointments
        </h2>


        {previousBookings.length === 0 ? (

          <div className="rounded-xl bg-white p-6 text-center shadow">
            No previous appointments.
          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2">

            {previousBookings.map((booking) => (

              <div
                key={booking._id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    {booking.service}
                  </h3>


                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>


                <div className="mt-5 space-y-2 text-gray-600">

                  <p>
                    <strong>Pet:</strong> {booking.petName}
                  </p>


                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      booking.appointmentDate
                    ).toLocaleDateString()}
                  </p>

                </div>


                <button
                  onClick={() =>
                    router.push(
                      `/bookings/view/${booking._id}`
                    )
                  }
                  className="mt-6 w-full rounded-lg border border-[#445D42] py-3 text-[#445D42] hover:bg-[#445D42] hover:text-white"
                >
                  View Details
                </button>


              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}