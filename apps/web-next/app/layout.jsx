import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://mimirnest.vercel.app"),
  title: {
    default: "Mimir Nest | Open-Source Student Platform",
    template: "%s | Mimir Nest",
  },
  description: "Free, open-source platform offering academic, learning, productivity, DSA, and career tools for college students.",
  keywords: [
    "college student tools",
    "student productivity tools",
    "college productivity",
    "student learning platform",
    "DSA preparation",
    "coding interview preparation",
    "placement preparation",
    "student roadmaps",
    "developer roadmaps",
    "student projects",
    "student portfolio",
    "college resources",
    "study tools",
    "open source student platform",
    "free student tools",
    "career preparation for students"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mimirnest.vercel.app",
    title: "Mimir Nest | Open-Source Student Platform",
    description: "Free, open-source platform offering academic, learning, productivity, DSA, and career tools for college students.",
    siteName: "Mimir Nest",
    images: [
      {
        url: "/logo/logo.png",
        width: 512,
        height: 512,
        alt: "Mimir Nest Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mimir Nest | Open-Source Student Platform",
    description: "Free, open-source platform offering academic, learning, productivity, DSA, and career tools for college students.",
    images: ["/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "5w8gnos2EMpvOaxww-8unXKrbq22ddUe_Wd82N-liqA",
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mimir Nest",
    "url": "https://mimirnest.vercel.app",
    "logo": "https://mimirnest.vercel.app/logo/logo.png",
    "sameAs": [
      "https://github.com/Mimir-nest"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mimir Nest",
    "url": "https://mimirnest.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mimirnest.vercel.app/placement-dsa?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} bg-mn-background text-on-background antialiased`}
        suppressHydrationWarning
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S9BCG5CN4G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-S9BCG5CN4G');
          `}
        </Script>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}

