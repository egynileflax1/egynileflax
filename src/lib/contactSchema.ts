import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "nameMin")
    .max(120, "nameMin"),
  company: z.string().trim().max(160).optional().default(""),
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .email("emailInvalid")
    .max(200, "emailInvalid"),
  phone: z
    .string()
    .trim()
    .max(60, "phoneInvalid")
    .refine((val) => !val || /^[+\d\s().-]{6,30}$/.test(val), "phoneInvalid")
    .optional()
    .default(""),
  product: z.string().trim().max(250).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "messageMin")
    .max(1900, "messageMin"),
  lang: z.enum(["en", "ar", "zh"]).optional().default("en"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactFieldErrorKey = "nameMin" | "emailRequired" | "emailInvalid" | "phoneInvalid" | "messageMin";

