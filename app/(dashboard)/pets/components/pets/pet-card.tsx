import Image from "next/image";

type PetCardProps = {
  pet: {
    name: string;
    breed: string;
    age: number;
    weight: number;
    gender: string;
    lastGrooming: string | null;
    vaccinated: string;
    medicalNotes: string;
    groomingPreferences: string;
    image: string;
  };
};

export default function PetCard({ pet }: PetCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-md">

      {/* Pet Image */}
      <div className="relative h-60 w-full">
        <Image
          src={pet.image}
          alt={pet.name}
          fill
          className="object-cover"
        />
      </div>


      {/* Pet Information */}
      <div className="space-y-4 p-6">

        <h2 className="text-2xl font-bold">
          {pet.name}
        </h2>


        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>
            <p className="font-semibold text-gray-600">
              Breed
            </p>
            <p>{pet.breed}</p>
          </div>


          <div>
            <p className="font-semibold text-gray-600">
              Gender
            </p>
            <p>{pet.gender}</p>
          </div>


          <div>
            <p className="font-semibold text-gray-600">
              Age
            </p>
            <p>{pet.age} years</p>
          </div>


          <div>
            <p className="font-semibold text-gray-600">
              Weight
            </p>
            <p>{pet.weight} kg</p>
          </div>


          <div>
            <p className="font-semibold text-gray-600">
              Vaccination
            </p>
            <p>{pet.vaccinated}</p>
          </div>


          <div>
            <p className="font-semibold text-gray-600">
              Last Grooming
            </p>
            <p>
              {pet.lastGrooming || "Not available"}
            </p>
          </div>

        </div>


        {/* Medical Information */}
        <div>
          <p className="font-semibold text-gray-600">
            Medical Notes
          </p>

          <p className="rounded-lg bg-gray-100 p-3">
            {pet.medicalNotes || "No medical notes"}
          </p>
        </div>


        {/* Grooming Preferences */}
        <div>
          <p className="font-semibold text-gray-600">
            Grooming Preferences
          </p>

          <p className="rounded-lg bg-gray-100 p-3">
            {pet.groomingPreferences || "No preferences added"}
          </p>
        </div>


      </div>

    </div>
  );
}