"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";
import { personalInfo } from "@/data";

const container: React.CSSProperties = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 10,
};

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        const toastId = toast.loading("Sending your message…");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || data.error || "Something went wrong.");
            toast.success("Message sent! I'll get back to you soon.", { id: toastId, duration: 5000 });
            setSent(true);
            setForm({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setSent(false), 5000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to send. Please try again.";
            toast.error(msg, { id: toastId, duration: 6000 });
        } finally {
            setSending(false);
        }
    };

    const contactDetails = [
        { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
        { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
        { icon: MapPin, label: "Location", value: personalInfo.location, href: "#" },
    ];

    const socials = [
        { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
        { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    ];

    return (
        <section id="contact" style={{ padding: "112px 0", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb"
                style={{ width: 600, height: 600, top: 0, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(108,99,255,0.08), transparent 70%)" }} />

            <div style={container} ref={ref}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: 64 }}
                >
                    <span className="section-badge">Get In Touch</span>
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginTop: 8 }}>
                        Contact <span className="gradient-text">Me</span>
                    </h2>
                    <p style={{ marginTop: 16, maxWidth: 480, margin: "16px auto 0", color: "var(--text-secondary)" }}>
                        Have a project in mind? Let&apos;s work together to build something great.
                    </p>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
                    {/* Info panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="card" style={{ padding: 32 }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-heading)", marginBottom: 8 }}>
                                Let&apos;s build something amazing
                            </h3>
                            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 32, color: "var(--text-secondary)" }}>
                                I&apos;m currently available for freelance projects, full-time roles, or technical consulting.
                                Whether you have a startup idea, need a website refresh, or want to scale your platform —
                                I&apos;d love to hear from you.
                            </p>

                            {contactDetails.map(({ icon: Icon, label, value, href }) => (
                                <a key={label} href={href}
                                    style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, textDecoration: "none" }}
                                >
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        background: "var(--badge-bg)", border: "1px solid var(--badge-border)",
                                    }}>
                                        <Icon size={18} style={{ color: "var(--accent)" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>{label}</p>
                                        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-heading)" }}>{value}</p>
                                    </div>
                                </a>
                            ))}

                            <div style={{ paddingTop: 24, borderTop: "1px solid var(--border-subtle)" }}>
                                <p style={{ fontSize: "0.875rem", marginBottom: 16, color: "var(--text-secondary)" }}>Find me on</p>
                                <div style={{ display: "flex", gap: 12 }}>
                                    {socials.map(({ icon: Icon, href, label }) => (
                                        <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            style={{
                                                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)",
                                                color: "var(--text-secondary)", textDecoration: "none",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                                                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                                                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                                            }}
                                        >
                                            <Icon size={18} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <form onSubmit={handleSubmit} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, color: "var(--text-secondary)" }}>
                                        Your Name
                                    </label>
                                    <input type="text" required placeholder="John Doe" value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, color: "var(--text-secondary)" }}>
                                        Email Address
                                    </label>
                                    <input type="email" required placeholder="john@example.com" value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, color: "var(--text-secondary)" }}>
                                    Subject
                                </label>
                                <input type="text" required placeholder="Project Inquiry" value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })} className="form-input" />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, color: "var(--text-secondary)" }}>
                                    Message
                                </label>
                                <textarea required rows={5} placeholder="Tell me about your project..." value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })} className="form-input"
                                    style={{ resize: "none" }} />
                            </div>

                            <motion.button type="submit" disabled={sending || sent}
                                whileHover={{ scale: sending ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
                                className="btn-primary" style={{ justifyContent: "center", padding: "14px" }}>
                                {sent ? "✓ Message Sent!" : sending ? (
                                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                                        Sending...
                                    </span>
                                ) : (
                                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        Send Message <Send size={16} />
                                    </span>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
