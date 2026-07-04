"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutInfo, personalInfo } from "@/data";
import { Code2, Server, Layers, Database, User, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
    Code2, Server, Layers, Database,
};

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="about" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb" style={{ width: 550, height: 550, top: -80, right: -180, background: "radial-gradient(circle, rgba(0,180,255,0.08), transparent 70%)" }} />
            <div className="glow-orb" style={{ width: 400, height: 400, bottom: -120, left: -150, background: "radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)" }} />

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }} ref={ref}>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ textAlign: "center", marginBottom: 64 }}
                >
                    <span className="section-badge"><User size={11} /> About Me</span>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: 10, color: "var(--text-heading)" }}>
                        Who I <span className="gradient-text">Am</span>
                    </h2>
                    <motion.div
                        initial={{ width: 0 }} animate={inView ? { width: 48 } : { width: 0 }}
                        transition={{ duration: 0.55, delay: 0.3 }}
                        style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg,#00d4ff,#6366f1)", margin: "12px auto 0" }}
                    />
                </motion.div>

                {/* ── Two-column body ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 56, alignItems: "start" }}>

                    {/* ── LEFT: bio + quote + CTA ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p style={{ fontSize: "1.02rem", lineHeight: 1.88, marginBottom: 20, color: "var(--text-secondary)" }}>
                            {aboutInfo.bio}
                        </p>
                        <p style={{ fontSize: "1.02rem", lineHeight: 1.88, marginBottom: 32, color: "var(--text-secondary)" }}>
                            {aboutInfo.bio2}
                        </p>

                        {/* italic quote — left border accent */}
                        <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: 16, marginBottom: 40 }}>
                            <p style={{ fontSize: "0.9rem", fontStyle: "italic", color: "var(--accent)", lineHeight: 1.6 }}>
                                {aboutInfo.quote}
                            </p>
                        </div>

                        {/* CTA */}
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a href="#contact" className="btn-primary" style={{ gap: 8 }}>
                                Hire Me <ArrowRight size={14} />
                            </a>
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ gap: 8 }}>
                                View GitHub
                            </a>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: 2×2 specialty cards ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}
                    >
                        {aboutInfo.specialties.map((s, i) => {
                            const Icon = ICON_MAP[s.icon] ?? Code2;
                            return (
                                <motion.div
                                    key={s.title}
                                    initial={{ opacity: 0, y: 24, scale: 0.94 }}
                                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="card"
                                    style={{ padding: "22px 20px", position: "relative", overflow: "hidden" }}
                                >
                                    {/* subtle corner glow */}
                                    <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent}22, transparent 70%)`, pointerEvents: "none" }} />

                                    {/* icon box */}
                                    <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.accent}14`, border: `1px solid ${s.accent}30`, marginBottom: 14 }}>
                                        <Icon size={22} style={{ color: s.accent }} />
                                    </div>

                                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: 8 }}>
                                        {s.title}
                                    </h4>
                                    <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                                        {s.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
