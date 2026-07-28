"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreatePet } from "@/lib/actions/pet-action";

export default function AddPetForm() {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    gender: "Male",
    lastGrooming: "",
    vaccinated: "Not Vaccinated",
    medicalNotes: "",
    groomingPreferences: "",
  });

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
formData.append("breed", form.breed);
formData.append("age", form.age);
formData.append("weight", form.weight);
formData.append("gender", form.gender);
formData.append("lastGrooming", form.lastGrooming);
formData.append("vaccinated", String(form.vaccinated));
formData.append("medicalNotes", form.medicalNotes);
formData.append(
  "groomingPreferences",
  form.groomingPreferences
);
    if (image) {
      formData.append("profileImage", image);
    }

    const result = await handleCreatePet(formData);

    if (result.success) {
      router.push("/pets");
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Image Upload */}

      <div className="flex flex-col items-center">

        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-100">

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-500">
              Upload Photo
            </span>
          )}

        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-4"
        />

      </div>

      {/* Pet Information */}

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Pet Name
          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Breed
          </label>

          <input
            type="text"
            value={form.breed}
            onChange={(e) =>
              setForm({ ...form, breed: e.target.value })
            }
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
  <label className="mb-2 block font-medium">
    Gender
  </label>

  <select
    value={form.gender}
    onChange={(e) =>
      setForm({
        ...form,
        gender: e.target.value,
      })
    }
    className="w-full rounded-xl border p-3"
  >
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
          </div>


        <div>
          <label className="mb-2 block font-medium">
            Age
          </label>

          <input
            type="number"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Weight (kg)
          </label>

          <input
            type="number"
            step="0.1"
            value={form.weight}
            onChange={(e) =>
              setForm({ ...form, weight: e.target.value })
            }
            className="w-full rounded-xl border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Last Grooming
          </label>

          <input
            type="date"
            value={form.lastGrooming}
            onChange={(e) =>
              setForm({
                ...form,
                lastGrooming: e.target.value,
              })
            }
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Vaccination Status
          </label>

          <select
                value={form.vaccinated}
                 onChange={(e) =>
                   setForm({
                    ...form,
                   vaccinated: e.target.value,
                    })
                         }
              className="w-full rounded-xl border p-3"
               >
              <option value="Fully Vaccinated">
               Fully Vaccinated
                </option>

                <option value="Booster Due">
                    Booster Due
                   </option>

                 <option value="Not Vaccinated">
                    Not Vaccinated
                     </option>
                   </select>
        </div>

      </div>

      {/* Medical Notes */}

      <div>

        <label className="mb-2 block font-medium">
          Medical Notes
        </label>

        <textarea
          rows={4}
          value={form.medicalNotes}
          onChange={(e) =>
            setForm({
              ...form,
              medicalNotes: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Grooming Preferences */}

      <div>

        <label className="mb-2 block font-medium">
          Grooming Preferences
        </label>

        <textarea
          rows={4}
          value={form.groomingPreferences}
          onChange={(e) =>
            setForm({
              ...form,
              groomingPreferences: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => router.push("/pets")}
          className="rounded-xl border px-6 py-3"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-[#445D42] px-8 py-3 text-white"
        >
          Save Pet
        </button>

      </div>

    </form>
  );
}