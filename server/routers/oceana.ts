import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

function findLeadData(messages: Array<{ role: "user" | "assistant"; content: string }>) {
  const combinedUserText = messages
    .filter(m => m.role === "user")
    .map(m => m.content)
    .join("\n");

  const email = combinedUserText.match(EMAIL_RE)?.[0];
  if (!email) return null;

  const nameMatchers = [
    /my name is\s+([A-Za-z][A-Za-z\s'\-]{1,60})/i,
    /i am\s+([A-Za-z][A-Za-z\s'\-]{1,60})/i,
    /this is\s+([A-Za-z][A-Za-z\s'\-]{1,60})/i,
    /name\s*[:\-]\s*([A-Za-z][A-Za-z\s'\-]{1,60})/i,
  ];

  let name = "Prospect";
  for (const re of nameMatchers) {
    const match = combinedUserText.match(re);
    if (match?.[1]) {
      name = match[1].trim();
      break;
    }
  }

  return { name, email };
}

function buildReply(userText: string) {
  const text = userText.toLowerCase();

  if (text.includes("price") || text.includes("pricing") || text.includes("cost")) {
    return "Trade pricing is available to qualified buyers and varies by model, quantity, and branding requirements. Share your venue type and target quantity, and I can guide you to the right next step. You can also book a trade call at https://calendly.com/hello-oceanex/30min.";
  }

  if (text.includes("deploy") || text.includes("setup") || text.includes("inflate")) {
    return "Oceanex structures typically inflate in about 8 minutes and deflate in roughly 12 minutes. They are designed for fast deployment and can hold pressure for multiple days depending on conditions. If you want, I can recommend a model based on your venue size.";
  }

  if (text.includes("ship") || text.includes("world") || text.includes("country")) {
    return "Oceanex supports international shipping for hospitality operators, events, and resort buyers. Lead times vary by model and custom branding scope. If you share your destination country, I can suggest the most practical purchasing route.";
  }

  if (text.includes("product") || text.includes("bar") || text.includes("collection")) {
    return "Popular options include the Santorini Pool Bar, Miami Pool Bar, Champagne Bar, DJ Booth, and Long Bar, plus larger-format resort and event variants. Tell me your use case (resort, cruise, events, or activations) and I will narrow this down to your top 2-3 options.";
  }

  if (text.includes("book") || text.includes("call") || text.includes("demo")) {
    return "You can book a 30-minute trade call here: https://calendly.com/hello-oceanex/30min. During the call, the team can cover product fit, deployment, and trade pricing tailored to your project.";
  }

  return "Thanks for reaching out to Oceanex. I can help with product fit, deployment timelines, and trade onboarding. Share your venue type, region, and target quantity, and I will guide you to the best next step.";
}

export const oceanaRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
        language: z.string().optional().default("en"),
      })
    )
    .mutation(async ({ input }) => {
      const { messages, language } = input;

      const lastUserMessage = [...messages].reverse().find(m => m.role === "user")?.content ?? "";
      const leadData = findLeadData(messages);

      let content = buildReply(lastUserMessage);
      if (leadData) {
        content += `\n\nThanks ${leadData.name}. I have your email and a team member can follow up with trade details.`;
      } else if (messages.filter(m => m.role === "user").length >= 2) {
        content += "\n\nTo send trade specs and next steps, may I take your name and email?";
      }

      if (language !== "en") {
        content += `\n\n(Language requested: ${language}. This local fallback is currently optimized for English output.)`;
      }

      return {
        content,
        leadData,
      };
    }),
});
