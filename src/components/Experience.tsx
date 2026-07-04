"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experiences } from "@/data";

export default function Experience() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="experience" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb" style={{ width: 500, height: 500, top: "30%", right: -180, background: "radial-gradient(circle, rgba(99,102,241,0.09), transparent 70%)" }} />

            <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }} ref={ref}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: 72 }}
                >
                    <span className="section-badge"><Briefcase size={11} /> Career</span>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: 10 }}>
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p style={{ marginTop: 14, color: "var(--text-secondary)", fontSize: "0.95rem" }}>My professional journey so far</p>
                </motion.div>

                {/* Timeline */}
                <div style={{ position: "relative", paddingLeft: 44 }}>
                    <motion.div
                        initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                        className="timeline-line" style={{ transformOrigin: "top" }}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -32 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.16 }}
                                style={{ position: "relative" }}
                            >
                                {/* Timeline dot */}
                                <div style={{
                                    position: "absolute", left: -45, top: 22,
                                    width: 14, height: 14, borderRadius: "50%", zIndex: 10,
                                    background: "var(--bg-primary)",
                                    border: "2px solid var(--accent)",
                                    boxShadow: "0 0 12px rgba(0,212,255,0.5)",
                                }} />

                                <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="card"
                                    style={{ padding: 28, overflow: "hidden" }}
                                >
                                    {/* Top accent */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, var(--accent), transparent)`, opacity: 0.4 }} />

                                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                                        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)",
                                            }}>
                                                <Briefcase size={18} style={{ color: "var(--accent)" }} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-heading)" }}>{exp.role}</h3>
                                                <p style={{ fontWeight: 600, fontSize: "0.88rem", marginTop: 3, color: "var(--accent)" }}>{exp.company}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                                                <Calendar size={12} /> {exp.period}
                                            </div>
                                            <span className="tech-badge">{exp.type}</span>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: "0.875rem", lineHeight: 1.78, marginBottom: 18, color: "var(--text-secondary)" }}>
                                        {exp.description}
                                    </p>

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                        {exp.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
