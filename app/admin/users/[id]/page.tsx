import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Pencil, ArrowLeft, UserCircle } from "lucide-react";
import { handleGetUserById } from "@/lib/actions/admin/user-action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await handleGetUserById(id);

  if (!result.success || !result.data) notFound();

  const user = result.data;

  const rows: [string, string][] = [
    // ["First Name", user.firstName],
    // ["Last Name", user.lastName],
    ["Full Name", user.fullName],
    ["Email", user.email],
    ["Username", user.username],
    ["Role", user.role],
    [
      "Created",
      user.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "—",
    ],
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-8 py-8">

      {/* Back Button */}
      <Link
        href="/admin/users"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#4F6F52] hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Users
      </Link>

      {/* User Card */}
      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          {/* Profile Image */}
          <div>
           
            {user.profileImage ? (
              <img
                src={process.env.NEXT_PUBLIC_API_BASE_URL + user.profileImage}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full border-4 border-[#4F6F52]/20 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#4F6F52]/10">
                <UserCircle
                  size={60}
                  className="text-[#4F6F52]"
                />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">
              {user.fullName}
            </h2>

            <p className="mt-2 text-gray-500">
              {user.email}
            </p>

            <span className="mt-4 inline-block rounded-full bg-[#4F6F52]/10 px-4 py-1 text-sm font-semibold text-[#4F6F52]">
              {user.role}
            </span>
          </div>

          {/* Edit Button */}
          <Link
            href={`/admin/users/${user._id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4F6F52] px-5 py-3 font-semibold text-white transition hover:bg-[#3f5a42]"
          >
            <Pencil size={18} />
            Edit User
          </Link>

        </div>
      </div>

      {/* Details */}
      <div className="mt-8 rounded-3xl bg-white shadow-lg overflow-hidden">

        <div className="border-b bg-[#4F6F52] px-6 py-4">
          <h3 className="text-lg font-semibold text-white">
            User Information
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