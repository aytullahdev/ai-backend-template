import { Hono } from "hono";
import { getSupabase, supabaseMiddleware } from "../middleware/auth.middleware";
import authRouter from "../auth/callback/route";

const app = new Hono();
app.use("*", supabaseMiddleware());

app.get("/", async (c) => {
  const supabse = getSupabase(c);
  return c.text("Hello Hono!");
});

// Mount the auth router
app.route("/auth", authRouter);

export default {
  fetch: app.fetch,
  port: 3000,
};
