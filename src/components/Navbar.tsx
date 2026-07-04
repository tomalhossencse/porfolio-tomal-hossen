"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
    Home, User, Zap, Briefcase, LayoutGrid,
    GraduationCap, Star, Mail, Menu, X,
    Sun, Moon, Monitor,
} from "lucide-react";
import { navLinks } from "@/data";

const ICON_MAP: Record<string, React.ElementType> = {
    "#home": Home,
    "#about": User,
    "#skills": Zap,
    "#experience": Briefcase,
    "#projects": LayoutGrid,
    "#education": GraduationCap,
    "#reviews": Star,
    "#contact": Mail,
};

type Theme = "device" | "light" | "dark";
const CYCLE: Theme[] = ["device", "light", "dark"];
const T_ICON: Record<Theme, React.ElementType> = { device: Monitor, light: Sun, dark: Moon };

function applyTheme(t: Theme) {
    const root = document.documentElement;
    if (t === "dark") { root.setAttribute("data-theme", "dark"); return; }
    if (t === "light") { root.setAttribute("data-theme", "light"); return; }
    root.setAttribute("data-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
}

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>("dark");
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const update = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        const obs = new MutationObserver(update);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        update();
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 900);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const ids = navLinks.map(l => l.href.replace("#", ""));
        const onScroll = () => {
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = document.getElementById(ids[i]);
                if (el && window.scrollY >= el.offsetTop - 140) { setActive(ids[i]); break; }
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("portfolio-theme") as Theme | null;
        const t: Theme = (saved && CYCLE.includes(saved as Theme)) ? saved as Theme : "dark";
        applyTheme(t);
        setTheme(t);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const cycleTheme = () => {
        setTheme(prev => {
            const next = CYCLE[(CYCLE.indexOf(prev) + 1) % CYCLE.length];
            applyTheme(next);
            localStorage.setItem("portfolio-theme", next);
            return next;
        });
    };

    const ThemeIcon = T_ICON[theme];

    const pillBg = isDark ? "rgba(8,16,34,0.82)" : "rgba(240,248,255,0.88)";
    const pillBorder = isDark ? "1px solid rgba(0,200,255,0.16)" : "1px solid rgba(2,132,199,0.22)";
    const pillShadow = isDark
        ? "0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)"
        : "0 4px 24px rgba(0,0,0,0.1),  inset 0 1px 0 rgba(255,255,255,0.8)";
    const inactiveColor = isDark ? "rgba(155,190,220,0.8)" : "rgba(40,80,120,0.75)";
    const hoverColor = isDark ? "#fff" : "#0284c7";

    const pillStyle: React.CSSProperties = {
        background: pillBg, border: pillBorder,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        boxShadow: pillShadow,
    };

    return (
        <>
            {/* ═══════════════════ DESKTOP ═══════════════════ */}
            {!isMobile && (
                <motion.div
                    initial={{ y: -70, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none" }}
                >
                    <LayoutGroup>
                        <div style={{ ...pillStyle, display: "flex", alignItems: "center", gap: 2, padding: "5px 8px", borderRadius: 999, pointerEvents: "auto" }}>
                            {navLinks.map(link => {
                                const Icon = ICON_MAP[link.href] ?? Home;
                                const id = link.href.replace("#", "");
                                const isActive = active === id;
                                return (
                                    <a key={link.href} href={link.href}
                                        onClick={e => { e.preventDefault(); setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
                                        style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, padding: "6px 13px", borderRadius: 999, fontSize: 13, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap", zIndex: 1, color: isActive ? (isDark ? "#060e1e" : "#fff") : inactiveColor, transition: "color 0.25s ease" }}
                                        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = hoverColor; }}
                                        onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = inactiveColor; }}
                                    >
                                        {isActive && (
                                            <motion.div layoutId="nav-active-pill"
                                                style={{ position: "absolute", inset: 0, borderRadius: 999, background: "linear-gradient(135deg,#00d4ff,#7b8fff)", boxShadow: "0 0 20px rgba(0,212,255,0.4)", zIndex: -1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                            />
                                        )}
                                        <Icon size={12} strokeWidth={2.2} />
                                        <span>{link.label}</span>
                                    </a>
                                );
                            })}

                            {/* Theme toggle — icon only, inside the pill */}
                            <div style={{ width: 1, height: 18, background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", margin: "0 4px", flexShrink: 0 }} />
                            <motion.button
                                whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                                onClick={cycleTheme} title={`Theme: ${theme}`}
                                style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: inactiveColor, flexShrink: 0 }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = isDark ? "#00d4ff" : "#0284c7"}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = inactiveColor}
                            >
                                <motion.div key={theme} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }} style={{ display: "flex" }}>
                                    <ThemeIcon size={14} strokeWidth={2} />
                                </motion.div>
                            </motion.button>
                        </div>
                    </LayoutGroup>
                </motion.div>
            )}

            {/* ═══════════════════ MOBILE controls ═══════════════════ */}
            {isMobile && (
                <div style={{ position: "fixed", top: 14, right: 14, zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
                    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} onClick={cycleTheme}
                        style={{ ...pillStyle, width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: inactiveColor }}>
                        <motion.div key={theme} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }} style={{ display: "flex" }}>
                            <ThemeIcon size={15} strokeWidth={2} />
                        </motion.div>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(o => !o)}
                        style={{ ...pillStyle, width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: inactiveColor }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={menuOpen ? "x" : "menu"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
                                {menuOpen ? <X size={17} /> : <Menu size={17} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            )}

            {/* ═══════════════════ MOBILE dropdown ═══════════════════ */}
            <AnimatePresence>
                {isMobile && menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -14, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -14, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        style={{ ...pillStyle, position: "fixed", top: 62, right: 14, zIndex: 49, borderRadius: 16, overflow: "hidden", minWidth: 200, boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.12)" }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
                            {navLinks.map((link, i) => {
                                const Icon = ICON_MAP[link.href] ?? Home;
                                const id = link.href.replace("#", "");
                                const isActive = active === id;
                                return (
                                    <motion.a key={link.href} href={link.href}
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04, duration: 0.2 }}
                                        onClick={() => { setActive(id); setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
                                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", fontSize: 13.5, fontWeight: 500, textDecoration: "none", transition: "all 0.18s", color: isActive ? "var(--accent)" : inactiveColor, background: isActive ? "var(--badge-bg)" : "transparent", borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent" }}
                                    >
                                        <Icon size={14} strokeWidth={2} />
                                        {link.label}
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
