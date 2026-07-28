import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const base = {
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters" }),

  description: z
    .string()
    .min(5, { message: "Minimum 5 characters" }),

  price: z
    .number()
    .positive({ message: "Price must be greater than 0" }),

  duration: z
    .number()
    .positive({ message: "Duration must be greater than 0" }),

  status: z.enum(["active", "inactive"]),
};

export const createServiceSchema = z.object({
  ...base,

  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      {
        message: "Max file size is 5MB",
      }
    )
    .refine(
      (file) =>
        !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message:
          "Only .jpg, .jpeg, .png and .webp formats are supported",
      }
    ),
});

export const editServiceSchema = z.object({
  ...base,

  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      {
        message: "Max file size is 5MB",
      }
    )
    .refine(
      (file) =>
        !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message:
          "Only .jpg, .jpeg, .png and .webp formats are supported",
      }
    ),
});

/* IMPORTANT: Export the INPUT types */
export type CreateServiceFormData = z.input<
  typeof createServiceSchema
>;

export type EditServiceFormData = z.input<
  typeof editServiceSchema
>;