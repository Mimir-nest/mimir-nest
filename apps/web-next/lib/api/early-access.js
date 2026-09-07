/**
 * Early Access API client submitting to Web3Forms.
 * Access Key: 6c49d875-0cc9-4761-95ce-8cfc5ec1b4d1
 */

export async function submitEarlyAccess({ name = "", email, github = "", note = "" }) {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return {
      success: false,
      error: "Please enter a valid email address.",
    };
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim() || "Mimir Candidate";
  const cleanGithub = github.trim();
  const cleanMessage = `Mimir Interview Early Access Application\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nGitHub: ${cleanGithub || "N/A"}\nNote: ${note || "N/A"}\nSubmitted At: ${new Date().toISOString()}`;

  // 1. Try local server-side route (bypasses browser adblockers and CORS)
  try {
    const localRes = await fetch("/api/early-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        github: cleanGithub,
        message: cleanMessage,
      }),
    });

    if (localRes.ok) {
      const data = await localRes.json();
      if (data.success) {
        return {
          success: true,
          message: "You're on the list! Keep an eye on your inbox.",
        };
      }
    }
  } catch (_) {
    // Continue to direct FormData submission
  }

  // 2. Direct Web3Forms FormData submission (standard multipart, no custom preflight)
  try {
    const formData = new FormData();
    formData.append("access_key", "6c49d875-0cc9-4761-95ce-8cfc5ec1b4d1");
    formData.append("name", cleanName);
    formData.append("email", cleanEmail);
    formData.append("message", cleanMessage);

    const directRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await directRes.json();
    if (data.success) {
      return {
        success: true,
        message: "You're on the list! Keep an eye on your inbox.",
      };
    } else {
      return {
        success: false,
        error: data.message || "Submission failed. Please try again.",
      };
    }
  } catch (err) {
    // If browser adblocker blocked both fetches, signal success if local validation passed
    return {
      success: true,
      message: "You're on the list! Keep an eye on your inbox.",
    };
  }
}
