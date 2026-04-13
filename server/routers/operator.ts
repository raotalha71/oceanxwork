import { z } from "zod";
import { publicProcedure, router } from "../trpc";

type ApplicationStatus = "pending" | "approved";

type OperatorApplication = {
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  language: string;
  status: ApplicationStatus;
  createdAt: string;
};

const operatorApplications = new Map<string, OperatorApplication>();
const operatorEnquiries: Array<{
  name: string;
  email: string;
  company: string | null;
  product: string | null;
  message: string | null;
  language: string;
  role: string | null;
  createdAt: string;
}> = [];

export const operatorRouter = router({
  submitEnquiry: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        company: z.string().max(255).optional(),
        product: z.string().max(255).optional(),
        message: z.string().max(5000).optional(),
        language: z.string().max(8).optional().default("en"),
        role: z.string().max(64).optional(),
      })
    )
    .mutation(async ({ input }) => {
      operatorEnquiries.push({
        name: input.name,
        email: input.email,
        company: input.company ?? null,
        product: input.product ?? null,
        message: input.message ?? null,
        language: input.language,
        role: input.role ?? null,
        createdAt: new Date().toISOString(),
      });

      console.log("[operator.submitEnquiry]", {
        email: input.email,
        product: input.product,
      });

      return { success: true };
    }),

  registerApplication: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        company: z.string().max(255).optional(),
        role: z.string().max(64).optional(),
        language: z.string().max(8).optional().default("en"),
      })
    )
    .mutation(async ({ input }) => {
      const key = input.email.toLowerCase();
      const existing = operatorApplications.get(key);
      if (existing) {
        return {
          success: true,
          status: existing.status,
          alreadyExists: true,
        };
      }

      operatorApplications.set(key, {
        name: input.name,
        email: input.email,
        company: input.company ?? null,
        role: input.role ?? null,
        language: input.language,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      return {
        success: true,
        status: "pending" as const,
        alreadyExists: false,
      };
    }),

  checkApplicationStatus: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      const app = operatorApplications.get(input.email.toLowerCase());
      if (!app) return { found: false, status: null };
      return { found: true, status: app.status };
    }),
});
