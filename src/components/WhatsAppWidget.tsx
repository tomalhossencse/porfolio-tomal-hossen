"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { personalInfo } from "@/data";

const WA_NUMBER = personalInfo.phone.replace(/\D/g, "");
const WA_MESSAGE = encodeURIComponent("Hi Tomal! I found your portfolio and I'd love to work with you.");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

function WhatsAppIcon({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2C6.477 2 2.01 6.477 2.01 12.011c0 1.773.463 3.437 1.268 4.888L2 22l5.235-1.267A9.963 9.963 0 0012.004 22C17.531 22 22 17.523 22 11.989 22 6.467 17.531 2 12.004 2zm0 18.21a8.198 8.198 0 01-4.194-1.153l-.3-.178-3.107.752.781-2.999-.196-.308A8.185 8.185 0 013.826 12c0-4.517 3.674-8.193 8.178-8.193 4.506 0 8.179 3.676 8.179 8.193 0 4.518-3.673 8.21-8.179 8.21z" />
        </svg>
    );
}

export default function WhatsAppWidget() {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isDark, setIsDark] = useState(true);

    // Show widget after a 2.5s delay so it appears after page loads
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 2500);
        return () => clearTimeout(t);
    }, []);

    // Track theme changes
    useEffect(() => {
        const update = () =>
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        update();
        const obs = new MutationObserver(update);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => obs.disconnect();
    }, []);

    // Theme-aware card styles
    const cardBg = isDark ? "#0f1c2e" : "#ffffff";
    const cardBorder = isDark ? "1px solid rgba(0,212,255,0.15)" : "1px solid rgba(0,0,0,0.08)";
    const cardShadow = isDark
        ? "0 12px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,212,255,0.08)"
        : "0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)";
    const chatBg = isDark ? "#0a1628" : "#ECE5DD";
    const bubbleBg = isDark ? "#1a2d44" : "#ffffff";
    const bubbleText = isDark ? "#d4e8f8" : "#111111";
    const timeColor = isDark ? "rgba(180,210,240,0.5)" : "#aaaaaa";
    const footerBg = isDark ? "#0c1a2c" : "#f0f0f0";

    // FAB theme-aware ring
    const fabShadow = isDark
        ? "0 4px 18px rgba(37,211,102,0.45), 0 2px 6px rgba(0,0,0,0.3)"
        : "0 4px 18px rgba(37,211,102,0.35), 0 2px 6px rgba(0,0,0,0.12)";

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    style={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 100,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 10,
                    }}
                >
                    {/* ── Tooltip card ── */}
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.94 }}
                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    background: cardBg,
                                    border: cardBorder,
                                    borderRadius: 14,
                                    overflow: "hidden",
                                    boxShadow: cardShadow,
                                    width: 264,
                                }}
                            >
                                {/* Header */}
                                <div style={{
                                    background: "linear-gradient(135deg, #25D366, #1da851)",
                                    padding: "12px 14px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                }}>
                                    <div style={{
                                        width: 34, height: 34, borderRadius: "50%",
                                        background: "rgba(255,255,255,0.22)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", flexShrink: 0,
                                    }}>
                                        <WhatsAppIcon size={18} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {personalInfo.name}
                                        </p>
                                        <p style={{ margin: "2px 0 0", fontSize: "0.68rem", color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: 4 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
                                            Typically replies instantly
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setOpen(false)}
                                        style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.75)", padding: 2, display: "flex", flexShrink: 0 }}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>

                                {/* Bubble */}
                                <div style={{ padding: "12px 14px", background: chatBg }}>
                                    <div style={{
                                        background: bubbleBg,
                                        borderRadius: "0 10px 10px 10px",
                                        padding: "9px 12px",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                                        maxWidth: "82%",
                                        display: "inline-block",
                                    }}>
                                        <p style={{ margin: 0, fontSize: "0.78rem", color: bubbleText, lineHeight: 1.55 }}>
                                            Hi there! 👋<br />How can I help you today?
                                        </p>
                                        <p style={{ margin: "3px 0 0", fontSize: "0.62rem", color: timeColor, textAlign: "right" }}>
                                            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div style={{ padding: "10px 14px", background: footerBg }}>
                                    <a
                                        href={WA_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            gap: 7, width: "100%", padding: "9px 0",
                                            borderRadius: 999,
                                            background: "linear-gradient(135deg, #25D366, #1da851)",
                                            color: "#fff", fontWeight: 700, fontSize: "0.8rem",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <WhatsAppIcon size={15} />
                                        Start Chat on WhatsApp
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── FAB button (smaller) ── */}
                    <motion.button
                        onClick={() => setOpen(o => !o)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Chat on WhatsApp"
                        style={{
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #25D366, #1da851)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            boxShadow: fabShadow,
                            position: "relative",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={open ? "x" : "wa"}
                                initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
                                transition={{ duration: 0.18 }}
                                style={{ display: "flex" }}
                            >
                                {open ? <X size={18} /> : <WhatsAppIcon size={22} />}
                            </motion.div>
                        </AnimatePresence>

                        {/* Ping ring — only when closed */}
                        {!open && (
                            <motion.div
                                animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                                style={{
                                    position: "absolute", inset: -4,
                                    borderRadius: "50%",
                                    border: "2px solid #25D366",
                                    pointerEvents: "none",
                                }}
                            />
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
