export const metadata = {
  title: "Mimir Interview — Live AI Mock Interviews Based on Your GitHub | Mimir Nest",
  description:
    "Practice live technical interviews based on the projects you've actually built. Mimir Interview is an upcoming voice-first AI mock interview experience from Mimir Nest.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/interview",
  },
  openGraph: {
    title: "Mimir Interview — Live AI Mock Interviews Based on Your GitHub | Mimir Nest",
    description:
      "Practice live technical interviews based on the projects you've actually built. Mimir Interview is an upcoming voice-first AI mock interview experience from Mimir Nest.",
    url: "https://mimirnest.vercel.app/interview",
    type: "website",
    siteName: "Mimir Nest",
    images: [
      {
        url: "/logo/logo.png",
        width: 512,
        height: 512,
        alt: "Mimir Interview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mimir Interview — Live AI Mock Interviews Based on Your GitHub | Mimir Nest",
    description:
      "Practice live technical interviews based on the projects you've actually built. Mimir Interview is an upcoming voice-first AI mock interview experience from Mimir Nest.",
    images: ["/logo/logo.png"],
  },
};

export default function InterviewLayout({ children }) {
  return <>{children}</>;
}
