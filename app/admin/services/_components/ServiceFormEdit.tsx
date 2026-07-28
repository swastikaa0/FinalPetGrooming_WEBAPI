"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

import {
  editServiceSchema,
  EditServiceFormData,
} from "./schema";

import { handleUpdateService } from "@/lib/actions/admin/service-action";

const fieldClass =
  "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-on-dark";

const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";

const errClass = "mt-1 block text-sm text-m-red";

export default function ServiceFormEdit({
  service,
}: {
  service?: any;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditServiceFormData>({
    resolver: zodResolver(editServiceSchema),

    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      duration: service?.duration || 0,
      status: service?.status ?? "active",
    },
  });

  const [previewImage, setPreviewImage] =
    useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void
  ) => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () =>
        setPreviewImage(reader.result as string);

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }

    onChange(file);
  };

  const handleDismissImage = (
    onChange?: (file: File | undefined) => void
  ) => {
    setPreviewImage(null);

    onChange?.(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: EditServiceFormData) => {
    setError("");

    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append(
          "description",
          data.description
        );
        formData.append(
          "price",
          data.price.toString()
        );
        formData.append(
          "duration",
          data.duration.toString()
        );
        formData.append(
          "status",
          data.status
        );

        if (data.image) {
          formData.append("image", data.image);
        }

        const result = await handleUpdateService(
          service._id,
          formData
        );

        if (!result.success) {
          throw new Error(result.message);
        }

        toast.success(
          "Service updated successfully"
        );

        router.push("/admin/services");
        router.refresh();
      } catch (err: any) {
        toast.error(err?.message);

        setError(
          err?.message || "Something went wrong"
        );
      }
    });
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="mb-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mb-4">
          {previewImage ? (
            <div className="relative h-28 w-28">
              <img
                src={previewImage}
                alt="Preview"
                className="h-28 w-28 rounded-lg object-cover"
              />

              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <button
                    type="button"
                    onClick={() =>
                      handleDismissImage(onChange)
                    }
                    className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                  >
                    ✕
                  </button>
                )}
              />
            </div>
          ) : service?.image ? (
            <Image
              src={
                process.env.NEXT_PUBLIC_API_BASE_URL +
                service.image
              }
              alt={service.name}
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-gray-100 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>
            Service Image
          </label>

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) =>
                  handleImageChange(
                    e.target.files?.[0],
                    onChange
                  )
                }
              />
            )}
          />

          {errors.image && (
            <span className={errClass}>
              {errors.image.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>
            Service Name
          </label>

          <input
            {...register("name")}
            className={fieldClass}
          />

          {errors.name && (
            <span className={errClass}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>
            Description
          </label>

          <textarea
            {...register("description")}
            rows={4}
            className="w-full rounded border p-3"
          />

          {errors.description && (
            <span className={errClass}>
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>
            Price
          </label>

          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            className={fieldClass}
          />

          {errors.price && (
            <span className={errClass}>
              {errors.price.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label className={labelClass}>
            Duration (minutes)
          </label>

          <input
            type="number"
            {...register("duration", {
              valueAsNumber: true,
            })}
            className={fieldClass}
          />

          {errors.duration && (
            <span className={errClass}>
              {errors.duration.message}
            </span>
          )}
        </div>

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
    <span className={errClass}>
      {errors.status.message}
    </span>
  )}
</div>

        <button
          type="submit"
          disabled={
            isSubmitting || isPending
          }
          className="flex h-12 w-full items-center justify-center rounded-lg bg-[#4a6741] text-xs font-bold uppercase tracking-[1.5px] text-white hover:bg-[#3d5736] disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
}