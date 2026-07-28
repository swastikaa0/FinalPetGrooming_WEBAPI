"use client";


import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";

import {
 handleGetBookingById,
 handleAdminUpdateBooking,
 handleAdminDeleteBooking
} from "@/lib/actions/booking-action";



export default function AdminEditBookingPage(){


const params = useParams();
const router = useRouter();

const id=params.id as string;


const [status,setStatus]=useState("");
const [loading,setLoading]=useState(true);



useEffect(()=>{


const load=async()=>{

 const response =
 await handleGetBookingById(id);


 if(response.success){

   setStatus(
    response.data.status
   );

 }

 setLoading(false);

}


load();


},[id]);





const updateBooking=async()=>{


const response =
await handleAdminUpdateBooking(
 id,
 {
   status
 }
);



if(response.success){

 alert("Booking updated");

 router.push("/admin/bookings");

}
else{

 alert(response.message);

}


};






const deleteBooking=async()=>{


const confirmDelete =
window.confirm(
 "Delete this booking?"
);


if(!confirmDelete)
return;



const response =
await handleAdminDeleteBooking(id);



if(response.success){

 alert("Booking deleted");

 router.push("/admin/bookings");

}
else{

 alert(response.message);

}


};




if(loading){

return <p className="p-10">
Loading...
</p>

}



return (

<div className="min-h-screen bg-[#F8F6F1] p-10">


<div className="mx-auto max-w-xl bg-white rounded-2xl shadow p-8">


<h1 className="text-3xl font-bold text-[#445D42]">
Update Booking
</h1>



<label className="block mt-6 mb-2 font-semibold">
Status
</label>


<select

value={status}

onChange={(e)=>
setStatus(e.target.value)
}

className="
w-full rounded-lg 
border p-3
"

>


<option value="pending">
Pending
</option>


<option value="confirmed">
Confirmed
</option>


<option value="completed">
Completed
</option>


<option value="cancelled">
Cancelled
</option>


</select>



<button

onClick={updateBooking}

className="
mt-6 w-full
rounded-xl
bg-[#445D42]
py-3
text-white
"

>
Save Changes
</button>




<button

onClick={deleteBooking}

className="
mt-4 w-full
rounded-xl
bg-red-500
py-3
text-white
"

>
Delete Booking
</button>



</div>


</div>


)


}