"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { personalInfo } from "@/data";
import { BsWhatsapp } from "react-icons/bs";

const socials = [
    { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    // { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
    { icon: BsWhatsapp, href: `https://wa.me/=${personalInfo.phone}`, label: "Whatsapp" },
];

export default function Footer() {
    return (
        <footer style={{
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--bg-primary)",
        }}>
            <div style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: "20px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
            }}>
                {/* Left — copyright */}
                <p style={{
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    fontWeight: 400,
                }}>
                    © {new Date().getFullYear()} – All rights reserved.
                </p>

                {/* Right — social icons */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {socials.map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            whileHover={{ scale: 1.12, y: -2 }}
                            whileTap={{ scale: 0.92 }}
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "var(--badge-bg)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                transition: "color 0.2s, border-color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "var(--accent)";
                                el.style.borderColor = "var(--border)";
                                el.style.background = "var(--accent-glow)";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "var(--text-secondary)";
                                el.style.borderColor = "var(--border-subtle)";
                                el.style.background = "var(--badge-bg)";
                            }}
                        >
                            <Icon size={15} />
                        </motion.a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
