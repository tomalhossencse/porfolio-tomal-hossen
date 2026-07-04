"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const trailX = useMotionValue(-100);
    const trailY = useMotionValue(-100);

    // Smooth spring trailing
    const springX = useSpring(trailX, { stiffness: 120, damping: 22, mass: 0.5 });
    const springY = useSpring(trailY, { stiffness: 120, damping: 22, mass: 0.5 });

    const [clicked, setClicked] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const angleRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Hide on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) { setIsMobile(true); return; }

        document.documentElement.style.cursor = "none";

        const onMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            trailX.set(e.clientX);
            trailY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        const onDown = () => setClicked(true);
        const onUp = () => setClicked(false);
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        // detect hoverable elements
        const onOver = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            setHovering(!!el.closest("a, button, [role=button], input, textarea, select, label"));
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("mouseenter", onEnter);
        window.addEventListener("mouseover", onOver);

        return () => {
            document.documentElement.style.cursor = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mouseenter", onEnter);
            window.removeEventListener("mouseover", onOver);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [cursorX, cursorY, trailX, trailY, visible]);

    if (isMobile) return null;

    return (
        <>
            {/* ── Dot: sharp, snaps exactly to pointer ── */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 9999,
                    pointerEvents: "none",
                    opacity: visible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        scale: clicked ? 0.5 : hovering ? 0 : 1,
                        opacity: visible ? 1 : 0,
                    }}
                    transition={{ duration: 0.12 }}
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #00d4ff, #818cf8)",
                        boxShadow: "0 0 10px rgba(0,212,255,0.8)",
                    }}
                />
            </motion.div>

            {/* ── Ring: spring-lagged, animates on hover/click ── */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 9998,
                    pointerEvents: "none",
                    opacity: visible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        width: clicked ? 20 : hovering ? 44 : 32,
                        height: clicked ? 20 : hovering ? 44 : 32,
                        opacity: visible ? (hovering ? 1 : 0.65) : 0,
                        background: hovering
                            ? "rgba(0,212,255,0.1)"
                            : "transparent",
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                        borderRadius: "50%",
                        border: "1.5px solid rgba(0,212,255,0.7)",
                        boxShadow: hovering
                            ? "0 0 20px rgba(0,212,255,0.35), inset 0 0 10px rgba(0,212,255,0.1)"
                            : "0 0 8px rgba(0,212,255,0.2)",
                    }}
                />
            </motion.div>

            {/* ── Gradient glow blob: large, very laggy, subtle ── */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    x: useSpring(trailX, { stiffness: 40, damping: 18 }),
                    y: useSpring(trailY, { stiffness: 40, damping: 18 }),
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 9997,
                    pointerEvents: "none",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.3s",
                }}
            />
        </>
    );
}
