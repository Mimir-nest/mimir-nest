// Every tool in the product, grouped the way the navbar groups them.
// The homepage counts and diagrams read from this list, so they always match what actually exists.
export const categories = [
  {
    key: "study",
    label: "Study",
    items: [
      { name: "CGPA Calculator", path: "/cgpa", pixel: "calc", description: "Calculate grades and predict GPA" },
      { name: "Focus Timer", path: "/pomodoro", pixel: "clock", description: "Pomodoro sessions for deep work" },
      { name: "Typing Practice", path: "/typing", pixel: "keyboard", description: "Improve typing speed and accuracy" }
    ]
  },
  {
    key: "prepare",
    label: "Prepare",
    items: [
      { name: "Bug Squash Arena", path: "/arena", pixel: "bug", description: "Fix real incidents in an in-browser IDE" },
      { name: "Placement DSA", path: "/placement-dsa", pixel: "laptop", description: "Technical interview coding prep" },
      { name: "System Design Problems", path: "/system-design/problems", pixel: "server", description: "Real-world architecture problems & constraints" },
      { name: "System Design", path: "/system-design", pixel: "doc", description: "500+ system design interview Q&A" },
      { name: "System Design Guide", path: "/system-design-guide", pixel: "cap", description: "Chapter-by-chapter concepts & theory" },
      { name: "AI Interview", path: "/interview", pixel: "chat", description: "GitHub-based AI mock interview", badge: "Soon" },
      { name: "Non-Technical Interview Prep", path: "/interview-prep", pixel: "chat", description: "Non-technical Q&A for 7 interview roles" }
    ]
  },
  {
    key: "build",
    label: "Build",
    items: [
      { name: "Projects", path: "/projects", pixel: "blocks", description: "Inspirational project templates" },
      { name: "Roadmaps", path: "/roadmaps", pixel: "map", description: "Structured visual learning paths" }
    ]
  },
  {
    key: "learn",
    label: "Learn",
    items: [
      { name: "Courses", path: "/courses", pixel: "books", description: "Free, curated high-quality courses" }
    ]
  },
  {
    key: "resources",
    label: "Resources",
    items: [
      { name: "Student Perks", path: "/email-perks", pixel: "gift", description: "Academic benefits and discounts" }
    ]
  }
];

export const ALL_TOOLS = categories.flatMap((c) => c.items.map((i) => ({ ...i, category: c.key })));
