import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";

import { handleGetServiceById } from "@/lib/actions/admin/service-action";
import ServiceFormEdit from "../../_components/ServiceFormEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await handleGetServiceById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-8 py-8">

      <Link
        href="/admin/services"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#4F6F52] hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Services
      </Link>

      <div className="mt-6 mb-8 rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4F6F52]/10">
            <Pencil
              size={30}
              className="text-[#4F6F52]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[2px] text-[#4F6F52]">
              Admin Panel
            </p>

            <h2 className="mt-1 text-4xl font-bold text-gray-900">
              Edit Service
            </h2>

            <p className="mt-2 text-gray-500">
              Update the service information.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <ServiceFormEdit service={result.data} />
      </div>

    </section>
  );
}