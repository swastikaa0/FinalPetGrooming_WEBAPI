import Link from "next/link";
import {
  Users,
  Scissors,
   CalendarCheck,
  ArrowRight,
} from "lucide-react";

const CARDS = [
  {
    href: "/admin/users",
    label: "Users",
    desc: "Manage user accounts, roles, and permissions.",
    icon: <Users size={32} />,
  },
  {
    href: "/admin/services",
    label: "Services",
    desc: "Create, update, delete, and manage grooming services.",
    icon: <Scissors size={32} />,
  },
   {
    href: "/admin/bookings",
    label: "Bookings",
    desc: "View and manage all customer appointments.",
    icon: <CalendarCheck size={32} />,
  },
];


export default function Page() {
  return (
    <section className="mx-auto w-full max-w-7xl px-8 py-8">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[2px] text-[#4F6F52]">
          Admin Dashboard
        </p>

        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Overview
        </h2>

        <p className="mt-2 text-gray-500">
          Manage your pet grooming application from one place.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2">
        {CARDS.map(({ href, label, desc, icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4F6F52]/10 text-[#4F6F52]">
              {icon}
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              {label}
            </h3>

            <p className="mt-3 text-gray-500">
              {desc}
            </p>

            <div className="mt-8 flex items-center gap-2 font-semibold text-[#4F6F52] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Manage
              <ArrowRight size={18} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}