import Link from "next/link";
import { Plus } from "lucide-react";

export default function AddPetCard() {
  return (
    <Link
      href="/pets/new"
      className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white transition hover:border-[#445D42]"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF2EA]">
        <Plus size={34} className="text-[#445D42]" />
      </div>

      <h2 className="mt-8 text-2xl font-semibold text-[#445D42]">
        Add another pet
      </h2>

      <p className="mt-3 max-w-xs text-center text-gray-500">
        Keep all your pet's grooming and health records in one place.
      </p>
    </Link>
  );
}