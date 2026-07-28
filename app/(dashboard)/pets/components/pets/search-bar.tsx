import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search your pets..."
        className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#445D42]"
      />
    </div>
  );
}