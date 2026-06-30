import Link from "next/link";
import UserForm from "../_components/UserForm";

export default function Page() {
    return (
        <section className="mx-auto max-w-5xl px-8 py-8">
            <Link
               href="/admin/users"
               className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#4F6F52] hover:underline"
                 >
                ← Back to Users
              </Link>

              <div className="rounded-3xl bg-white p-8 shadow-lg">
    <h1 className="mb-6 text-3xl font-bold">
      Create User
    </h1>

    <UserForm />
  </div>
</section>
    );
}