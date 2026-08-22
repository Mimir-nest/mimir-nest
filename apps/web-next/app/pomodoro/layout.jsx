export const metadata = {
  title: "Pomodoro Focus Timer & Soundscapes | Mimir Nest",
  description: "Boost your study sessions with our customizable Pomodoro timer. Features custom focus intervals and ambient soundscapes.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/pomodoro",
  },
  openGraph: {
    title: "Pomodoro Focus Timer & Soundscapes | Mimir Nest",
    description: "Boost your study sessions with our customizable Pomodoro timer. Features custom focus intervals and ambient soundscapes.",
    url: "https://mimirnest.vercel.app/pomodoro",
  },
  twitter: {
    title: "Pomodoro Focus Timer & Soundscapes | Mimir Nest",
    description: "Boost your study sessions with our customizable Pomodoro timer. Features custom focus intervals and ambient soundscapes.",
  },
};

export default function PomodoroLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Mimir Nest Pomodoro Focus Timer",
      "description": "Boost your study sessions with our customizable Pomodoro timer. Features custom focus intervals and ambient soundscapes.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires HTML5 support",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mimirnest.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pomodoro",
          "item": "https://mimirnest.vercel.app/pomodoro"
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
