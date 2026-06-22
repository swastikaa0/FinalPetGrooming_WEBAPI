import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Scissors,
  PawPrint,
  Bot,
  FileText,
} from "lucide-react";
import { handleWhoami } from "@/lib/actions/auth-action";

export default async function DashboardPage() {
  const result = await handleWhoami();
  const user = result?.data;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4]">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg font-medium text-[#86A36D]">
                Good Morning,
              </p>

              <h1 className="mt-2 text-5xl font-bold text-[#445D42]">
                Welcome back, {user?.username || "there"}
              </h1>

              <p className="mt-4 text-gray-600 max-w-xl">
                Everything looks great for Snoopy's appointment today.
                We've prepared the lavender shampoo he loves!
              </p>
            </div>

            <div className="relative h-[300px] overflow-hidden rounded-2xl bg-[#B8C5B7]">
              <Image
                src="/img1.png"
                alt="Golden Retriever"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Appointment Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
            {/* Appointment Card */}
            <div className="rounded-2xl bg-sky-200 p-8">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar size={18} />
                <span>NEXT APPOINTMENT</span>
              </div>

              <h2 className="mt-4 text-4xl font-bold text-gray-800">
                Full Grooming — Snoopy
              </h2>

              <div className="mt-3 flex gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Monday, May 5
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  10:00 AM
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="rounded-full bg-[#4F6F52] px-6 py-3 text-white font-medium">
                  View details
                </button>

                <button className="rounded-full bg-[#3C6170] px-6 py-3 text-white font-medium">
                  Reschedule
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#CFE7C7] flex flex-col items-center justify-center p-6">
                <Scissors size={28} />
                <p className="mt-3 font-medium">Book</p>
              </div>

              <div className="rounded-2xl bg-[#E6E3DF] flex flex-col items-center justify-center p-6">
                <FileText size={28} />
                <p className="mt-3 font-medium">Bookings</p>
              </div>

              <div className="rounded-2xl bg-sky-200 flex flex-col items-center justify-center p-6">
                <PawPrint size={28} />
                <p className="mt-3 font-medium">My Pets</p>
              </div>

              <div className="rounded-2xl bg-[#E6E3DF] flex flex-col items-center justify-center p-6">
                <Bot size={28} />
                <p className="mt-3 font-medium">AI Chat</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              Popular Services
            </h2>
{/* 
            <button className="text-sm text-[#4F6F52] font-medium">
              View all services
            </button> */}
            <Link href="/services" className="text-sm text-[#4F6F52] font-medium">
  View all services
</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="overflow-hidden rounded-2xl border bg-white">
              <div className="relative h-56">
                <Image
                  src="/img2.png"
                  alt="Bath and Dry"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold">
                    Bath & Dry
                  </h3>

                  <span className="font-medium">
                    Rs 1500+
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  Full shampoo, conditioning treatment,
                  and professional blow dry.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="overflow-hidden rounded-2xl border bg-white">
              <div className="relative h-56">
                <Image
                  src="/img3.png"
                  alt="Full Grooming"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold">
                    Full Grooming Package
                  </h3>

                  <span className="font-medium">
                    Rs 2500+
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  Bath, haircut, nail trim, ear cleaning,
                  and finishing spray.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="overflow-hidden rounded-2xl border bg-white">
              <div className="relative h-56">
                <Image
                  src="/img4.png"
                  alt="Dental Cleaning"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold">
                    Dental Cleaning
                  </h3>

                  <span className="font-medium">
                    Rs 1200+
                  </span>
                </div>

                <p className="mt-3 text-gray-600">
                  Teeth brushing with enzymatic toothpaste
                  for fresher breath and oral health.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}