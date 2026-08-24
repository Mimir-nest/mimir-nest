import Link from "next/link";

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
        { name: "Resources", path: "/email-perks" }
      ]
    },
    {
      title: "Project",
      links: [
        { name: "About", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Contributing", path: "/contributing" },
        { name: "GitHub", path: "https://github.com/Mimir-nest/mimir-nest", isExternal: true },
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
    <footer className="w-full rounded-t-3xl bg-surface-container relative overflow-hidden border-t border-border/50">
      {/* Subtle decorative rings */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-surface-tint/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/20 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity">
              <img src="/logo/logo.png" alt="Mimir Nest" className="h-8 w-auto" />
              <span className="text-xl font-bold text-foreground font-headline-md">Mimir Nest</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed font-body-md text-sm mb-4">
              Mimir Nest is an open-source collection of tools and resources built to help students study, prepare, and build.
            </p>
            <div className="w-12 h-0.5 bg-border/55 rounded-full" />
          </div>

          {/* Map Columns */}
          {columns.map((col) => (
            <div key={col.title} className="col-span-1">
              <h3 className="font-label-caps text-label-caps text-muted-foreground/60 tracking-widest uppercase mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {link.isExternal ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-all duration-200 text-sm font-body-md hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        className="text-muted-foreground hover:text-foreground transition-all duration-200 text-sm font-body-md hover:translate-x-1 transform inline-block"
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
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/60 font-body-md text-sm text-center sm:text-left">
            © {currentYear} Mimir Nest. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground/60">
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
    </footer>
  );
};

export default Footer;
