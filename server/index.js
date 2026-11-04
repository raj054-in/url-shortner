import "dotenv/config";
import dns from "node:dns";

import app from "./src/app.js";
import connectDB from "./src/db/mongoDb.js";
import { connectRedis,startCounter } from "./src/db/redis.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const port = process.env.PORT || 3000;

async function startServer() {
  await connectDB();
  await connectRedis();
  await startCounter()

  app.listen(port, () => {
    console.log(`server started at ${port}`);
  });
}

startServer().catch((error) => {
  console.error("failed to start server", error);
  process.exit(1);
});
