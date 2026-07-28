"use client";

import { useEffect, useState } from "react";
import { handleGetAllBookings } from "@/lib/actions/booking-action";
import { useRouter } from "next/navigation";

export default function AdminBookingsPage() {

  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const loadBookings = async () => {

    setLoading(true);

    const response = await handleGetAllBookings();

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




  const statusColor = (status:string)=>{

    switch(status){

      case "confirmed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";


      default:
        return "bg-gray-100 text-gray-700";

    }

  };




  if(loading){

    return (

      <div className="flex min-h-screen items-center justify-center">

        Loading bookings...

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-[#F8F6F1] px-8 py-10">


      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-[#445D42]">

          All Bookings

        </h1>


        <p className="mt-2 text-gray-600">

          Manage all customer appointments.

        </p>

      </div>




      {
        bookings.length === 0 ? (

          <div className="rounded-xl bg-white p-8 text-center shadow">

            No bookings found.

          </div>

        )

        :

        (

          <div className="grid gap-6 md:grid-cols-2">


          {
            bookings.map((booking)=>(


              <div

              key={booking._id}

              className="rounded-2xl bg-white p-6 shadow"

              >



                <div className="flex items-center justify-between">


                  <h2 className="text-xl font-bold">

                    {booking.serviceId?.name || "Service"}

                  </h2>



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

                    <strong>User:</strong>{" "}

                    {booking.userId?.name || "Unknown"}

                  </p>



                  <p>

                    <strong>Email:</strong>{" "}

                    {booking.userId?.email || "-"}

                  </p>



                  <p>

                    <strong>Pet:</strong>{" "}

                    {booking.petName}

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

                    <strong>Amount:</strong>{" "}

                    Rs. {booking.amount}

                  </p>




                  <p>

                    <strong>Payment:</strong>{" "}

                    {booking.paymentStatus}

                  </p>


                </div>





                <div className="mt-6 flex gap-3">


  <button
    onClick={() =>
      router.push(
        `/admin/bookings/view/${booking._id}`
      )
    }
    className="
      rounded-lg
      bg-[#445D42]
      px-5
      py-2
      text-sm
      font-semibold
      text-white
      transition
      hover:bg-[#354832]
    "
  >
    View
  </button>


  <button
    onClick={() =>
      router.push(
        `/admin/bookings/edit/${booking._id}`
      )
    }
    className="
      rounded-lg
      border
      border-[#445D42]
      px-5
      py-2
      text-sm
      font-semibold
      text-[#445D42]
      transition
      hover:bg-[#445D42]
      hover:text-white
    "
  >
    Edit
  </button>


</div>


              </div>


            ))
          }


          </div>

        )

      }


    </div>

  );

}