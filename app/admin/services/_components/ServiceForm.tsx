"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  createServiceSchema,
  CreateServiceFormData,
} from "./schema";

import { handleCreateService } from "@/lib/actions/admin/service-action";

const fieldClass =
  "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-on-dark";

const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";

export default function ServiceForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      status: "active",
    },
  });

  const onSubmit = (data: CreateServiceFormData) => {
    setError("");

    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("duration", data.duration.toString());
        formData.append("status", data.status);

        if (data.image) {
               formData.append("image", data.image);
               }

        const result = await handleCreateService(formData);

        if (!result.success) {
          throw new Error(result.message);
        }

        toast.success("Service created successfully");

        router.push("/admin/services");
        router.refresh();
      } catch (err: any) {
        toast.error(err.message);

        setError(err.message);
      }
    });
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}

        {/* Service Name */}

        <div className="mb-5">
          <label className={labelClass}>Service Name</label>

          <input
            {...register("name")}
            className={fieldClass}
            placeholder="Bath & Dry"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Description */}

        <div className="mb-5">
          <label className={labelClass}>Description</label>

          <textarea
            {...register("description")}
            rows={4}
            className="w-full rounded border p-3"
            placeholder="Describe the service..."
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}

       <div className="mb-5">
           <label className={labelClass}>Price (Rs.)</label>

           <input
    type="number"
    {...register("price", {
      valueAsNumber: true,
    })}
    className={fieldClass}
  />

  {errors.price && (
    <p className="mt-1 text-sm text-red-600">
      {errors.price.message}
    </p>
  )}
</div>
        {/* Duration */}

        <div className="mb-5">
  <label className={labelClass}>Duration (minutes)</label>

  <input
    type="number"
    {...register("duration", {
      valueAsNumber: true,
    })}
    className={fieldClass}
  />

  {errors.duration && (
    <p className="mt-1 text-sm text-red-600">
      {errors.duration.message}
    </p>
  )}
</div>

        {/* Image */}

        <div className="mb-5">
          <label className={labelClass}>Service Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setValue("image", e.target.files[0], {
                  shouldValidate: true,
                });
              }
            }}
          />

          {errors.image && (
            <p className="mt-1 text-sm text-red-600">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Active */}

        {/* <div className="mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            {...register("status")}
          />

          <label>Active Service</label>
        </div> */}

        <div className="mb-6">
  <label className={labelClass}>Status</label>

  <select
    {...register("status")}
    className={fieldClass}
  >
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>

  {errors.status && (
    <p className="mt-1 text-sm text-red-600">
      {errors.status.message}
    </p>
  )}
</div>

        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="h-12 w-full rounded-xl bg-[#4F6F52] font-semibold text-white"
        >
          {isPending ? "Creating..." : "Create Service"}
        </button>
      </form>
    </div>
  );
}