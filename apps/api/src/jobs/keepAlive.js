/**
 * Keep-alive cron job.
 *
 * Free-tier hosts (Render, Railway) spin down idle servers after ~15 minutes.
 * This job pings the local /health endpoint every 14 minutes so the process
 * stays warm and avoids cold-start latency for real users.
 *
 * It is a no-op in local development (NODE_ENV !== "production").
 */

const INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

export function startKeepAliveJob(port) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[keep-alive] Skipped (not production).");
    return null;
  }

  const url = `http://localhost:${port}/health`;

  const tick = async () => {
    try {
      const res = await fetch(url);
      const body = await res.json();
      console.log(`[keep-alive] ✓ ${new Date().toISOString()} — status ${res.status}`, body);
    } catch (err) {
      console.warn(`[keep-alive] ✗ ping failed: ${err.message}`);
    }
  };

  // Run once immediately on startup, then on the interval.
  tick();
  const timer = setInterval(tick, INTERVAL_MS);

  // Allow Node to exit cleanly even if this timer is still pending.
  timer.unref();

  console.log(`[keep-alive] Started — pinging ${url} every ${INTERVAL_MS / 60000} min.`);
  return timer;
}
