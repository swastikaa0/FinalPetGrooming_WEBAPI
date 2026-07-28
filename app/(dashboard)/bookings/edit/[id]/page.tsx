"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


import {
  handleGetBookingById,
  handleUpdateBooking,
} from "@/lib/actions/booking-action";



export default function EditBookingPage(){


  const params = useParams();
  const router = useRouter();


  const id = params.id as string;



  const [loading,setLoading] = useState(true);



  const [form,setForm] = useState({

    appointmentDate:"",
    appointmentTime:"",
    notes:"",
    status:"confirmed"

  });



  const loadBooking = async()=>{


    const response = await handleGetBookingById(id);



    if(response.success){


      const booking=response.data;


      setForm({

        appointmentDate:
          booking.appointmentDate.split("T")[0],

        appointmentTime:
          booking.appointmentTime,

        notes:
          booking.notes || "",

       status:
    booking.status

      });


    }
    else{

      alert(response.message);
      router.push("/bookings");

    }



    setLoading(false);

  };




  useEffect(()=>{

    loadBooking();

  },[]);





  const handleChange=(e:any)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };






  const handleSubmit=async(e:any)=>{


    e.preventDefault();



    const response =
  await handleUpdateBooking(
    id,
    {
      ...form,
      status:"confirmed"
    }
  );



    if(response.success){

      alert(
        "Booking updated successfully"
      );


      router.push("/bookings");

    }
    else{

      alert(response.message);

    }


  };




  if(loading){

    return(
      <div className="flex min-h-screen items-center justify-center">
        Loading booking...
      </div>
    );

  }





  return(

    <div className="min-h-screen bg-[#F8F6F1] px-8 py-10">


      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">


        <h1 className="mb-8 text-3xl font-bold text-[#445D42]">
          Reschedule Booking
        </h1>



        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          <div>

            <label className="font-semibold">
              Appointment Date
            </label>


            <input

              type="date"

              name="appointmentDate"

              value={
                form.appointmentDate
              }

              onChange={handleChange}

              className="mt-2 w-full rounded-lg border p-3"

            />

          </div>





          <div>

            <label className="font-semibold">
              Appointment Time
            </label>


            <input

              type="time"

              name="appointmentTime"

              value={
                form.appointmentTime
              }

              onChange={handleChange}

              className="mt-2 w-full rounded-lg border p-3"

            />

          </div>





          <div>

            <label className="font-semibold">
              Notes
            </label>


            <textarea

              name="notes"

              value={form.notes}

              onChange={handleChange}

              className="mt-2 w-full rounded-lg border p-3"

              rows={4}

            />

          </div>





          <div className="flex gap-4">


            <button

              type="button"

              onClick={()=>router.back()}

              className="w-1/2 rounded-lg border py-3"

            >
              Cancel
            </button>



            <button

              type="submit"

              className="w-1/2 rounded-lg bg-[#445D42] py-3 text-white"

            >
              Update Booking
            </button>



          </div>



        </form>



      </div>


    </div>

  );

}