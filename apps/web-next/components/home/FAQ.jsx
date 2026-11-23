"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Mimir Nest?",
      answer:
        "Mimir Nest is an open-source platform for students and developers to learn, build projects, and prepare for technical interviews. It brings together learning resources, courses, DSA preparation, projects, and other career-focused tools in one place.",
    },
    {
      question: "Is Mimir Nest free to use?",
      answer:
        "Yes. The core Mimir Nest learning resources are available for free. The project is open source, and anyone can explore the platform and its resources without requiring an account.",
    },
    {
      question: "Do I need an account to use Mimir Nest?",
      answer:
        "No. You can browse and use the public learning resources without signing in. An account is only needed for features that require persistent user data, such as saving progress or bookmarks.",
    },
    {
      question: "Is Mimir Nest open source?",
      answer:
        "Yes. Mimir Nest is an open-source project. Its source code and open learning content are publicly available, and contributions from the community are welcome.",
    },
    {
      question: "What is Mimir Interview?",
      badge: "Coming Soon",
      answer:
        "Mimir Interview is an upcoming AI mock interview experience from the Mimir ecosystem (Coming Soon). It is being designed around your actual GitHub projects, with the goal of providing live, conversational interviews that can ask follow-up questions based on the work you have built.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Mimir Nest is designed to keep user data protected and to collect only what is necessary for features that require an account. Sensitive credentials and API keys should never be exposed in the frontend. For future GitHub-based interview features, repository access will be explicitly scoped and handled with appropriate permissions.",
    },
  ];

  return (
    <section id="faq" className="py-14 sm:py-24 px-4 sm:px-5 bg-panel2 border-b border-line">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="kicker mb-3">07 · Questions</p>
          <h2 className="display text-[2.1rem] leading-[1.08] sm:text-5xl text-fg mb-4">
            Frequently asked questions
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant">
            Find answers to the most common questions about Mimir Nest
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-line rounded-2xl px-5 sm:px-6 bg-panel data-[state=open]:pop transition-shadow"
            >
              <AccordionTrigger className="text-fg hover:text-surface-tint text-left py-5 text-base md:text-lg font-semibold [&[data-state=open]>svg]:rotate-180 no-underline hover:no-underline">
                <span className="flex items-center gap-2.5 flex-wrap">
                  <span>{faq.question}</span>
                  {faq.badge && (
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-surface-tint/15 text-surface-tint border border-surface-tint/30">
                      {faq.badge}
                    </span>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-on-surface-variant pb-6 font-body-md text-sm md:text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
