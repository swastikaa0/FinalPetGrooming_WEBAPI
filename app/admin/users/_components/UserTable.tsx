"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Modal from "../../_components/Modal";
import { handleDeleteUser } from "@/lib/actions/admin/user-action";
import { Search } from "lucide-react";

export default function UserTable({
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
    const [target, setTarget] = useState<any | null>(null); // user pending deletion

    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const totalPages = pagination?.totalPages ?? 1;
    const total = pagination?.total ?? 0;

    // push a new query string, keeping existing params
    const setQuery = (next: Record<string, string | number>) => {
        const q = new URLSearchParams(params.toString());
        Object.entries(next).forEach(([k, v]) => q.set(k, String(v)));
        router.push(`/admin/users?${q.toString()}`);
    };

    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = new FormData(e.currentTarget).get("search") as string;
        setQuery({ search: value ?? "", page: 1 });
    };

    const onDelete = () => {
        if (!target) return;
        startTransition(async () => {
            const result = await handleDeleteUser(target._id);
            if (result.success) {
                toast.success("User deleted");
                setTarget(null);
            } else {
                toast.error(result.message || "Failed to delete user");
            }
        });
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-8 py-8">
           <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-8 shadow-lg sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-4xl font-bold text-gray-900">Users</h2>
                    <p className="mt-1 text-gray-500">{total} total</p>
                </div>
                <Link
                    href="/admin/users/create"
                    className="rounded-full bg-[#4F6F52] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#3f5a42] transition"
                >
                    New user
                </Link>
            </div>

            <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
              <form onSubmit={onSearch} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
              <Search
              size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        name="search"
        defaultValue={search}
        placeholder="Search users..."
        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#4F6F52] focus:bg-white"
      />
    </div>

    <button
      type="submit"
      className="flex h-12 items-center justify-center rounded-xl bg-[#4F6F52] px-5 text-sm font-semibold text-white transition hover:bg-[#3f5a42]"
    >
      Search
    </button>
  </form>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-muted">
                    Rows
                    <select
                        value={limit}
                        onChange={(e) => setQuery({ limit: e.target.value, page: 1 })}
                        className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none"
                    >
                        {[5, 10, 20, 50].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#4F6F52] text-xs uppercase tracking-wider text-white">
                        <tr>
                            <th className="px-6 py-4 font-medium">ID</th>
                            <th className="px-6 py-4 font-medium">Name</th>

                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Username</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Created</th>
                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length ? (
                            data.map((u) => (
                                <tr key={u._id} className="border-b border-gray-100 transition hover:bg-green-50">

                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            {u._id?.slice(0, 8)}...
                                            </td>
                                    <td className="px-6 py-4 text-on-dark">
                                        {u.fullName} 
                                    </td>
                                    <td className="px-6 py-4 text-body">{u.email}</td>
                                    <td className="px-6 py-4 text-body">{u.username}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block rounded px-2 py-0.5 text-xs uppercase tracking-[1px] ${
                                                u.role === "admin"
                                                    ? "bg-electric-blue/20 text-bmw-blue"
                                                    : "bg-surface-elevated text-muted"
                                            }`}
                                        >
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-body">
                                              {new Date(u.createdAt).toLocaleDateString()}
                                             </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-3 text-xs font-medium uppercase tracking-[1px]">
                                            <Link href={`/admin/users/${u._id}`}className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700 transition hover:bg-blue-200" >
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/users/${u._id}/edit`}
                                               className="rounded-lg bg-green-100 px-3 py-1 text-green-700 transition hover:bg-green-200"
                                                 >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setTarget(u)}
                                                className="rounded-lg bg-red-100 px-3 py-1 text-red-700 transition hover:bg-red-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-4 py-12 text-center text-muted">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-3xl bg-white p-5 shadow-lg text-sm">
                <span>
                    Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                    <button
                        disabled={page <= 1}
                        onClick={() => setQuery({ page: page - 1 })}
                        className="rounded-xl border border-gray-200 px-5 py-2 font-medium transition hover:bg-[#4F6F52] hover:text-white disabled:opacity-40"
                    >
                        Prev
                    </button>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setQuery({ page: page + 1 })}
                        className="rounded-xl border border-gray-200 px-5 py-2 font-medium transition hover:bg-[#4F6F52] hover:text-white disabled:opacity-40">
                        Next
                    </button>
                </div>
            </div>

       <Modal
    open={!!target}
    onClose={() => setTarget(null)}
    title="Delete User"
>
    <div className="space-y-4">
        <p className="text-gray-600">
            Are you sure you want to delete this user?
        </p>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-gray-900">
                {target?.fullName}
            </p>

            <p className="text-sm text-gray-500">
                {target?.email}
            </p>
        </div>

        <p className="text-sm text-red-600">
            This action cannot be undone.
        </p>
    </div>

    <div className="mt-8 flex justify-end gap-3">
        <button
            type="button"
            onClick={() => setTarget(null)}
            className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
        >
            Cancel
        </button>

        <button
            type="button"
            onClick={onDelete}
            disabled={isPending}
            className="rounded-lg bg-[#4a6741] px-5 py-2 font-medium text-white transition hover:bg-[#3d5736] disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isPending ? "Deleting..." : "Delete User"}
        </button>
    </div>
</Modal>
        </div>
    );
}