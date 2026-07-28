"use client";

import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";


export default function PaymentSuccessPage(){

const params = useSearchParams();
const router = useRouter();


useEffect(()=>{

verifyPayment();

},[]);



const verifyPayment = async()=>{

try{


const pidx =
params.get("pidx");


const token =
localStorage.getItem("token");



const response =
await axios.post(

"http://localhost:5000/api/v1/payment/khalti/verify",

{
pidx
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



console.log(response.data);


alert(
"Payment verified successfully"
);



router.push("/bookings");



}
catch(error){

console.log(error);

alert(
"Payment verification failed"
);

}


};



return(

<div className="min-h-screen flex items-center justify-center">

<h1 className="text-3xl font-bold">
Verifying Payment...
</h1>


</div>

);


}