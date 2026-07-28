import AddPetForm from "../components/pets/add-pet-form";

export default function AddPetPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-5xl font-bold text-[#445D42]">
          Add New Pet
        </h1>

        <p className="mt-3 text-gray-600">
          Create a profile for your furry friend.
        </p>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <AddPetForm />
        </div>
      </section>
    </div>
  );
}