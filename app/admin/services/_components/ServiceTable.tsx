"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Modal from "../../_components/Modal";
import { handleDeleteService } from "@/lib/actions/admin/service-action";
import { Search } from "lucide-react";

export default function ServiceTable({
  data,
  pagination,
  search,
}: {
  data: any[];
  pagination: any;
  search: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<any | null>(null);

  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 10;
  const totalPages = pagination?.totalPages ?? 1;
  const total = pagination?.total ?? 0;

  const setQuery = (next: Record<string, string | number>) => {
    const q = new URLSearchParams(params.toString());

    Object.entries(next).forEach(([k, v]) =>
      q.set(k, String(v))
    );

    router.push(`/admin/services?${q.toString()}`);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = new FormData(e.currentTarget).get(
      "search"
    ) as string;

    setQuery({
      search: value ?? "",
      page: 1,
    });
  };

  const onDelete = () => {
    if (!target) return;

    startTransition(async () => {
      const result = await handleDeleteService(target._id);

      if (result.success) {
        toast.success("Service deleted");
        setTarget(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  console.log(data);

  return (
    <div className="mx-auto w-full max-w-7xl px-8 py-8">

      {/* Header */}

      <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-8 shadow-lg sm:flex-row sm:items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">
            Services
          </h2>

          <p className="mt-1 text-gray-500">
            {total} total
          </p>
        </div>

        <Link
          href="/admin/services/create"
          className="rounded-full bg-[#4F6F52] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#3f5a42]"
        >
          New Service
        </Link>
      </div>

      {/* Search */}

      <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">

        <form
          onSubmit={onSearch}
          className="flex w-full max-w-md gap-2"
        >
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              name="search"
              defaultValue={search}
              placeholder="Search services..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#4F6F52] px-5 text-white"
          >
            Search
          </button>
        </form>

        <label className="flex items-center gap-2">
          Rows

          <select
            value={limit}
            onChange={(e) =>
              setQuery({
                page: 1,
                limit: e.target.value,
              })
            }
            className="h-12 rounded-xl border border-gray-200 px-4"
          >
            {[5, 10, 20, 50].map((n) => (
              <option
                key={n}
                value={n}
              >
                {n}
              </option>
            ))}
          </select>
        </label>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

        <table className="w-full text-left">

          <thead className="bg-[#4F6F52] text-white">

            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {data?.length ? (
              data.map((service) => (
                <tr
                  key={service._id}
                  className="border-b hover:bg-green-50"
                >
                  <td className="px-6 py-4">

                    <img
                      src={
                        process.env.NEXT_PUBLIC_API_BASE_URL +
                        service.image
                      }
                      alt={service.name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />

                  </td>

                  <td className="px-6 py-4 font-medium">
                    {service.name}
                  </td>

                  <td className="px-6 py-4">
                    Rs. {service.price}
                  </td>

                  <td className="px-6 py-4">
                    {service.duration} min
                  </td>

                  <td className="px-6 py-4">

                   <span
                 className={`rounded px-2 py-1 text-xs ${
                   service.status === "active"
                    ? "bg-green-100 text-green-700"
                   : "bg-red-100 text-red-700"
                     }`}
                           >
                      {service.status === "active"
                         ? "Active"
                       : "Inactive"}
                         </span>

                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      service.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">

                    <div className="flex justify-end gap-3">

                      <Link
                        href={`/admin/services/${service._id}`}
                        className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/services/${service._id}/edit`}
                        className="rounded-lg bg-green-100 px-3 py-1 text-green-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          setTarget(service)
                        }
                        className="rounded-lg bg-red-100 px-3 py-1 text-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center"
                >
                  No services found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="mt-8 flex items-center justify-between rounded-3xl bg-white p-5 shadow-lg">

        <span>
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">

          <button
            disabled={page <= 1}
            onClick={() =>
              setQuery({ page: page - 1 })
            }
            className="rounded-xl border px-5 py-2"
          >
            Prev
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() =>
              setQuery({ page: page + 1 })
            }
            className="rounded-xl border px-5 py-2"
          >
            Next
          </button>

        </div>

      </div>

      {/* Delete Modal */}

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="Delete Service"
      >
        <div className="space-y-4">

          <p>
            Are you sure you want to delete this service?
          </p>

          <div className="rounded-lg border bg-red-50 p-4">

            <p className="font-semibold">
              {target?.name}
            </p>

            <p>
              Rs. {target?.price}
            </p>

          </div>

          <div className="mt-6 flex justify-end gap-3">

            <button
              onClick={() => setTarget(null)}
              className="rounded-lg border px-5 py-2"
            >
              Cancel
            </button>

            <button
              onClick={onDelete}
              disabled={isPending}
              className="rounded-lg bg-[#4F6F52] px-5 py-2 text-white"
            >
              {isPending
                ? "Deleting..."
                : "Delete Service"}
            </button>

          </div>

        </div>

      </Modal>

    </div>
  );
}