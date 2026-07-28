"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { handleGetActiveServices } from "@/lib/actions/service-action";

import RecommendationForm from "../../(dashboard)/recommendations/_components/RecommendationForm";
import RecommendationModal from "../../(dashboard)/recommendations/_components/RecommendationModal";


export default function ServicesPage(){

const router = useRouter();

const [services, setServices] = useState<any[]>([]);
const [openRecommendation, setOpenRecommendation] = useState(false);
useEffect(() => {
  loadServices();
}, []);

const loadServices = async () => {
  const result = await handleGetActiveServices();

  if (result.success) {
    setServices(result.data);
  }
};

return (

<div className="min-h-screen bg-[#faf9f6] px-10 py-12">


{/* Header */}

<div className="mb-12 flex justify-between items-center">


<div>

<h1 className="text-4xl font-bold">
Pet Grooming Services
</h1>


<p className="mt-3 text-gray-600">
Professional grooming and healthcare services
for your pets.
</p>

</div>



<button
onClick={()=>router.push("/bookings")}
className="rounded-xl bg-[#445D42] px-6 py-3 text-white"
>
View Bookings
</button>


</div>

{/* AI Recommendation */}

{/* AI Recommendation */}

<div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[#445D42] to-[#6A8A67] p-10 text-white shadow-xl">

  <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

    <div>

      <h2 className="text-3xl font-bold">
         AI Grooming Assistant
      </h2>

      <p className="mt-3 max-w-xl text-green-100">
        Not sure which grooming service is best for your pet?
        Answer a few simple questions and our AI assistant
        will recommend the most suitable services.
      </p>

    </div>

    <button
      onClick={() => setOpenRecommendation(true)}
      className="rounded-xl bg-white px-8 py-4 font-semibold text-[#445D42] shadow-lg transition hover:scale-105"
    >
       Get AI Recommendation
    </button>

  </div>

</div>



{/* Service Cards */}

<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


{
services.map((service)=>(

<div
key={service._id}
className="overflow-hidden rounded-2xl border bg-white shadow-sm"
>


<div className="relative h-60">


<Image
src={`http://localhost:5000${service.image}`}
alt={service.name}
fill
className="object-cover"
/>


</div>



<div className="p-6">


<div className="flex justify-between">

<h2 className="text-xl font-bold">
{service.name}
</h2>


<span>
 Rs{service.price}
</span>


</div>



<p className="mt-4 text-gray-600">
{service.description}
</p>



<button

onClick={() =>
  router.push(
    `/bookings/new?serviceId=${service._id}&serviceName=${encodeURIComponent(service.name)}&servicePrice=${service.price}&serviceDuration=${service.duration}`
  )
}

className="mt-6 w-full rounded-xl bg-[#445D42] py-3 text-white"

>
Book Service
</button>


</div>


</div>


))
}


</div>
<RecommendationModal
  isOpen={openRecommendation}
  onClose={() => setOpenRecommendation(false)}
  title="AI Grooming Assistant"
>
  <RecommendationForm
    onClose={() => setOpenRecommendation(false)}
  />
</RecommendationModal>


</div>

)

}