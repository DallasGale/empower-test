import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { accounts, categories, transactions } from "./mockData";

const app = new Hono();

// Add CORS middleware
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app
  .get("/accounts", (c) => {
    return c.json(accounts);
  })
  .get("/categories", (c) => {
    return c.json(categories);
  })
  .get("/transactions", (c) => {
    return c.json(transactions);
  });

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
