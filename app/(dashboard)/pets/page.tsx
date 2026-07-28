import { Plus } from "lucide-react";
import { handleGetPets } from "@/lib/actions/pet-action";

import AddPetCard from "./components/pets/add-pet-card";
import PetCard from "./components/pets/pet-card";
import SearchBar from "./components/pets/search-bar";
import Link from "next/link";

export default async function PetsPage() {
  // const pets = [
  //   {
  //     id: 1,
  //     name: "Cooper",
  //     breed: "Golden Retriever",
  //     image: "/img1.png",
  //     age: "3 Years",
  //     weight: "28kg",
  //     grooming: "Aug 24, 2024",
  //     vaccinated: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Luna",
  //     breed: "Pomeranian",
  //     image: "/img2.png",
  //     age: "2 Years",
  //     weight: "4.5kg",
  //     grooming: "Jul 12, 2024",
  //     vaccinated: false,
  //   },
  // ];
  const result = await handleGetPets();
  const pets = result.data || [];

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <section className="mx-auto max-w-7xl px-6 py-8">

        {/* Top Bar */}

        <div className="flex items-center justify-between">
          <SearchBar />

          <button className="flex items-center gap-2 rounded-xl bg-[#445D42] px-5 py-3 text-white">
            
            <Link
                  href="/pets/new"
                 className="flex items-center gap-2 rounded-xl bg-[#445D42] px-5 py-3 text-white"
>
                     <Plus size={18} />
                      Add New Pet
                        </Link>
          </button>
        </div>

        {/* Header */}

        <div className="mt-14">
          <h1 className="text-5xl font-bold text-[#445D42]">
            My Pets
          </h1>

          <p className="mt-3 text-gray-500">
            Manage profiles, health records, and preferences for your furry family.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {pets.map((pet: any) => (
    <PetCard key={pet._id} pet={pet} />
         ))}

          <AddPetCard />
        </div>
      </section>

      {/* Floating Button */}

      <button className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#445D42] text-white shadow-xl">
        
        <Plus size={28} />
      </button>
    </div>
  );
}