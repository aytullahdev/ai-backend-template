import { Hono } from "hono";
import { getSupabase, supabaseMiddleware } from "../middleware/auth.middleware";
import authRouter from "../auth/callback/route";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Serve } from "bun";

const app = new Hono();
app.use("*", supabaseMiddleware());

app.get("/", async (c) => {
  const supabse = getSupabase(c);
  return c.text("Hello Hono!");
});

app.get("/ai", async (c) => {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  return c.text(text);
});

// Mount the auth router
app.route("/auth", authRouter);

export default {
  fetch: app.fetch,
  port: 3000,
  idleTimeout: 120, // 2 minutes for idle timeout
} satisfies Serve;
