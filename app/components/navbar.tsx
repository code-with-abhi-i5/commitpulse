'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Activity, Moon, Sun, ExternalLink } from 'lucide-react';
import { useGlowEffect } from '@/hooks/useGlowEffect';
import { useThemeToggle } from './theme-switch';

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

const NAV_LINKS = [
  {
    label: 'Generator',
    href: '/generator',
    isExternal: false,
    isPrimary: false,
  },
  {
    label: 'Compare',
    href: '/compare',
    isExternal: false,
    isPrimary: false,
  },
  {
    label: 'Customization Studio',
    href: '/#customization-studio',
    isExternal: false,
    isPrimary: false,
  },
  {
    label: 'GitHub Repo',
    href: 'https://github.com/JhaSourav07/commitpulse',
    isExternal: true,
    isPrimary: true,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoHovered, setLogoHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const { shellRef, shellVars, handleMouseEnter, handleMouseMove, handleMouseLeave } =
    useGlowEffect();
  const { isDark, mounted, toggleTheme } = useThemeToggle({
    variant: 'circle',
    start: 'top-right',
  });

  // Scroll detection for sticky behavior & progress bar
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 20);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setScrollProgress(Math.min(scrollY / docHeight, 1));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on breakpoint change
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    const initialCheckTimer = setTimeout(() => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    }, 0);

    mediaQuery.addEventListener('change', handleBreakpointChange);

    return () => {
      clearTimeout(initialCheckTimer);
      mediaQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLogoClick = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-500 ease-out ${
        scrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div
          ref={shellRef}
          className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${
            scrolled
              ? 'border-gray-200/60 bg-white/70 shadow-lg shadow-black/5 dark:border-white/15 dark:bg-[#0a0a0a]/75 dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
              : 'border-gray-200/80 bg-white/80 shadow-sm dark:border-white/20 dark:bg-[#0a0a0a]/60 dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
          } backdrop-blur-xl`}
          style={shellVars}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Scroll Progress Indicator */}
          <div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 transition-opacity duration-300 z-20"
            style={{
              width: `${scrollProgress * 100}%`,
              opacity: scrollProgress > 0.01 ? 1 : 0,
            }}
          />
          <div
            className="absolute top-0 left-0 h-[2px] blur-sm bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 transition-opacity duration-300 z-20"
            style={{
              width: `${scrollProgress * 100}%`,
              opacity: scrollProgress > 0.01 ? 0.6 : 0,
            }}
          />

          {/* Glow effects */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out hidden dark:block"
            style={{
              opacity: 'var(--glow-opacity)',
              background:
                'radial-gradient(180px 105px at var(--mx) var(--my), rgba(255,255,255,0.20), rgba(191,219,254,0.12) 30%, rgba(244,114,182,0.08) 48%, rgba(0,0,0,0) 68%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-black/5 dark:border-white/10" />
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl p-px transition-opacity duration-300 ease-out hidden dark:block"
            style={{
              opacity: 'var(--border-opacity)',
              background:
                'radial-gradient(150px 90px at var(--mx) var(--my), rgba(255,255,255,0.8), rgba(186,230,253,0.5) 32%, rgba(196,181,253,0.2) 50%, rgba(0,0,0,0) 68%)',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* Subtle animated gradient border on top (always visible, light mode too) */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px opacity-40 dark:opacity-30"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.5) 25%, rgba(6,182,212,0.5) 50%, rgba(139,92,246,0.4) 75%, transparent 100%)',
            }}
          />

          <nav
            ref={navRef}
            className="relative flex items-center justify-between px-4 py-3 sm:px-6"
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Go to home"
              className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-xl dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-[#0a0a0a]"
              onClick={handleLogoClick}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <span
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 text-gray-800 dark:border-white/20 dark:from-white/10 dark:to-white/5 dark:text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${
                  logoHovered
                    ? 'shadow-[0_0_20px_rgba(16,185,129,0.3)] dark:shadow-[0_0_25px_rgba(16,185,129,0.25)]'
                    : 'shadow-sm'
                }`}
              >
                <Activity
                  size={19}
                  className={`transition-all duration-500 ${
                    logoHovered ? 'rotate-6 scale-110 text-emerald-600 dark:text-emerald-400' : ''
                  }`}
                />
                {/* Pulse ring on hover */}
                <span
                  className={`absolute inset-0 rounded-xl border-2 border-emerald-400/50 transition-all duration-500 ${
                    logoHovered ? 'opacity-100 scale-125' : 'opacity-0 scale-100'
                  }`}
                />
              </span>
              <span className="text-base font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 sm:text-lg transition-all duration-300 group-hover:from-emerald-600 group-hover:to-cyan-600 dark:group-hover:from-emerald-400 dark:group-hover:to-cyan-400">
                CommitPulse
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const active = !link.isExternal && isActiveLink(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className={`relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a] ${
                      link.isPrimary
                        ? 'rounded-xl bg-gray-900 text-white shadow-md hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] focus-visible:ring-gray-900 dark:focus-visible:ring-white ml-2'
                        : `rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 ${
                            active ? 'text-gray-900 dark:text-white' : ''
                          }`
                    }`}
                  >
                    {link.isExternal && <GithubMark />}
                    {link.label === 'GitHub Repo' ? (
                      <span className="hidden lg:inline">{link.label}</span>
                    ) : (
                      <span>{link.label}</span>
                    )}
                    {link.isExternal && <ExternalLink size={12} className="opacity-50 -ml-0.5" />}
                    {/* Active link indicator */}
                    {active && !link.isPrimary && (
                      <span className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-emerald-400 dark:to-cyan-400" />
                    )}
                  </a>
                );
              })}

              {/* Separator */}
              <div className="mx-2 h-6 w-px bg-gray-200 dark:bg-white/15" />

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-[#0a0a0a]"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  isDark ? (
                    <Moon
                      size={18}
                      className="transition-all duration-500 group-hover:-rotate-12 group-hover:text-indigo-300"
                    />
                  ) : (
                    <Sun
                      size={18}
                      className="transition-all duration-500 group-hover:rotate-90 group-hover:text-amber-500"
                    />
                  )
                ) : (
                  <span className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="md:hidden inline-flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={toggleTheme}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  isDark ? (
                    <Moon
                      size={18}
                      className="transition-transform duration-300 group-hover:-rotate-12"
                    />
                  ) : (
                    <Sun
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  )
                ) : (
                  <span className="w-[18px] h-[18px]" />
                )}
              </button>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
              >
                <div className="relative w-5 h-5">
                  <X
                    size={20}
                    className={`absolute inset-0 transition-all duration-300 ${
                      open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
                    }`}
                  />
                  <Menu
                    size={20}
                    className={`absolute inset-0 transition-all duration-300 ${
                      open ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile Dropdown Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
              open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-gray-100 dark:border-white/10 px-4 py-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, index) => {
                  const active = !link.isExternal && isActiveLink(link.href);
                  return (
                    <li
                      key={link.href}
                      className="transition-all duration-300"
                      style={{
                        transitionDelay: open ? `${index * 50}ms` : '0ms',
                        transform: open ? 'translateX(0)' : 'translateX(-12px)',
                        opacity: open ? 1 : 0,
                      }}
                    >
                      <a
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        onClick={() => setOpen(false)}
                        className={`inline-flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-offset-[#0a0a0a] ${
                          link.isPrimary
                            ? 'mt-2 bg-gray-900 text-white shadow-md hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 focus-visible:ring-gray-900 dark:focus-visible:ring-white justify-center'
                            : `text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 ${
                                active
                                  ? 'text-gray-900 dark:text-white bg-gray-100/50 dark:bg-white/5 border-l-2 border-emerald-400'
                                  : ''
                              }`
                        }`}
                      >
                        {link.isExternal && <GithubMark />}
                        {link.label}
                        {link.isExternal && <ExternalLink size={12} className="opacity-50" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden -z-10 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
}
