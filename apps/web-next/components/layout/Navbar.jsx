"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  LogOut,
  User as UserIcon,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/tools";
import { useAuthStore } from "@/store/useAuthStore";
import AuthModal from "./AuthModal";
import ThemeToggle from "./ThemeToggle";
import { Logo, PixelIcon } from "@/components/pixel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";



const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, logout, checkAuth, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    checkAuth();

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("verified") === "true") {
        toast.success("Email verified successfully! Please sign in.");
        openAuthModal("signin");
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, [checkAuth, openAuthModal]);

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
      suppressHydrationWarning
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out hidden md:block",
        "bg-bg/95 backdrop-blur-sm border-b border-line",
        scrolled ? "py-2" : "py-2.5"
      )}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-full">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Logo size={26} />
          <span className="kicker !text-fg">Mimir Nest</span>
          <span className="hidden xl:inline-flex items-center gap-1 rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] text-outline"><span aria-hidden className="px-blink size-1.5 bg-good" />open source</span>
        </Link>

        {/* Navigation Categories */}
        <div className="flex items-center gap-0.5">
          {categories.map((cat, idx) => {
            const isCategoryActive = cat.items.some((item) => pathname === item.path || pathname.startsWith(item.path + "/"));
            return (
              <div
                key={cat.key}
                className="relative py-2"
                onMouseEnter={() => setActiveCategory(cat.key)}
              >
                <button
                  suppressHydrationWarning
                  onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[12px] uppercase tracking-wide flex items-center gap-1.5 border-none bg-transparent cursor-pointer text-muted-foreground hover:bg-panel2 hover:text-fg",
                    isCategoryActive || activeCategory === cat.key ? "bg-panel2 text-fg" : ""
                  )}
                  aria-expanded={activeCategory === cat.key}
                  aria-haspopup="true"
                >
                  <span className="text-[10px] text-outline">0{idx + 1}</span>{cat.label}
                </button>
                {/* active section marker: one accent pixel under the label */}
                {isCategoryActive && <span aria-hidden className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 bg-surface-tint" />}

                {activeCategory === cat.key && (
                  <div
                    className="pop absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-panel p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className="flex flex-col gap-1">
                      {cat.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl hover:bg-panel2 transition-colors text-left",
                            pathname === item.path ? "bg-panel2" : ""
                          )}
                          onClick={() => setActiveCategory(null)}
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-panel2"><PixelIcon name={item.pixel} size={22} /></span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-sm font-semibold text-foreground">{item.name}</span>
                              {item.badge && (
                                <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.2 rounded bg-surface-tint/15 text-surface-tint border border-surface-tint/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>
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
              "whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[12px] uppercase tracking-wide text-muted-foreground hover:bg-panel2 hover:text-fg",
              pathname.startsWith("/blog") ? "bg-panel2 text-fg" : ""
            )}
          >
            Blog
          </Link>

          {/* GitHub link */}
          <a
            href="https://github.com/Mimir-nest/mimir-nest"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[12px] uppercase tracking-wide text-muted-foreground hover:bg-panel2 hover:text-fg flex items-center gap-1.5"
            title="MimirNest GitHub Repository"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Explore Tools CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#features"
            className="pop rounded-full bg-primary text-primary-foreground px-4 py-1.5 font-medium text-sm hover:-translate-y-0.5 transition-transform"
          >
            Explore Tools
          </Link>

          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-2.5 bg-panel border border-line pl-1.5 pr-3 py-1 rounded-full">
              <Avatar className="w-7 h-7 border border-surface-tint/30 shrink-0">
                <AvatarImage src={user?.avatarUrl} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/20 text-surface-tint text-xs font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground max-w-[120px] truncate leading-tight">
                  {user?.name}
                </span>
                <span className="text-[10px] text-on-surface-variant/70 max-w-[120px] truncate leading-none">
                  {user?.email}
                </span>
              </div>
              <button
                onClick={() => logout()}
                className="text-on-surface-variant hover:text-destructive transition-colors ml-1 p-1 rounded-lg hover:bg-surface-container-high border-none bg-transparent cursor-pointer flex items-center"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-line px-3 py-1.5 text-sm text-muted-foreground hover:border-fg hover:text-fg transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
};

/* Mobile nav — separate component */
const MobileNav = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const pathname = usePathname();

  const { user, isAuthenticated, logout, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <nav suppressHydrationWarning className="md:hidden fixed top-0 w-full z-50 bg-bg/95 backdrop-blur-sm px-4 sm:px-6 h-16 flex justify-between items-center border-b border-line">
      <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <Logo size={26} />
        <span className="kicker !text-fg">Mimir Nest</span>
      </Link>
      <div className="flex items-center gap-2">
      <ThemeToggle />
      <button
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center rounded-full border border-line px-3 py-1.5 text-muted-foreground hover:border-fg hover:text-fg"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg border-b border-line shadow-pop animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {categories.map((cat) => {
              const isExpanded = expandedSection === cat.key;
              return (
                <div key={cat.key} className="space-y-1">
                  <button
                    suppressHydrationWarning
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
                            <PixelIcon name={item.pixel} size={18} />
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                              <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.2 rounded bg-surface-tint/15 text-surface-tint border border-surface-tint/30">
                                {item.badge}
                              </span>
                            )}
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
              <Github className="h-5 w-5 flex-shrink-0 text-surface-tint" />
              GitHub
            </a>

            {/* Auth Link (Mobile) */}
            {mounted && isAuthenticated ? (
              <div className="pt-4 border-t border-outline-variant/40 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-container/60 border border-outline-variant/30">
                  <Avatar className="w-9 h-9 border border-surface-tint/30 shrink-0">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/20 text-surface-tint text-sm font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left min-w-0 flex-1">
                    <span className="text-sm font-semibold text-foreground truncate">
                      {user?.name}
                    </span>
                    <span className="text-xs text-on-surface-variant/70 truncate">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors border-none bg-transparent text-left cursor-pointer"
                >
                  <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-outline-variant/40">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/95 transition-colors border-none cursor-pointer shadow-sm"
                >
                  <UserIcon className="h-4.5 w-4.5 flex-shrink-0" />
                  Sign In / Create Account
                </Link>
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
