"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin, Code2, Sparkles, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaNodeJs } from "react-icons/fa";
import {
    SiReact, SiNextdotjs,
    SiPrisma,
    SiTypescript,
    SiPostgresql,
} from "react-icons/si";
import { Mail } from "lucide-react";
import { personalInfo } from "@/data";
import { BsWhatsapp } from "react-icons/bs";

const AVATAR = "https://i.ibb.co.com/21pJSk7g/tomal-img-Picsart-Background-Remover.png";

const roles = [
    "Full Stack Developer",
    "React & Next.js Engineer",
    "Node.js Backend Dev",
    "TypeScript Specialist",
];

const TECH_PILLS = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"];

// icons shown in the frosted glass strip at bottom of photo card
const CARD_ICONS = [
    { icon: SiTypescript, color: "#3178C6", label: "TypeScript", bg: "rgba(49,120,198,0.15)" },
    { icon: SiReact, color: "#61DAFB", label: "React", bg: "rgba(97,218,251,0.12)" },
    { icon: SiNextdotjs, color: "#000000", label: "Next.js", bg: "rgba(0,0,0,0.08)", darkColor: "#FFFFFF", darkBg: "rgba(255,255,255,0.10)" },
    { icon: FaNodeJs, color: "#339933", label: "Node.js", bg: "rgba(51,153,51,0.15)" },
    { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL", bg: "rgba(65,105,225,0.15)" },
    { icon: SiPrisma, color: "#5A67D8", label: "Prisma", bg: "rgba(90,103,216,0.15)" },
];

const socials = [
    { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`, label: "Email" },
    { icon: BsWhatsapp, href: `https://wa.me/=${personalInfo.phone}`, label: "Whatsapp" },
];

export default function Hero() {
    const cursorRef = useRef<HTMLSpanElement>(null);
    const roleIndex = useRef(0);
    const charIndex = useRef(0);
    const isDeleting = useRef(false);
    const [roleText, setRoleText] = useState("");
    const [imgErr, setImgErr] = useState(false);
    const [isLight, setIsLight] = useState(false);

    // track theme changes
    useEffect(() => {
        const update = () => setIsLight(document.documentElement.getAttribute("data-theme") === "light");
        update();
        const obs = new MutationObserver(update);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => obs.disconnect();
    }, []);

    // typewriter
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        function type() {
            const cur = roles[roleIndex.current];
            if (!isDeleting.current) {
                charIndex.current++;
                setRoleText(cur.slice(0, charIndex.current));
                if (charIndex.current === cur.length) {
                    isDeleting.current = true;
                    timer = setTimeout(type, 2200);
                    return;
                }
            } else {
                charIndex.current--;
                setRoleText(cur.slice(0, charIndex.current));
                if (charIndex.current === 0) {
                    isDeleting.current = false;
                    roleIndex.current = (roleIndex.current + 1) % roles.length;
                }
            }
            timer = setTimeout(type, isDeleting.current ? 45 : 85);
        }
        timer = setTimeout(type, 1200);
        return () => clearTimeout(timer);
    }, []);

    // cursor blink
    useEffect(() => {
        if (!cursorRef.current) return;
        let visible = true;
        const iv = setInterval(() => {
            visible = !visible;
            if (cursorRef.current) cursorRef.current.style.opacity = visible ? "1" : "0";
        }, 530);
        return () => clearInterval(iv);
    }, []);

    return (
        <section
            id="home"
            style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", width: "100%" }}
        >
            {/* Background orbs */}
            <div className="glow-orb" style={{ width: 700, height: 700, top: -260, left: -280, background: "radial-gradient(circle, rgba(0,180,255,0.13), transparent 65%)" }} />
            <div className="glow-orb" style={{ width: 550, height: 550, bottom: -160, right: -180, background: "radial-gradient(circle, rgba(99,102,241,0.11), transparent 65%)" }} />

            {/* Dot grid */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(0,180,255,0.18) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.22 }} />

            {/* Content */}
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "110px 24px 80px", width: "100%", position: "relative", zIndex: 10 }}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "48px 72px", alignItems: "center" }}>

                    {/* ── LEFT ── */}
                    <div style={{ minWidth: 0 }}>
                        {/* Available badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "6px 16px 6px 10px", borderRadius: 999, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}
                        >
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.15)" }}>
                                <Sparkles size={11} style={{ color: "#22c55e" }} />
                            </span>
                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#22c55e", letterSpacing: "0.06em" }}>Available for new projects</span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{ fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, color: "var(--text-heading)" }}
                        >
                            Hi, I&apos;m{" "}
                            <span style={{ display: "block" }}>
                                <span className="gradient-text">{personalInfo.name}</span>
                            </span>
                        </motion.h1>

                        {/* Typewriter */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 44, marginBottom: 22 }}
                        >
                            <Code2 size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                            <span style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)", fontWeight: 600, color: "var(--text-secondary)" }}>I build as a&nbsp;</span>
                            <span style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)", fontWeight: 700, color: "var(--accent)" }}>
                                {roleText}
                                <span ref={cursorRef} style={{ color: "var(--accent)", marginLeft: 2 }}>|</span>
                            </span>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            style={{ fontSize: "0.97rem", lineHeight: 1.85, maxWidth: 500, marginBottom: 14, color: "var(--text-secondary)" }}
                        >
                            {personalInfo.tagline}
                        </motion.p>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 30, fontSize: "0.85rem", color: "var(--text-secondary)" }}
                        >
                            <MapPin size={14} style={{ color: "var(--accent)" }} />
                            {personalInfo.location}
                        </motion.div>

                        {/* Tech pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 34 }}
                        >
                            {TECH_PILLS.map((t, i) => (
                                <motion.span key={t}
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + i * 0.06 }}
                                    whileHover={{ y: -3, scale: 1.06 }}
                                    style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", padding: "5px 13px", borderRadius: 999, background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--accent)", cursor: "default" }}
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.5 }}
                            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 38 }}
                        >
                            <motion.a href="#contact" className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ gap: 8 }}>
                                Hire Me <ArrowRight size={15} />
                            </motion.a>
                            <motion.a href={personalInfo.resume} className="btn-outline" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ gap: 8 }}>
                                <Download size={15} /> Download CV
                            </motion.a>
                        </motion.div>

                        {/* Socials */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
                            style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {socials.map(({ icon: Icon, href, label }, i) => (
                                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + i * 0.08 }}
                                    whileHover={{ scale: 1.15, y: -4 }} whileTap={{ scale: 0.9 }}
                                    style={{ width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.25s" }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--accent)"; el.style.borderColor = "var(--accent)"; el.style.background = "var(--accent-glow)"; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-secondary)"; el.style.borderColor = "var(--badge-border)"; el.style.background = "var(--badge-bg)"; }}
                                >
                                    <Icon size={17} />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT — 3D tilt photo card ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 70, rotateY: -15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", perspective: 1000 }}
                    >
                        {/* Ambient glow — adapts to theme */}
                        <div style={{ position: "absolute", width: 340, height: 420, borderRadius: 32, background: isLight ? "linear-gradient(135deg, rgba(2,132,199,0.18), rgba(99,102,241,0.14))" : "linear-gradient(135deg, rgba(0,212,255,0.22), rgba(99,102,241,0.18))", filter: "blur(48px)", zIndex: 0, transition: "background 0.4s" }} />
                        <div style={{ position: "absolute", width: 200, height: 200, top: -40, right: -40, borderRadius: "50%", background: isLight ? "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)" : "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)", filter: "blur(30px)", zIndex: 0 }} />

                        {/* Animated border ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            style={{ position: "absolute", zIndex: 0, width: 320, height: 420, borderRadius: 28, border: `1px dashed ${isLight ? "rgba(2,132,199,0.25)" : "rgba(0,212,255,0.18)"}`, pointerEvents: "none" }}
                        />

                        {/* The main photo card */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ scale: 1.02, rotateY: 3, rotateX: -2 }}
                            style={{
                                position: "relative", zIndex: 1,
                                width: 295,
                                borderRadius: 24,
                                overflow: "hidden",
                                boxShadow: isLight
                                    ? "0 24px 60px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(2,132,199,0.25)"
                                    : "0 36px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,212,255,0.15), 0 0 60px rgba(0,212,255,0.06)",
                                background: isLight ? "#deeeff" : "#070d1c",
                                transformStyle: "preserve-3d",
                                transition: "background 0.4s, box-shadow 0.4s",
                            }}
                        >
                            {/* Gradient top-bar accent */}
                            <div style={{ height: 3, background: "linear-gradient(90deg, #00d4ff, #6366f1, #818cf8)", position: "absolute", top: 0, left: 0, right: 0, zIndex: 5 }} />

                            {/* Photo area */}
                            <div style={{ position: "relative", width: "100%", paddingBottom: "116%", overflow: "hidden" }}>
                                {!imgErr ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={AVATAR}
                                        alt={personalInfo.name}
                                        onError={() => setImgErr(true)}
                                        style={{
                                            position: "absolute", inset: 0,
                                            width: "100%", height: "100%",
                                            objectFit: "cover", objectPosition: "center top",
                                            // In light mode: multiply blend removes white bg of the photo
                                            mixBlendMode: isLight ? "multiply" : "normal",
                                            filter: isLight ? "contrast(1.05) saturate(1.05)" : "brightness(0.97)",
                                        }}
                                    />
                                ) : (
                                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isLight ? "linear-gradient(160deg,#c7e0ff,#e0eeff)" : "linear-gradient(160deg,#0c1e38,#0a1628)", fontSize: "3.5rem", fontWeight: 900, color: isLight ? "#0ea5e9" : "#fff" }}>
                                        {personalInfo.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                                    </div>
                                )}

                                {/* Bottom gradient fade — theme-aware */}
                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 110, background: isLight ? "linear-gradient(to top, rgba(222,238,255,1) 20%, transparent)" : "linear-gradient(to top, rgba(7,13,28,1) 20%, transparent)", pointerEvents: "none", zIndex: 2, transition: "background 0.4s" }} />

                                {/* "Open to Work" badge */}
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2.8, repeat: Infinity }}
                                    style={{ position: "absolute", top: 16, right: 14, zIndex: 3, padding: "5px 11px 5px 8px", borderRadius: 999, background: "rgba(34,197,94,0.13)", border: "1px solid rgba(34,197,94,0.4)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 6 }}
                                >
                                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }} />
                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.1em", textTransform: "uppercase" }}>Open to Work</span>
                                </motion.div>

                                {/* Name + title overlay */}
                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 16px", zIndex: 3 }}>
                                    <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 800, color: isLight ? "#0f1e30" : "#fff", letterSpacing: "-0.01em" }}>{personalInfo.name}</p>
                                    <p style={{ margin: "2px 0 0", fontSize: "0.67rem", color: "var(--accent)", fontWeight: 500 }}>{personalInfo.title}</p>
                                </div>
                            </div>

                            {/* Tech icon strip */}
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                padding: "14px 16px",
                                background: isLight ? "rgba(220,235,255,0.95)" : "rgba(5,9,20,0.95)",
                                backdropFilter: "blur(20px)",
                                borderTop: isLight ? "1px solid rgba(2,132,199,0.15)" : "1px solid rgba(0,212,255,0.1)",
                                transition: "background 0.4s",
                            }}>
                                {CARD_ICONS.map(({ icon: Icon, color, darkColor, bg, darkBg, label }, i) => {
                                    const resolvedColor = isLight ? color : (darkColor ?? color);
                                    const resolvedBg = isLight ? bg : (darkBg ?? bg);
                                    return (
                                        <motion.div key={label}
                                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + i * 0.07 }}
                                            whileHover={{ scale: 1.3, y: -8 }}
                                            title={label}
                                            style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: resolvedBg, border: `1.5px solid ${resolvedColor}50`, flexShrink: 0, cursor: "default", transition: "box-shadow 0.2s, transform 0.2s" }}
                                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${resolvedColor}70`}
                                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
                                        >
                                            <Icon size={22} color={resolvedColor} />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                    style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
                >
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-secondary)" }}>scroll</span>
                    <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
                    <ArrowDown size={12} style={{ color: "var(--accent)", marginTop: -4 }} />
                </motion.div>
            </div>
        </section>
    );
}
