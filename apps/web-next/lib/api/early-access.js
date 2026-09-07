/**
 * Client abstraction for early access signups.
 * 
 * Future architecture note:
 * When the backend early-access endpoint is available, swap the simulated implementation
 * with `apiFetch('/api/early-access', { method: 'POST', body: JSON.stringify({ email, source: 'interview-landing' }) })`.
 */

export async function submitEarlyAccess(email) {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return {
      success: false,
      error: "Please enter a valid email address.",
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Simulated latency for realistic feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Store in localStorage for temporary client-side persistence during preview
  try {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("mimir_interview_early_access") || "[]");
      if (!stored.includes(cleanEmail)) {
        stored.push(cleanEmail);
        localStorage.setItem("mimir_interview_early_access", JSON.stringify(stored));
      }
    }
  } catch (err) {
    // Non-critical local storage fallback
  }

  return {
    success: true,
    message: "You're on the list! Keep an eye on your inbox.",
  };
}
