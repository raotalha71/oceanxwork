import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { sendContactEmail } from "../services/contactMailer";

const contactInputSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(320),
  phone: z.string().max(50).optional().nullable(),
  company: z.string().max(120).optional().nullable(),
  enquiryType: z.string().min(1).max(80),
  budget: z.string().max(120).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
  pageUrl: z.string().url().optional(),
});

export const contactRouter = router({
  submit: publicProcedure.input(contactInputSchema).mutation(async ({ input }) => {
    const submittedAt = new Date().toISOString();

    await sendContactEmail({
      ...input,
      submittedAt,
      phone: input.phone ?? null,
      company: input.company ?? null,
      budget: input.budget ?? null,
      message: input.message ?? null,
    });

    return {
      success: true,
      submittedAt,
    } as const;
  }),
});
