import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Chats, Embeddings } from "./src/routes";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

// Initialize middlewares
app.use("*", logger(), prettyJSON());

// Cors
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/embeddings", Embeddings);
app.route("/chat", Chats);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
