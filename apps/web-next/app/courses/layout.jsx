export const metadata = {
  title: "Student Courses & Learning Resources | Mimir Nest",
  description: "Discover handpicked free online courses and structured academic learning paths tailored for university students.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/courses",
  },
  openGraph: {
    title: "Student Courses & Learning Resources | Mimir Nest",
    description: "Discover handpicked free online courses and structured academic learning paths tailored for university students.",
    url: "https://mimirnest.vercel.app/courses",
  },
  twitter: {
    title: "Student Courses & Learning Resources | Mimir Nest",
    description: "Discover handpicked free online courses and structured academic learning paths tailored for university students.",
  },
};

export default function CoursesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Student Courses & Learning Resources | Mimir Nest",
    "description": "Discover handpicked free online courses and structured academic learning paths tailored for university students.",
    "url": "https://mimirnest.vercel.app/courses",
    "breadcrumb": {
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
          "name": "Courses",
          "item": "https://mimirnest.vercel.app/courses"
        }
      ]
    }
  };

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
