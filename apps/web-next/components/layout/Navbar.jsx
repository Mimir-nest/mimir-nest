"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Calculator,
  Clock,
  Code,
  FolderOpen,
  Keyboard,
  BookMarked,
  Mail,
  Map,
  BookOpen,
  GraduationCap,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import AuthModal from "./AuthModal";

const categories = [
  {
    key: "study",
    label: "Study",
    items: [
      { name: "CGPA Calculator", path: "/cgpa", icon: Calculator, description: "Calculate grades and predict GPA" },
      { name: "Focus Timer", path: "/pomodoro", icon: Clock, description: "Pomodoro sessions for deep work" },
      { name: "Typing Practice", path: "/typing", icon: Keyboard, description: "Improve typing speed and accuracy" }
    ]
  },
  {
    key: "prepare",
    label: "Prepare",
    items: [
      { name: "Placement DSA", path: "/placement-dsa", icon: Code, description: "Technical interview coding prep" },
      { name: "System Design", path: "/system-design", icon: BookOpen, description: "500+ system design interview Q&A" },
      { name: "System Design Guide", path: "/system-design-guide", icon: GraduationCap, description: "Chapter-by-chapter concepts & theory" }
    ]
  },
  {
    key: "build",
    label: "Build",
    items: [
      { name: "Projects", path: "/projects", icon: FolderOpen, description: "Inspirational project templates" },
      { name: "Roadmaps", path: "/roadmaps", icon: Map, description: "Structured visual learning paths" }
    ]
  },
  {
    key: "learn",
    label: "Learn",
    items: [
      { name: "Courses", path: "/courses", icon: BookMarked, description: "Free, curated high-quality courses" }
    ]
  },
  {
    key: "resources",
    label: "Resources",
    items: [
      { name: "Student Perks", path: "/email-perks", icon: Mail, description: "Academic benefits and discounts" }
    ]
  }
];

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, logout, checkAuth, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveCategory(null);
      }
    };
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveCategory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={dropdownRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out hidden md:block",
        scrolled
          ? "bg-mn-surface/90 backdrop-blur-md border-b border-outline-variant/40 shadow-sm py-3"
          : "bg-mn-surface/80 backdrop-blur-sm border-b border-white/5 shadow-sm py-4"
      )}
    >
      <div className="flex justify-between items-center px-16 max-w-full">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <img src="/logo/logo.png" alt="Mimir Nest" className="h-8 w-auto" />
          <span className="font-headline-md text-xl font-bold text-foreground">
            Mimir <span className="text-surface-tint">Nest</span>
          </span>
        </Link>

        {/* Navigation Categories */}
        <div className="flex items-center gap-8">
          {categories.map((cat) => {
            const isCategoryActive = cat.items.some((item) => pathname === item.path);
            return (
              <div
                key={cat.key}
                className="relative py-2"
                onMouseEnter={() => setActiveCategory(cat.key)}
              >
                <button
                  onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                  className={cn(
                    "font-body-md text-body-md transition-all duration-200 flex items-center gap-1 hover:text-surface-tint border-none bg-transparent cursor-pointer text-on-surface-variant",
                    isCategoryActive || activeCategory === cat.key ? "text-surface-tint font-semibold" : ""
                  )}
                  aria-expanded={activeCategory === cat.key}
                  aria-haspopup="true"
                >
                  {cat.label}
                </button>

                {activeCategory === cat.key && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl bg-mn-surface border border-outline-variant/40 p-2 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg hover:bg-surface-container transition-colors text-left",
                            pathname === item.path ? "bg-surface-container-low" : ""
                          )}
                          onClick={() => setActiveCategory(null)}
                        >
                          {item.icon && <item.icon className="w-5 h-5 mt-0.5 text-surface-tint flex-shrink-0" />}
                          <div>
                            <div className="text-sm font-semibold text-foreground">{item.name}</div>
                            <div className="text-xs text-on-surface-variant/80 mt-0.5 leading-normal">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Blog link */}
          <Link
            href="/blog"
            className={cn(
              "font-body-md text-body-md text-on-surface-variant hover:text-surface-tint transition-colors",
              pathname.startsWith("/blog") ? "text-surface-tint font-semibold" : ""
            )}
          >
            Blog
          </Link>

          {/* GitHub link */}
          <a
            href="https://github.com/Mimir-nest/mimir-nest"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body-md text-body-md text-on-surface-variant hover:text-surface-tint transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Explore Tools CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/#features"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity tracking-widest font-semibold border-none"
          >
            Explore Tools
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 bg-surface-container border border-outline-variant/30 px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-surface-tint" />
                <span className="text-sm font-semibold text-foreground max-w-[120px] truncate">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={() => logout()}
                className="text-on-surface-variant hover:text-destructive transition-colors ml-1 border-none bg-transparent cursor-pointer flex items-center"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-foreground px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer border-none"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
};

/* Mobile nav — separate component */
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const pathname = usePathname();

  const { user, isAuthenticated, logout, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthStore();

  useEffect(() => {
    setIsOpen(false);
    setExpandedSection(null);
  }, [pathname]);

  // Prevent background page scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="md:hidden fixed top-0 w-full z-50 bg-mn-surface px-6 h-16 flex justify-between items-center border-b border-outline-variant shadow-md">
      <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <img src="/logo/logo.png" alt="Mimir Nest" className="h-8 w-auto" />
        <span className="font-bold text-foreground text-xl">
          Mimir <span className="text-surface-tint">Nest</span>
        </span>
      </Link>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-on-background p-1.5 rounded-lg hover:bg-surface-container transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-mn-surface border-b border-outline-variant shadow-xl animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {categories.map((cat) => {
              const isExpanded = expandedSection === cat.key;
              return (
                <div key={cat.key} className="space-y-1">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : cat.key)}
                    className="flex justify-between items-center w-full px-4 py-3 rounded-lg text-sm font-semibold text-on-surface-variant hover:text-surface-tint hover:bg-surface-container transition-colors border-none bg-transparent text-left"
                  >
                    <span>{cat.label}</span>
                    <span
                      className="text-[10px] transition-transform duration-200"
                      style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                    >
                      ▶
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="pl-6 space-y-1">
                      {cat.items.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                          <Link
                            key={item.name}
                            href={item.path}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                              isActive
                                ? "bg-surface-container-high text-surface-tint font-semibold"
                                : "text-on-surface-variant/80 hover:text-surface-tint hover:bg-surface-container"
                            )}
                          >
                            {item.icon && <item.icon className="h-4.5 w-4.5 flex-shrink-0" />}
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Blog Link */}
            <Link
              href="/blog"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                pathname.startsWith("/blog")
                  ? "bg-surface-container-high text-surface-tint font-semibold"
                  : "text-on-surface-variant hover:text-surface-tint hover:bg-surface-container"
              )}
            >
              <BookOpen className="h-5 w-5 flex-shrink-0 text-surface-tint" />
              Blog
            </Link>

            {/* GitHub Link */}
            <a
              href="https://github.com/Mimir-nest/mimir-nest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-on-surface-variant hover:text-surface-tint hover:bg-surface-container transition-colors"
            >
              <Code className="h-5 w-5 flex-shrink-0" />
              GitHub
            </a>

            {/* Auth Link (Mobile) */}
            {isAuthenticated ? (
              <div className="pt-4 border-t border-outline-variant/40 space-y-2">
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-on-surface-variant"
                >
                  <UserIcon className="h-5 w-5 text-surface-tint flex-shrink-0" />
                  <span className="max-w-[200px] truncate">{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-destructive hover:bg-surface-container transition-colors border-none bg-transparent text-left cursor-pointer"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-outline-variant/40">
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-primary hover:text-primary-foreground hover:bg-primary transition-colors border border-primary/20 bg-transparent text-left cursor-pointer"
                >
                  <UserIcon className="h-5 w-5 flex-shrink-0" />
                  Sign In / Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
};

const NavbarWrapper = () => (
  <>
    <Navbar />
    <MobileNav />
  </>
);

export default NavbarWrapper;
