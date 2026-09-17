import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { startKeepAliveJob } from "./jobs/keepAlive.js";

const app = createApp();

app.listen(env.port, () => {
  console.log(`API server listening on http://localhost:${env.port}`);
  startKeepAliveJob(env.port);
});
