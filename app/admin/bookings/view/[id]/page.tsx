"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { handleGetBookingById } from "@/lib/actions/booking-action";


export default function AdminBookingViewPage(){

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [booking,setBooking] = useState<any>(null);


  useEffect(()=>{

    const loadBooking = async()=>{

      const response = await handleGetBookingById(id);

      if(response.success){
        setBooking(response.data);
      }
      else{
        alert(response.message);
      }

    };


    loadBooking();

  },[id]);



  if(!booking){

    return (
      <div className="p-10">
        Loading booking...
      </div>
    )

  }



  return (

    <div className="min-h-screen bg-[#F8F6F1] p-10">


      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">


        <h1 className="text-3xl font-bold text-[#445D42]">
          Booking Details
        </h1>



        <div className="mt-8 space-y-4">


          <p>
            <b>User:</b>{" "}
            {booking.userId?.name}
          </p>


          <p>
            <b>Email:</b>{" "}
            {booking.userId?.email}
          </p>


          <p>
            <b>Service:</b>{" "}
            {booking.serviceId?.name}
          </p>


          <p>
            <b>Pet:</b>{" "}
            {booking.petName}
          </p>


          <p>
            <b>Owner:</b>{" "}
            {booking.ownerName}
          </p>


          <p>
            <b>Phone:</b>{" "}
            {booking.phone}
          </p>


          <p>
            <b>Date:</b>{" "}
            {new Date(
              booking.appointmentDate
            ).toLocaleDateString()}
          </p>


          <p>
            <b>Time:</b>{" "}
            {booking.appointmentTime}
          </p>


          <p>
            <b>Status:</b>{" "}
            {booking.status}
          </p>


          <p>
            <b>Payment:</b>{" "}
            {booking.paymentStatus}
          </p>


        </div>



        <button
          onClick={()=>router.push(`/admin/bookings/edit/${id}`)}
          className="
          mt-8 rounded-xl 
          bg-[#445D42]
          px-6 py-3
          text-white
          "
        >
          Update Booking
        </button>


      </div>


    </div>

  )

}