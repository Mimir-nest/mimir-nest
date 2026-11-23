import Link from "next/link";
import { Logo, PixelStrip } from "@/components/pixel";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: "Product",
      links: [
        { name: "Study", path: "/cgpa" },
        { name: "Prepare", path: "/placement-dsa" },
        { name: "Build", path: "/projects" },
        { name: "Learn", path: "/courses" },
        { name: "Resources", path: "/email-perks" },
        { name: "AI Interview (Soon)", path: "/interview" }
      ]
    },
    {
      title: "Project",
      links: [
        { name: "About", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Contributing", path: "/contributing" },
        { name: "GitHub", path: "https://github.com/Mimir-nest/mimir-nest", isExternal: true },
        { name: "LinkedIn", path: "https://www.linkedin.com/company/mimir-nest/", isExternal: true },
        { name: "Changelog", path: "https://github.com/Mimir-nest/mimir-nest/releases", isExternal: true },
        { name: "License", path: "/license" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", path: "/privacy" },
        { name: "Security", path: "/security" },
        { name: "Contact", path: "/contact" }
      ]
    }
  ];

  return (
    <footer className="w-full bg-panel2">
      <div className="border-t-2 border-pop"><PixelStrip seed={4} tint="green" /></div>
      <div className="pixel-grid border-t-2 border-pop">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity">
              <Logo size={30} />
              <span className="kicker !text-fg">Mimir Nest</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed font-body-md text-sm mb-4">
              Mimir Nest is an open-source platform built to help students learn, build & launch — providing free tools and resources for study, placement, and career preparation.
            </p>
          </div>

          {/* Map Columns */}
          {columns.map((col) => (
            <div key={col.title} className="col-span-1">
              <h3 className="kicker mb-3">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {link.isExternal ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded text-fg text-sm underline decoration-line underline-offset-4 hover:decoration-accent inline-block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        className="rounded text-fg text-sm underline decoration-line underline-offset-4 hover:decoration-accent inline-block"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-body-md text-sm text-center sm:text-left">
            © {currentYear} Mimir Nest. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <span>
              Built by{" "}
              <a
                href="https://www.linkedin.com/in/sachinskyte"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors font-medium"
              >
                Sachin Patel
              </a>
            </span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
