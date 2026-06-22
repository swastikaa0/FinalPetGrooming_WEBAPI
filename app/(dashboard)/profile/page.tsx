import UpdateForm from "./_components/UpdateForm";
import { handleWhoami } from "@/lib/actions/auth-action";

export default async function ProfilePage() {
  const result = await handleWhoami();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-600">
          Manage your personal information and
          account settings.
        </p>
      </div>

      <UpdateForm
        user={result?.data || null}
      />
    </div>
  );
}