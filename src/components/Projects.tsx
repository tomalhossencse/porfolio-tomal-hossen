"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    ExternalLink, ArrowRight, FolderOpen, X,
    ChevronLeft, ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, personalInfo } from "@/data";

const categories = ["All", "Full Stack", "Frontend", "Mern Stack", "Pern Stack"];
type Project = (typeof projects)[0];

/* ─── Screenshot carousel ─────────────────────────────── */
function ScreenshotCarousel({ project }: { project: Project }) {
    const [idx, setIdx] = useState(0);
    const [g1, g2] = project.gradient;
    const shots = project.screenshots?.filter(Boolean) ?? [];
    const hasReal = shots.length > 0;

    return (
        <div style={{ position: "relative", background: `linear-gradient(135deg, ${g1}18, ${g2}12)`, borderBottom: "1px solid var(--border-card)", overflow: "hidden" }}>
            {/* top accent */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${g1}, ${g2})` }} />

            {/* ── Real screenshot ── */}
            {hasReal ? (
                <div style={{ position: "relative", minHeight: 240 }}>
                    {/* browser chrome */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {["#ff5f57", "#ffbd2e", "#28c940"].map(c => (
                            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
                        ))}
                        <div style={{ flex: 1, height: 18, borderRadius: 4, background: "rgba(255,255,255,0.06)", marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                            <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.3)" }}>{project.liveUrl}</span>
                        </div>
                    </div>

                    {/* screenshot image */}
                    <div style={{ position: "relative", overflow: "hidden", maxHeight: 280 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            key={shots[idx]}
                            src={shots[idx]}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            className="img-scroll"
                            style={{ objectPosition: "center 0%", maxHeight: 340 }}
                            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                        {/* subtle gradient overlay */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.18))", pointerEvents: "none" }} />
                    </div>

                    {/* prev / next arrows */}
                    {shots.length > 1 && (
                        <>
                            <button onClick={() => setIdx(i => (i - 1 + shots.length) % shots.length)}
                                style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={() => setIdx(i => (i + 1) % shots.length)}
                                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
                                <ChevronRight size={16} />
                            </button>
                        </>
                    )}

                    {/* dot indicators */}
                    {shots.length > 1 && (
                        <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "10px 0 12px", background: "rgba(0,0,0,0.3)" }}>
                            {shots.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 22 : 6, height: 6, borderRadius: 999, border: "none", cursor: "pointer", background: i === idx ? g1 : "rgba(255,255,255,0.22)", transition: "all 0.3s" }} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* ── Fallback placeholder ── */
                <div style={{ padding: "28px 24px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 220, position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${g1}06 1px, transparent 1px), linear-gradient(90deg, ${g1}06 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
                    <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${g1}20, transparent 70%)`, filter: "blur(36px)" }} />
                    <div style={{ position: "relative", textAlign: "center" }}>
                        <div style={{ fontSize: "4.5rem", fontWeight: 900, background: `linear-gradient(135deg, ${g1}, ${g2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: 0.35 }}>
                            {project.title[0]}
                        </div>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: g1, opacity: 0.6 }}>{project.title}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Project detail modal ─────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const [g1, g2] = project.gradient;

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.94 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                style={{
                    width: "100%", maxWidth: 680,
                    maxHeight: "92vh", overflowY: "auto",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-card)",
                    borderRadius: 16,
                    boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                    position: "relative",
                }}
            >
                {/* close btn */}
                <motion.button
                    whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    style={{ position: "absolute", top: 12, right: 12, zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
                >
                    <X size={15} />
                </motion.button>

                {/* Screenshot carousel */}
                <ScreenshotCarousel project={project} />

                {/* Body */}
                <div style={{ padding: "28px 28px 36px" }}>

                    {/* Title + badges */}
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-heading)", lineHeight: 1.15, marginBottom: 10 }}>
                        {project.title}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 6, background: `${g1}20`, border: `1px solid ${g1}40`, color: g1 }}>
                            {project.category}
                        </span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 6, background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--text-secondary)" }}>
                            {project.year}
                        </span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 6, background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--text-secondary)" }}>
                            {project.role}
                        </span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: "0.93rem", lineHeight: 1.82, color: "var(--text-secondary)", marginBottom: 24 }}>
                        {project.description}
                    </p>

                    {/* CTA buttons */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ flex: "0 0 auto", padding: "10px 22px", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            <ExternalLink size={14} /> Live Demo
                        </a>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="btn-outline"
                            style={{ flex: "0 0 auto", padding: "10px 22px", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            <FaGithub size={14} /> Full Stack Code
                        </a>
                    </div>

                    {/* Demo credentials */}
                    {project.demoCredentials && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            style={{
                                borderRadius: 12,
                                border: "1px solid var(--border-card)",
                                background: "var(--bg-card)",
                                padding: "14px 18px",
                                marginBottom: 28,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-heading)" }}>Demo Credentials</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                                <div>
                                    <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 4 }}>EMAIL</p>
                                    <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text-primary)", fontFamily: "monospace" }}>{project.demoCredentials.email}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 4 }}>PASSWORD</p>
                                    <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text-primary)", fontFamily: "monospace" }}>{project.demoCredentials.password}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Key Features */}
                    <div style={{ marginBottom: 28 }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: 16 }}>
                            Key Features
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "8px 16px" }}>
                            {project.highlights.map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.12 + i * 0.06, duration: 0.3 }}
                                    style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
                                >
                                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: g1, flexShrink: 0, marginTop: 7 }} />
                                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{h}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: 14 }}>
                            Tech Stack
                        </h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {project.tech.map(t => (
                                <motion.span
                                    key={t}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    style={{
                                        fontSize: "0.72rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        padding: "5px 13px",
                                        borderRadius: 6,
                                        background: `${g1}14`,
                                        border: `1px solid ${g1}35`,
                                        color: g1,
                                        cursor: "default",
                                    }}
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── Project card ──────────────────────────────────────── */
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [g1, g2] = project.gradient;
    void g2; // used in gradient strings below

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="card"
            style={{ overflow: "hidden", cursor: "pointer" }}
            onClick={onOpen}
        >
            {/* Thumbnail */}
            <div style={{ height: 200, position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border-card)" }}>
                {/* top gradient bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${g1}, ${g2})`, zIndex: 3 }} />

                {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={project.image}
                        alt={project.title}
                        className="img-scroll"
                        style={{ objectPosition: "center 0%" }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; (e.currentTarget.nextSibling as HTMLElement).style.display = "flex"; }}
                    />
                ) : null}

                {/* fallback shown if image missing / errors */}
                <div style={{ display: project.image ? "none" : "flex", position: "absolute", inset: 0, background: `linear-gradient(135deg, ${g1}28, ${g2}20)`, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${g1}06 1px, transparent 1px), linear-gradient(90deg, ${g1}06 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
                    <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${g1}25, transparent 70%)`, filter: "blur(24px)" }} />
                    <div style={{ position: "relative", textAlign: "center" }}>
                        <div style={{ fontSize: "4rem", fontWeight: 900, background: `linear-gradient(135deg, ${g1}, ${g2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: 0.3, lineHeight: 1 }}>{project.title[0]}</div>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: g1, opacity: 0.8, display: "block", marginTop: 6 }}>{project.category}</span>
                    </div>
                </div>

                {/* hover overlay */}
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                    style={{ position: "absolute", inset: 0, zIndex: 2, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                    onClick={e => e.stopPropagation()}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onOpen} className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.8rem" }}>View Details</motion.button>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "8px 14px", fontSize: "0.8rem" }}><FaGithub size={14} /></a>
                </motion.div>
            </div>

            {/* Content */}
            <div style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
                    <div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)" }}>{project.title}</h3>
                        <p style={{ fontSize: "0.78rem", color: g1, fontWeight: 500, marginTop: 2 }}>{project.tagline}</p>
                    </div>
                    <span style={{ fontSize: "0.68rem", fontWeight: 600, whiteSpace: "nowrap", padding: "3px 10px", borderRadius: 999, background: `${g1}12`, border: `1px solid ${g1}28`, color: g1 }}>{project.year}</span>
                </div>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {project.tech.slice(0, 4).map(t => <span key={t} className="tech-badge">{t}</span>)}
                    {project.tech.length > 4 && <span className="tech-badge">+{project.tech.length - 4}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
                    <button onClick={onOpen} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.82rem", fontWeight: 600, color: g1, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                        View Details <ArrowRight size={13} />
                    </button>
                    <div style={{ display: "flex", gap: 12 }}>
                        {[{ href: project.liveUrl, Icon: ExternalLink }, { href: project.githubUrl, Icon: FaGithub }].map(({ href, Icon }, i) => (
                            <a key={i} href={href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                style={{ color: "var(--text-secondary)", transition: "color 0.2s" }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = g1)}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}>
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Section ───────────────────────────────────────────── */
export default function Projects() {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
    const [activeFilter, setActiveFilter] = useState("All");
    const [openProject, setOpenProject] = useState<Project | null>(null);

    const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb" style={{ width: 600, height: 600, top: -100, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(0,180,255,0.07), transparent 70%)" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>

                {/* Header */}
                <motion.div ref={headerRef} initial={{ opacity: 0, y: 28 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: 52, textAlign: "center" }}>
                    <span className="section-badge"><FolderOpen size={11} /> Portfolio</span>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: 8, color: "var(--text-heading)" }}>
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <motion.div initial={{ width: 0 }} animate={headerInView ? { width: 48 } : { width: 0 }} transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg, #00d4ff, #6366f1)", marginTop: 10, marginLeft: "auto", marginRight: "auto" }} />
                    <p style={{ marginTop: 12, maxWidth: 520, color: "var(--text-secondary)", fontSize: "0.95rem", margin: "12px auto 0" }}>
                        A selection of projects I&apos;ve built — from concept to production. Click any card for full details.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44, justifyContent: "center" }}>
                    {categories.map(cat => {
                        const active = activeFilter === cat;
                        return (
                            <motion.button key={cat} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setActiveFilter(cat)}
                                style={{ padding: "7px 20px", borderRadius: 999, fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", transition: "all 0.25s", background: active ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "var(--badge-bg)", color: active ? "#fff" : "var(--text-secondary)", border: `1px solid ${active ? "transparent" : "var(--badge-border)"}`, boxShadow: active ? "0 4px 20px rgba(14,165,233,0.3)" : "none" }}>
                                {cat}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} onOpen={() => setOpenProject(project)} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <motion.div initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }} style={{ textAlign: "center", marginTop: 52 }}>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <FaGithub size={15} /> View All Projects on GitHub <ArrowRight size={14} />
                    </a>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
            </AnimatePresence>
        </section>
    );
}
