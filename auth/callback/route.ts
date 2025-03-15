import { Hono } from "hono";
import { getSupabase } from "../../middleware/auth.middleware";

const authRouter = new Hono();

authRouter.get("/callback", async (c) => {
  const code = c.req.query("code");
  const next = c.req.query("next");
  const supabase = getSupabase(c);

  if (code) {
    // todo: handle  forwardeing to next later
  }

  return c.text("callback");
});

export default authRouter;
