"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calculator, Clock, Map, Code, BookMarked, Mail, Keyboard, FolderOpen, BookOpen, Search, } from "lucide-react";
import { cn } from "@/lib/utils";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "CGPA Scan", path: "/cgpa", icon: Calculator },
        { name: "Pomodoro", path: "/pomodoro", icon: Clock },
        { name: "Placement DSA", path: "/placement-dsa", icon: Code },
        { name: "Projects", path: "/projects", icon: FolderOpen },
        { name: "Typing", path: "/typing", icon: Keyboard },
        { name: "Courses", path: "/courses", icon: BookMarked },
        { name: "Email Perks", path: "/email-perks", icon: Mail },
        { name: "Roadmaps", path: "/roadmaps", icon: Map },
    ];
    return (<nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out hidden md:block", scrolled
            ? "bg-mn-surface/85 backdrop-blur-xl border-b border-outline-variant/40 shadow-sm py-3"
            : "bg-mn-surface/80 backdrop-blur-md border-b border-white/5 shadow-sm py-4")}>
      <div className="flex justify-between items-center px-16 max-w-full">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/logo/logo.svg" alt="Mimir Nest" className="h-8 w-auto"/>
          <span className="font-headline-md text-xl font-bold text-foreground">Mimir <span className="text-surface-tint">Nest</span></span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {navLinks.slice(1).map((link) => (<Link key={link.name} href={link.path} className={cn("font-body-md text-body-md transition-all duration-300 ease-in-out pb-1", pathname === link.path
                ? "text-surface-tint font-semibold border-b-2 border-surface-tint"
                : "text-on-surface-variant hover:text-surface-tint")}>
              {link.name}
            </Link>))}
        </div>

        {/* Trailing actions */}
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-surface-tint transition-colors p-2 rounded-lg hover:bg-surface-container">
            <Search className="w-5 h-5"/>
          </button>
          <Link href="/placement-dsa" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity tracking-widest font-semibold border-none">
            Get Started
          </Link>
        </div>
      </div>
    </nav>);
};
/* Mobile nav — separate component rendered below */
const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);
    const navLinks = [
        { name: "Home", path: "/", icon: BookOpen },
        { name: "CGPA Scan", path: "/cgpa", icon: Calculator },
        { name: "Pomodoro", path: "/pomodoro", icon: Clock },
        { name: "Placement DSA", path: "/placement-dsa", icon: Code },
        { name: "Projects", path: "/projects", icon: FolderOpen },
        { name: "Typing", path: "/typing", icon: Keyboard },
        { name: "Courses", path: "/courses", icon: BookMarked },
        { name: "Email Perks", path: "/email-perks", icon: Mail },
        { name: "Roadmaps", path: "/roadmaps", icon: Map },
    ];
    return (<nav className="md:hidden fixed top-0 w-full z-50 bg-mn-surface/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-outline-variant/30 shadow-sm">
      <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <img src="/logo/logo.svg" alt="Mimir Nest" className="h-8 w-auto"/>
        <span className="font-bold text-foreground text-xl">Mimir <span className="text-surface-tint">Nest</span></span>
      </Link>
      <button onClick={() => setIsOpen(!isOpen)} className="text-on-background p-1.5 rounded-lg hover:bg-surface-container transition-colors">
        {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (<div className="absolute top-full left-0 right-0 bg-mn-surface/98 backdrop-blur-2xl border-b border-outline-variant/40 animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (<Link key={link.name} href={link.path} className={cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200", pathname === link.path
                    ? "bg-surface-container-high text-surface-tint border border-surface-tint/20"
                    : "text-on-surface-variant hover:text-surface-tint hover:bg-surface-container border border-transparent")}>
                {link.icon && <link.icon className="h-5 w-5 flex-shrink-0"/>}
                {link.name}
              </Link>))}
          </div>
        </div>)}
    </nav>);
};
const NavbarWrapper = () => (<>
    <Navbar />
    <MobileNav />
  </>);
export default NavbarWrapper;
