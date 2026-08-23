import React from "react";
import {
  Calculator,
  Clock,
  Code,
  FolderOpen,
  Keyboard,
  BookMarked,
  Mail,
  Map,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const productCategories = [
  {
    title: "Study",
    subtitle: "Tools for everyday college life.",
    description: "CGPA calculation, focused study sessions, and typing practice.",
    icon: Calculator,
    items: [
      { name: "CGPA Calculator", path: "/cgpa", icon: Calculator },
      { name: "Focus Timer", path: "/pomodoro", icon: Clock },
      { name: "Typing Practice", path: "/typing", icon: Keyboard }
    ]
  },
  {
    title: "Prepare",
    subtitle: "Get ready for placements.",
    description: "DSA practice and technical interview preparation.",
    icon: Code,
    items: [
      { name: "Placement DSA", path: "/placement-dsa", icon: Code }
    ]
  },
  {
    title: "Build",
    subtitle: "Turn ideas into projects.",
    description: "Project ideas and structured roadmaps for building practical skills.",
    icon: FolderOpen,
    items: [
      { name: "Projects", path: "/projects", icon: FolderOpen },
      { name: "Roadmaps", path: "/roadmaps", icon: Map }
    ]
  },
  {
    title: "Learn",
    subtitle: "Learn without the paywall.",
    description: "Curated courses and learning resources.",
    icon: BookMarked,
    items: [
      { name: "Courses", path: "/courses", icon: BookMarked }
    ]
  },
  {
    title: "Resources",
    subtitle: "Make your student status count.",
    description: "Student discounts, developer programs, credits, software licenses, and academic benefits.",
    icon: Mail,
    items: [
      { name: "Student Perks", path: "/email-perks", icon: Mail }
    ]
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-[100px] px-6 md:px-16 bg-mn-background max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <span className="font-label-caps text-xs text-surface-tint tracking-widest block mb-3 font-semibold uppercase">
            Platform Structure
          </span>
          <h2 className="font-display-md text-3xl md:text-4xl text-foreground mb-4">
            Everything you need, organized.
          </h2>
          <p className="font-body-md text-base text-on-surface-variant">
            Navigate the platform by what you are trying to accomplish. Clean, single-purpose tools with zero paywalls.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="rounded-2xl bg-surface-container-lowest border border-border/40 p-8 flex flex-col justify-between hover:border-surface-tint/30 transition-all duration-200 shadow-sm"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-surface-tint/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-surface-tint" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-headline-md text-lg font-bold text-foreground">
                        {category.title}
                      </h3>
                      <div className="text-xs text-surface-tint font-medium mt-0.5">
                        {category.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Sub-item Links */}
                <div className="flex flex-col gap-2 mt-4">
                  {category.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors group cursor-pointer border border-transparent hover:border-border/30"
                    >
                      <span className="text-sm font-semibold text-foreground group-hover:text-surface-tint transition-colors">
                        {item.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-on-surface-variant/70 group-hover:text-surface-tint group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom indicator */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2.5 text-on-surface-variant/70 text-sm font-body-md">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Open source. Free for all students.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
