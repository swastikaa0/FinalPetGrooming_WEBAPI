"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { handleGetBookingById } from "@/lib/actions/booking-action";


export default function ViewBookingPage() {

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;


  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  const loadBooking = async () => {

    const response = await handleGetBookingById(id);


    if(response.success){
      setBooking(response.data);
    }
    else{
      alert(response.message);
      router.push("/bookings");
    }


    setLoading(false);
  };



  useEffect(() => {
    loadBooking();
  }, []);



  if(loading){
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading booking...
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-[#F8F6F1] px-8 py-10">


      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">


        <div className="mb-8 flex justify-between items-center">


          <h1 className="text-3xl font-bold text-[#445D42]">
            Booking Details
          </h1>


          <button
            onClick={() => router.back()}
            className="rounded-lg border px-5 py-2"
          >
            Back
          </button>


        </div>



        <div className="space-y-5 text-gray-700">


          <p>
            <strong>Service:</strong>{" "}
            {booking.service}
          </p>


          <p>
            <strong>Pet Name:</strong>{" "}
            {booking.petName}
          </p>


          <p>
            <strong>Owner Name:</strong>{" "}
            {booking.ownerName}
          </p>


          <p>
            <strong>Phone:</strong>{" "}
            {booking.phone}
          </p>


          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              booking.appointmentDate
            ).toLocaleDateString()}
          </p>


          <p>
            <strong>Time:</strong>{" "}
            {booking.appointmentTime}
          </p>


          <p>
            <strong>Status:</strong>{" "}
            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
              {booking.status}
            </span>
          </p>



          <p>
            <strong>Notes:</strong>{" "}
            {booking.notes || "No notes provided"}
          </p>


        </div>



      </div>


    </div>

  );
}