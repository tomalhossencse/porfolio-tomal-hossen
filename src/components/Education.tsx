"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, ExternalLink, Eye, X, BookOpen, Calendar } from "lucide-react";
import { education } from "@/data";

type EduItem = (typeof education)[0];

/* ─── Detail modal ─────────────────────────────────────── */
function DetailModal({ item, onClose }: { item: EduItem; onClose: () => void }) {
    const isCert = item.type === "certification";
    const accent = isCert ? "#818cf8" : "var(--accent)";

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 32, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: 560, width: "100%", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", position: "relative" }}
            >
                {/* accent top bar */}
                <div style={{ height: 3, background: isCert ? "linear-gradient(90deg,#818cf8,#0ea5e9)" : "linear-gradient(90deg,var(--accent),#6366f1)" }} />

                <div style={{ padding: "28px 28px 32px" }}>
                    {/* close */}
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                        style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", background: "var(--badge-bg)", border: "1px solid var(--badge-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
                        <X size={14} />
                    </motion.button>

                    {/* header */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isCert ? "rgba(129,140,248,0.12)" : "var(--badge-bg)", border: `1px solid ${isCert ? "rgba(129,140,248,0.28)" : "var(--badge-border)"}` }}>
                            {isCert ? <Award size={22} style={{ color: "#818cf8" }} /> : <GraduationCap size={22} style={{ color: "var(--accent)" }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", lineHeight: 1.3, marginBottom: 4 }}>{item.degree}</h2>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: accent, fontWeight: 500 }}>
                                <BookOpen size={13} /> {item.institution}
                            </div>
                        </div>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                            {item.year}
                        </span>
                    </div>

                    {/* period */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: 18 }}>
                        <Calendar size={13} /> {item.period}
                    </div>

                    {/* description */}
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 22 }}>{item.description}</p>

                    {/* skills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                        {item.skills.map(s => (
                            <span key={s} style={{ fontSize: "0.72rem", fontWeight: 600, padding: "4px 12px", borderRadius: 999, background: isCert ? "rgba(129,140,248,0.08)" : "var(--badge-bg)", border: `1px solid ${isCert ? "rgba(129,140,248,0.22)" : "var(--badge-border)"}`, color: accent }}>
                                {s}
                            </span>
                        ))}
                    </div>

                    {/* actions */}
                    {item.credentialUrl && (
                        <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer"
                            className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.82rem", padding: "10px 22px" }}>
                            <ExternalLink size={14} /> View Credential
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── Education card ────────────────────────────────────── */
function EduCard({ item, index, inView }: { item: EduItem; index: number; inView: boolean }) {
    const [showDetail, setShowDetail] = useState(false);
    const isCert = item.type === "certification";
    const accent = isCert ? "#818cf8" : "var(--accent)";
    const SHOW = 3;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="card"
                style={{ padding: "22px 24px", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", height: "100%" }}
            >
                {/* left border accent */}
                <div style={{ position: "absolute", left: 0, top: 16, bottom: 16, width: 3, borderRadius: "0 3px 3px 0", background: isCert ? "linear-gradient(to bottom,#818cf8,#0ea5e9)" : "linear-gradient(to bottom,var(--accent),#6366f1)" }} />

                {/* ── Row 1: icon + title + year ── */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isCert ? "rgba(129,140,248,0.1)" : "var(--badge-bg)", border: `1px solid ${isCert ? "rgba(129,140,248,0.25)" : "var(--badge-border)"}` }}>
                        {isCert
                            ? <Award size={20} style={{ color: "#818cf8" }} />
                            : <GraduationCap size={20} style={{ color: "var(--accent)" }} />
                        }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-heading)", lineHeight: 1.3, marginBottom: 4 }}>{item.degree}</h4>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: accent, fontWeight: 500 }}>
                            <BookOpen size={11} /> {item.institution}
                        </div>
                    </div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "3px 9px", borderRadius: 8, background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {item.year}
                    </span>
                </div>

                {/* ── Description ── */}
                <p style={{ fontSize: "0.83rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: "none" }}>
                    {item.description}
                </p>

                {/* ── Skills ── */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20, alignContent: "flex-start" }}>
                    {item.skills.slice(0, SHOW).map(s => (
                        <span key={s} style={{ fontSize: "0.7rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: isCert ? "rgba(129,140,248,0.07)" : "var(--badge-bg)", border: `1px solid ${isCert ? "rgba(129,140,248,0.2)" : "var(--badge-border)"}`, color: accent }}>
                            {s}
                        </span>
                    ))}
                    {item.skills.length > SHOW && (
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--text-secondary)" }}>
                            +{item.skills.length - SHOW}
                        </span>
                    )}
                </div>

                {/* ── Actions row ── */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--border-subtle)", marginTop: "auto" }}>
                    {item.credentialUrl ? (
                        <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer"
                            className="btn-outline"
                            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "0.78rem", padding: "8px 16px" }}>
                            <ExternalLink size={13} /> View Credential
                        </a>
                    ) : (
                        <div />
                    )}
                    <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        onClick={() => setShowDetail(true)}
                        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = accent}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
                    >
                        <Eye size={14} /> Details
                    </motion.button>
                </div>
            </motion.div>

            <AnimatePresence>
                {showDetail && <DetailModal item={item} onClose={() => setShowDetail(false)} />}
            </AnimatePresence>
        </>
    );
}

/* ─── Section ───────────────────────────────────────────── */
export default function Education() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const eduItems = education.filter(e => e.type === "education");
    const certItems = education.filter(e => e.type === "certification");

    return (
        <section id="education" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb" style={{ width: 500, height: 500, top: "40%", left: -180, background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)" }} />
            <div className="glow-orb" style={{ width: 400, height: 400, bottom: -100, right: -120, background: "radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)" }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }} ref={ref}>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ textAlign: "center", marginBottom: 56 }}>
                    <span className="section-badge">Background</span>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: 8, color: "var(--text-heading)" }}>
                        Education &amp; <span className="gradient-text">Certifications</span>
                    </h2>
                    <motion.div initial={{ width: 0 }} animate={inView ? { width: 48 } : { width: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
                        style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg,#00d4ff,#6366f1)", margin: "12px auto 0" }} />
                    <p style={{ marginTop: 14, color: "var(--text-secondary)", fontSize: "0.95rem" }}>Academic background and professional credentials</p>
                </motion.div>

                {/* Two-column grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, alignItems: "stretch" }}>

                    {/* Education */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                            <GraduationCap size={18} style={{ color: "var(--accent)" }} />
                            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-heading)" }}>Education</h3>
                            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)", marginLeft: 8 }} />
                        </motion.div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                            {eduItems.map((item, i) => <EduCard key={item.id} item={item} index={i} inView={inView} />)}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                            <Award size={18} style={{ color: "#818cf8" }} />
                            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-heading)" }}>Certifications</h3>
                            <div style={{ flex: 1, height: 1, background: "var(--border-subtle)", marginLeft: 8 }} />
                        </motion.div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                            {certItems.map((item, i) => <EduCard key={item.id} item={item} index={i} inView={inView} />)}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
