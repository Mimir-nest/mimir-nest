export const metadata = {
  title: "Frequently Asked Questions | Mimir Nest",
  description: "Get clear answers to questions about Mimir Nest's tools, CGPA formulas, DSA preparation, privacy, and community contributions.",
  alternates: {
    canonical: "https://mimirnest.vercel.app/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Mimir Nest",
    description: "Get clear answers to questions about Mimir Nest's tools, CGPA formulas, DSA preparation, privacy, and community contributions.",
    url: "https://mimirnest.vercel.app/faq",
  },
  twitter: {
    title: "Frequently Asked Questions | Mimir Nest",
    description: "Get clear answers to questions about Mimir Nest's tools, CGPA formulas, DSA preparation, privacy, and community contributions.",
  },
};

export default function FaqLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How accurate is the CGPA calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The CGPA calculator uses standard academic weighted credit formulas to provide mathematically rigorous calculations. It accounts for course credits and grade points to compute cumulative GPA and predict future semester targets."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Pomodoro Timer work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Pomodoro Timer follows the proven focus technique with 25-minute concentrated work sprints followed by 5-minute rejuvenating breaks. After completing 4 cycles, you receive a longer 15-minute break with customizable intervals and soundscapes."
          }
        },
        {
          "@type": "Question",
          "name": "Are the Roadmaps customizable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our Roadmaps are designed to be flexible. While we provide curated learning pathways for various tech domains, you can follow them according to your custom schedule and pacing."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data secure and private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We take data privacy seriously. All your academic calculations and timer settings are processed locally in your browser storage. We do not sell or distribute user information."
          }
        },
        {
          "@type": "Question",
          "name": "How do I access the Placement DSA questions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Placement DSA vault contains curated questions from 190+ top tech companies. You can filter by company, difficulty, or topic. All questions are freely accessible and include frequency ranks and acceptance rate statistics."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use Mimir Nest offline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Core tools like the Pomodoro Timer, Typing Practice, and CGPA Calculator work offline once loaded into your browser cache."
          }
        },
        {
          "@type": "Question",
          "name": "Is Mimir Nest free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Mimir Nest is 100% free to use. All our calculators, timers, curriculums, and interview archives are accessible without paywalls."
          }
        },
        {
          "@type": "Question",
          "name": "How often is the content updated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We continuously update our company question sets, course catalog, and student perks database as new resources and interview trends emerge."
          }
        },
        {
          "@type": "Question",
          "name": "Can I contribute to the platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! We welcome community contributions. You can submit questions, build features, report issues, or suggest new toolkits via our GitHub repository."
          }
        },
        {
          "@type": "Question",
          "name": "What browsers are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mimir Nest is optimized for all modern web browsers including Chrome, Firefox, Safari, Edge, and mobile web clients."
          }
        }
      ]
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
          "name": "FAQ",
          "item": "https://mimirnest.vercel.app/faq"
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
