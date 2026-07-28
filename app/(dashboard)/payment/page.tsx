"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {

  const router = useRouter();
  const params = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("");

  const booking = {
    bookingId: params.get("bookingId") || "",
    serviceId: params.get("serviceId") || "",
    serviceName: params.get("serviceName") || "",
    ownerName: params.get("ownerName") || "",
    petName: params.get("petName") || "",
    phone: params.get("phone") || "",
    date: params.get("date") || "",
    time: params.get("time") || "",
    notes: params.get("notes") || "",
  };


  const servicePrice =
    Number(params.get("servicePrice")) || 0;



  const handlePayment = async () => {
console.log("PAY BUTTON CLICKED");
    if (!paymentGateway) {
      alert("Please select payment method");
      return;
    }


    setLoading(true);


    try {

      

      let url = "";


      if(paymentGateway === "khalti"){

        url =
        "http://localhost:5000/api/v1/payment/khalti";

      }
      else{

        url =
        "http://localhost:5000/api/v1/payment/esewa";

      }

     console.log("Sending request:", url);

      const response = await axios.post(
   url,
  {
    amount: servicePrice,
    bookingId: booking.bookingId,
    serviceName: booking.serviceName,
  },
  {
    withCredentials: true,
  }
);



      if(paymentGateway==="khalti"){

        const paymentUrl =
        response.data.data.payment_url;


        if(paymentUrl){

          window.location.href = paymentUrl;

        }

      }



      if(paymentGateway==="esewa"){

        alert("eSewa payment started");

        console.log(response.data);

      }



    }


    catch(error:any){

     console.log(
   "Payment Error:",
   error.response?.data
 );

 alert(
   error.response?.data?.message ||
   "Payment initiation failed"
 );
    }
    finally{

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-[#F8F6F1] px-6 py-12">


      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-3xl font-bold text-[#445D42]">
          Online Payment
        </h1>


        <p className="mt-3 text-gray-600">
          Complete your payment to confirm your appointment.
        </p>



        <div className="mt-8 rounded-xl border p-5">


          <h2 className="font-bold text-lg">
            Payment Details
          </h2>


          <p className="mt-3">
            <strong>Service:</strong> {booking.serviceName}
          </p>


          <p>
            <strong>Amount:</strong> Rs. {servicePrice}
          </p>


        </div>



        <div className="mt-6 rounded-xl border p-5">


          <h2 className="font-bold text-lg">
            Select Payment Method
          </h2>



          <label className="mt-4 flex gap-2">

            <input
              type="radio"
              name="payment"
              value="khalti"
              onChange={(e)=>
                setPaymentGateway(e.target.value)
              }
            />

            Khalti

          </label>




          <label className="mt-3 flex gap-2">

            <input
              type="radio"
              name="payment"
              value="esewa"
              onChange={(e)=>
                setPaymentGateway(e.target.value)
              }
            />

            eSewa

          </label>


        </div>




        <button

          onClick={handlePayment}

          disabled={loading}

          className="
          mt-8 w-full rounded-xl 
          bg-[#445D42] py-3 
          font-semibold text-white
          disabled:opacity-50
          "

        >

          {
            loading 
            ? "Processing..."
            : "Pay Now"
          }

        </button>




        <button

          onClick={() => router.back()}

          className="
          mt-4 w-full rounded-xl 
          border border-[#445D42] 
          py-3 font-semibold 
          text-[#445D42]
          "

        >

          Cancel

        </button>



      </div>


    </div>

  );
}