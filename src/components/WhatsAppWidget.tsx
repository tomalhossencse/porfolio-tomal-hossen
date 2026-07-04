"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { personalInfo } from "@/data";

const WA_NUMBER = personalInfo.phone.replace(/\D/g, ""); // strip non-digits
const WA_MESSAGE = encodeURIComponent("Hi Tomal! I found your portfolio and I'd love to work with you.");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

/* WhatsApp SVG icon — official brand color */
function WhatsAppIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2C6.477 2 2.01 6.477 2.01 12.011c0 1.773.463 3.437 1.268 4.888L2 22l5.235-1.267A9.963 9.963 0 0012.004 22C17.531 22 22 17.523 22 11.989 22 6.467 17.531 2 12.004 2zm0 18.21a8.198 8.198 0 01-4.194-1.153l-.3-.178-3.107.752.781-2.999-.196-.308A8.185 8.185 0 013.826 12c0-4.517 3.674-8.193 8.178-8.193 4.506 0 8.179 3.676 8.179 8.193 0 4.518-3.673 8.21-8.179 8.21z" />
        </svg>
    );
}

export default function WhatsAppWidget() {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>

            {/* ── Tooltip / mini card ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.92 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            background: "#ffffff",
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
                            width: 280,
                        }}
                    >
                        {/* Header */}
                        <div style={{ background: "#25D366", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                                <WhatsAppIcon size={22} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontWeight: 700, fontSize: "0.88rem", color: "#fff" }}>{personalInfo.name}</p>
                                <p style={{ margin: "2px 0 0", fontSize: "0.72rem", color: "rgba(255,255,255,0.85)" }}>
                                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block", marginRight: 5, verticalAlign: "middle" }} />
                                    Typically replies instantly
                                </p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)", padding: 4, display: "flex" }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Message bubble */}
                        <div style={{ padding: "14px 16px", background: "#ECE5DD" }}>
                            <div style={{ background: "#fff", borderRadius: "0 10px 10px 10px", padding: "10px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", maxWidth: "80%", display: "inline-block" }}>
                                <p style={{ margin: 0, fontSize: "0.82rem", color: "#111", lineHeight: 1.5 }}>
                                    Hi there! 👋<br />How can I help you today?
                                </p>
                                <p style={{ margin: "4px 0 0", fontSize: "0.65rem", color: "#aaa", textAlign: "right" }}>
                                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ padding: "12px 16px", background: "#f0f0f0" }}>
                            <a
                                href={WA_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "11px 0", borderRadius: 999, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}
                            >
                                <WhatsAppIcon size={18} />
                                Start Chat on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main FAB button ── */}
            <motion.button
                onClick={() => setOpen(o => !o)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                title="Chat on WhatsApp"
                style={{
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    background: "#25D366",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(37,211,102,0.55), 0 2px 8px rgba(0,0,0,0.2)",
                    position: "relative",
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={open ? "x" : "wa"}
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 30, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex" }}
                    >
                        {open ? <X size={24} /> : <WhatsAppIcon size={28} />}
                    </motion.div>
                </AnimatePresence>

                {/* Ping ring */}
                {!open && (
                    <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid #25D366", pointerEvents: "none" }}
                    />
                )}
            </motion.button>
        </div>
    );
}
