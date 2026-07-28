"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { handleCreateBooking } from "@/lib/actions/booking-action";

export default function BookingSummaryPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState("");

  const booking = {
    // bookingId: params.get("bookingId") || "",
    serviceId: params.get("serviceId") || "",
    serviceName: params.get("serviceName") || "",
    ownerName: params.get("ownerName") || "",
    petName: params.get("petName") || "",
    phone: params.get("phone") || "",
    date: params.get("appointmentDate") || "",
    time: params.get("appointmentTime") || "",
    notes: params.get("notes") || "",
  };

 
  const servicePrice =
  Number(params.get("servicePrice")) || 0;

const serviceDuration =
  params.get("serviceDuration") || "";

  const handleContinue = async () => {
  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  if (paymentMethod === "cash") {
    // Direct booking for cash payment

    const response = await handleCreateBooking({
      serviceId: booking.serviceId,
      ownerName: booking.ownerName,
      petName: booking.petName,
      phone: booking.phone,
      appointmentDate: booking.date,
      appointmentTime: booking.time,
      notes: booking.notes,
       amount: servicePrice,
        paymentMethod:
      paymentMethod === "cash"
      ? "cash"
      : "khalti",


    paymentStatus:
      paymentMethod === "cash"
      ? "pending"
      : "pending",

    });

    if (!response.success) {
      alert(response.message);
      return;
    }

    const bookingId = response.data._id;



  // Cash payment

  if(paymentMethod === "cash"){

    alert("Booking confirmed! Please pay cash during your appointment.");

    router.push("/bookings");}

  } else {

 const response = await handleCreateBooking({
    serviceId: booking.serviceId,
    ownerName: booking.ownerName,
    petName: booking.petName,
    phone: booking.phone,
    appointmentDate: booking.date,
    appointmentTime: booking.time,
    notes: booking.notes,

    amount: servicePrice,
    paymentMethod: "khalti",
    paymentStatus: "pending",
  });
 if (!response.success) {
    alert(response.message);
    return;
  }


  const bookingId = response.data._id;


  const query = new URLSearchParams({
    bookingId: bookingId,
    serviceName: booking.serviceName,
    servicePrice: servicePrice.toString(),
  });




    router.push(
      `/payment?${query.toString()}`
    );

  }

};
  return (
    <div className="min-h-screen bg-[#F8F6F1] py-12 px-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-[#445D42]">
          Booking Summary
        </h1>

        <p className="mt-2 text-gray-500">
          Please review your booking before continuing.
        </p>

        <div className="mt-8 space-y-4">

          <div className="rounded-xl border p-5">
            <h2 className="font-bold text-lg text-[#445D42]">
              Owner Details
            </h2>

            <p><strong>Name:</strong> {booking.ownerName}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
          </div>

          <div className="rounded-xl border p-5">
            <h2 className="font-bold text-lg text-[#445D42]">
              Pet Details
            </h2>

            <p><strong>Pet Name:</strong> {booking.petName}</p>
          </div>

          <div className="rounded-xl border p-5">
            <h2 className="font-bold text-lg text-[#445D42]">
              Service Details
            </h2>

           <p>
             <strong>Service:</strong> {booking.serviceName}
                 </p>

                 <p>
             <strong>Duration:</strong> {serviceDuration} minutes
              </p>

                 <p>
              <strong>Price:</strong> Rs. {servicePrice}
               </p>
          </div>

          <div className="rounded-xl border p-5">
            <h2 className="font-bold text-lg text-[#445D42]">
              Appointment
            </h2>

            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>

            {booking.notes && (
              <p><strong>Notes:</strong> {booking.notes}</p>
            )}
          </div>

          <div className="rounded-xl border p-5">

            <h2 className="font-bold text-lg text-[#445D42]">
              Total Amount
            </h2>

            <p className="mt-2 text-2xl font-bold text-[#445D42]">
              Rs. {servicePrice}
            </p>

          </div>

          <div className="rounded-xl border p-5">

            <h2 className="font-bold text-lg text-[#445D42]">
              Payment Method
            </h2>

            <div className="mt-4 space-y-3">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Cash Payment
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Online Payment
              </label>

            </div>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() => router.back()}
              className="flex-1 rounded-lg border border-[#445D42] py-3 font-semibold text-[#445D42]"
            >
              Back
            </button>

            <button
              onClick={handleContinue}
              className="flex-1 rounded-lg bg-[#445D42] py-3 font-semibold text-white"
            >
              Continue
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}