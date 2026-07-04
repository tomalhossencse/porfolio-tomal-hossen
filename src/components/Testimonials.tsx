"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data";

const container: React.CSSProperties = {
    maxWidth: "896px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 10,
};

export default function Testimonials() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };
    const next = () => { setDirection(1); setCurrent((c) => (c + 1) % testimonials.length); };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
        exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3 } }),
    };

    return (
        <section id="reviews" style={{ padding: "112px 0", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb"
                style={{ width: 500, height: 500, bottom: 0, right: 0, background: "radial-gradient(circle, rgba(108,99,255,0.08), transparent 70%)" }} />

            <div style={container} ref={ref}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: 64 }}
                >
                    <span className="section-badge">Testimonials</span>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: 8 }}>
                        Client <span className="gradient-text">Reviews</span>
                    </h2>
                    <p style={{ marginTop: 16, color: "var(--text-secondary)" }}>
                        What people say about working with me
                    </p>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="card" style={{ padding: "48px", overflow: "hidden", minHeight: 300, position: "relative" }}>
                        <Quote size={48} style={{ position: "absolute", top: 24, right: 32, opacity: 0.05, color: "var(--accent)" }} />

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div key={current} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit">
                                <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                                        <Star key={i} size={18} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                                    ))}
                                </div>
                                <blockquote style={{ fontSize: "1.15rem", lineHeight: 1.8, fontWeight: 500, marginBottom: 32, color: "var(--text-primary)" }}>
                                    &ldquo;{testimonials[current].text}&rdquo;
                                </blockquote>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "0.875rem", fontWeight: 700,
                                        background: "linear-gradient(135deg, #6c63ff, #8b5cf6)", color: "#fff",
                                    }}>
                                        {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 700, color: "var(--text-heading)" }}>{testimonials[current].name}</p>
                                        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{testimonials[current].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
                        <div style={{ display: "flex", gap: 8 }}>
                            {testimonials.map((_, i) => (
                                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                                    style={{
                                        height: 8, borderRadius: 999, border: "none", cursor: "pointer",
                                        width: i === current ? 24 : 8,
                                        background: i === current ? "var(--accent)" : "var(--border-subtle)",
                                        transition: "all 0.3s",
                                    }} />
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prev}
                                style={{
                                    width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--border-subtle)",
                                    background: "var(--bg-card)", color: "var(--text-secondary)", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                <ChevronLeft size={18} />
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={next}
                                style={{
                                    width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--accent)",
                                    background: "var(--accent)", color: "#fff", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                <ChevronRight size={18} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Grid preview */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 48 }}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -3 }}
                            className="card"
                            style={{ padding: 20 }}
                        >
                            <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} size={13} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                                ))}
                            </div>
                            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 16, color: "var(--text-secondary)" }}>
                                &ldquo;{t.text.slice(0, 100)}...&rdquo;
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "0.75rem", fontWeight: 700,
                                    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)", color: "#fff",
                                }}>
                                    {t.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div>
                                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-heading)" }}>{t.name}</p>
                                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
