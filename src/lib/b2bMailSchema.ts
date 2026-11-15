import { z } from "zod";

const emailCheck = z.string().trim().email();

export const parseCcList = (raw: string): string[] =>
  raw
    .split(/[,\n;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

export const b2bMailSchema = z.object({
  leadId: z.number().int().positive().nullable().optional(),
  to: z
    .string()
    .trim()
    .min(1, "Recipient email is required.")
    .email("Please enter a valid recipient email address."),
  toName: z.string().trim().max(120).optional().default(""),
  cc: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default("")
    .refine(
      (val) => {
        if (!val) return true;
        return parseCcList(val).every((addr) => emailCheck.safeParse(addr).success);
      },
      { message: "One or more CC email addresses are invalid." }
    ),
  replyTo: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((val) => !val || emailCheck.safeParse(val).success, {
      message: "Please enter a valid Reply-To email address.",
    }),
  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters.")
    .max(200, "Subject must be 200 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters.")
    .max(10000, "Message is too long."),
  includeSignature: z.boolean().optional().default(true),
  layout: z.enum(["personal", "branded"]).optional().default("branded"),
  provider: z.enum(["auto", "brevo", "resend"]).optional().default("auto"),
});

export type B2BMailPayload = z.infer<typeof b2bMailSchema>;
