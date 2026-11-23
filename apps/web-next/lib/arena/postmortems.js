// Hand-curated pairing: mimir.yaml `postmortem_slug` -> real public write-up. Quotes must stay under 15 words.
export const postmortems = {
  "stripe-rate-limiters": {
    title: "Scaling your API with rate limiters",
    org: "Stripe Engineering",
    date: "March 30, 2017",
    url: "https://stripe.com/blog/rate-limiters",
    quote: "any coding or operational errors would fail open",
    takeaway:
      "Stripe runs token buckets in Redis and deliberately fails open so a limiter bug never blocks payments. INC-142 went the other way: the gateway failed open silently, so nobody saw the limiter was broken until a retry storm got through. Which policy is right depends on what the limiter protects; whichever you pick, the failure has to be loud.",
  },
};
