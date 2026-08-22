"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
const FAQ = () => {
    const faqs = [
        {
            question: "How accurate is the CGPA calculator?",
            answer: "The CGPA calculator uses standard academic formulas to provide accurate calculations. It takes into account your course credits and grades to give you a precise cumulative GPA. You can also use it to predict future performance.",
        },
        {
            question: "How does the Pomodoro Timer work?",
            answer: "The Pomodoro Timer follows the popular productivity technique with 25-minute focused work sessions followed by 5-minute breaks. After completing 4 sessions, you get a longer 15-minute break. You can customize these intervals based on your preferences.",
        },
        {
            question: "Are the Roadmaps customizable?",
            answer: "Yes, our Roadmaps are designed to be flexible. While we provide curated learning paths for various subjects and tech fields, you can customize them according to your learning goals and pace.",
        },
        {
            question: "Is my data secure and private?",
            answer: "We take data privacy seriously. All your academic data is stored securely and is only accessible to you. We don't share your information with third parties, and you can delete your data at any time.",
        },
    ];
    return (<section className="py-16 md:py-[120px] px-6 md:px-16 bg-mn-background border-t border-outline-variant/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <span className="font-label-caps text-label-caps text-surface-tint tracking-widest block mb-3">
            SUPPORT
          </span>
          <h2 className="font-headline-lg text-headline-lg text-mn-primary mb-4">
            Frequently Asked{" "}
            <span className="text-surface-tint">Questions</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Find answers to the most common questions about Mimir Nest
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (<AccordionItem key={index} value={`item-${index}`} className="border border-outline-variant/50 rounded-[24px] px-6 bg-surface-container-lowest data-[state=open]:bg-surface-container/50 transition-all duration-300 shadow-sm">
              <AccordionTrigger className="text-mn-primary hover:text-surface-tint text-left py-6 text-base md:text-headline-md [&[data-state=open]>svg]:rotate-180 no-underline hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-on-surface-variant pb-6 font-body-md text-body-md leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>))}
        </Accordion>
      </div>
    </section>);
};
export default FAQ;
