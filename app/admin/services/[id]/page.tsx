import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { handleGetServiceById } from "@/lib/actions/admin/service-action";

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

  const service = result.data;

  const rows: [string, string][] = [
    ["Service Name", service.name],
    ["Description", service.description],
    ["Price", `Rs. ${service.price}`],
    ["Duration", `${service.duration} minutes`],
    ["Status", service.status =="active"? "Active" : "Inactive"],
    [
      "Created",
      service.createdAt
        ? new Date(service.createdAt).toLocaleString()
        : "—",
    ],
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-8 py-8">
      {/* Back Button */}
      <Link
        href="/admin/services"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#4F6F52] hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Services
      </Link>

      {/* Service Card */}
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Service Image */}
          <div>
            {service.image ? (
              <img
                src={
                  process.env.NEXT_PUBLIC_API_BASE_URL +
                  service.image
                }
                alt={service.name}
                width={140}
                height={140}
                className="h-32 w-32 rounded-2xl border object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gray-100">
                <span className="text-gray-400">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Service Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold">
              {service.name}
            </h2>

            <p className="mt-3 text-gray-500">
              {service.description}
            </p>

            <div className="mt-4 flex gap-3">
              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Rs. {service.price}
              </span>

              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                {service.duration} mins
              </span>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  service.status ==="active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.status ==="active" ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <Link
            href={`/admin/services/${service._id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4F6F52] px-5 py-3 font-semibold text-white hover:bg-[#3f5a42]"
          >
            <Pencil size={18} />
            Edit Service
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">
        <div className="border-b bg-[#4F6F52] px-6 py-4">
          <h3 className="text-lg font-semibold text-white">
            Service Information
          </h3>
        </div>

        <div className="divide-y divide-gray-100">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between px-6 py-5 hover:bg-gray-50"
            >
              <span className="font-medium text-gray-500">
                {label}
              </span>

              <span className="font-semibold text-gray-900">
                {value || "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}