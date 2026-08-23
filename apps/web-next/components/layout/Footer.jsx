import Link from "next/link";
import { Calculator, Clock, Code, BookMarked, Mail, Keyboard, FolderOpen, } from "lucide-react";
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const features = [
        { name: "CGPA Calculator", path: "/cgpa", icon: Calculator },
        { name: "Pomodoro Timer", path: "/pomodoro", icon: Clock },
        { name: "Placement DSA", path: "/placement-dsa", icon: Code },
        { name: "Projects", path: "/projects", icon: FolderOpen },
        { name: "Typing", path: "/typing", icon: Keyboard },
        { name: "Courses", path: "/courses", icon: BookMarked },
        { name: "Email Perks", path: "/email-perks", icon: Mail },
    ];
    return (<footer className="w-full rounded-t-3xl bg-surface-container relative overflow-hidden border-t border-border/50">
      {/* Subtle decorative rings */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-surface-tint/5 translate-x-1/3 -translate-y-1/3 pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-primary-container/20 -translate-x-1/2 translate-y-1/2 pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity">
              <img src="/logo/logo.png" alt="Mimir Nest" className="h-8 w-auto"/>
              <span className="text-xl font-bold text-foreground font-headline-md">Mimir Nest</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed font-body-md text-sm mb-4">
              A premium academic platform for learning, preparation, and steady
              progress.
            </p>
            <div className="w-12 h-0.5 bg-border/55 rounded-full"/>
          </div>

          {/* Features column */}
          <div className="col-span-1">
            <h3 className="font-label-caps text-label-caps text-muted-foreground/60 tracking-widest uppercase mb-5">
              Features
            </h3>
            <ul className="space-y-3">
              {features.map((feature) => (<li key={feature.name}>
                  <Link href={feature.path} className="text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center group text-sm font-body-md">
                    <feature.icon className="h-3.5 w-3.5 mr-2.5 group-hover:text-surface-tint transition-colors flex-shrink-0"/>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {feature.name}
                    </span>
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Quick Links column */}
          <div className="col-span-1">
            <h3 className="font-label-caps text-label-caps text-muted-foreground/60 tracking-widest uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "FAQ", path: "/faq" },
            { name: "Privacy Policy", path: "/privacy" },
        ].map((link) => (<li key={link.name}>
                  <Link href={link.path} className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 transform inline-block text-sm font-body-md">
                    {link.name}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="col-span-1">
            <h3 className="font-label-caps text-label-caps text-muted-foreground/60 tracking-widest uppercase mb-5">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Mimir-nest" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 transform">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/sachinskyte" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 transform">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/60 font-body-md text-sm text-center sm:text-left">
            © {currentYear} Mimir Nest. All rights reserved.{" "}
            <span className="text-muted-foreground/40 text-xs">
              Made by{" "}
              <a href="https://www.linkedin.com/in/sachinskyte" target="_blank" rel="noopener noreferrer" className="underline hover:text-muted-foreground transition-colors">
                Sachin Patel
              </a>
            </span>
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-muted-foreground/60 hover:text-foreground transition-colors text-xs font-label-caps tracking-widest">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>);
};
export default Footer;
