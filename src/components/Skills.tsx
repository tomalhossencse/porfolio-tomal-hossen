"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { techStackCategories } from "@/data";
import {
    SiTailwindcss, SiSass, SiGit, SiJavascript, SiTypescript,
    SiReact, SiNextdotjs, SiRedux, SiVuedotjs,
    SiSvelte, SiNodedotjs, SiExpress, SiNestjs, SiMongodb,
    SiPostgresql, SiMysql, SiPrisma, SiGraphql, SiRedis,
    SiDocker, SiSocketdotio, SiPostman, SiFigma, SiGithub,
    SiVercel, SiLinux, SiVscodium,
} from "react-icons/si";

type IconComp = React.ComponentType<{ size?: number; color?: string }>;

const iconMap: Record<string, IconComp> = {
    SiTailwindcss, SiSass, SiGit, SiJavascript, SiTypescript,
    SiReact, SiNextdotjs, SiRedux, SiVuedotjs,
    SiSvelte, SiNodedotjs, SiExpress, SiNestjs, SiMongodb,
    SiPostgresql, SiMysql, SiPrisma, SiGraphql, SiRedis,
    SiDocker, SiSocketdotio, SiPostman, SiFigma, SiGithub,
    SiVercel, SiLinux,
    SiVisualstudiocode: SiVscodium, // react-icons renamed; SiVscodium is the VS Code icon
};

/* ─── detect current theme ─────────────────────────────── */
function useIsLight() {
    const [isLight, setIsLight] = useState(false);
    useEffect(() => {
        const update = () =>
            setIsLight(document.documentElement.getAttribute("data-theme") === "light");
        update();
        const obs = new MutationObserver(update);
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => obs.disconnect();
    }, []);
    return isLight;
}

/* ─── single icon tile ──────────────────────────────────── */
function SkillTile({
    skill,
    index,
    isLight,
    panelInView,
}: {
    skill: { name: string; icon: string; color: string; lightColor: string };
    index: number;
    isLight: boolean;
    panelInView: boolean;
}) {
    const Icon = iconMap[skill.icon];
    const iconColor = isLight ? skill.lightColor : skill.color;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={panelInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, scale: 1.08 }}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                cursor: "default",
            }}
        >
            {/* Icon square */}
            <motion.div
                whileHover={{ boxShadow: `0 0 20px ${iconColor}44` }}
                style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isLight ? `${iconColor}12` : `${iconColor}15`,
                    border: `1px solid ${iconColor}35`,
                    transition: "box-shadow 0.25s ease",
                }}
            >
                {Icon
                    ? <Icon size={26} color={iconColor} />
                    : <span style={{ fontSize: "1.1rem", fontWeight: 800, color: iconColor }}>{skill.name[0]}</span>
                }
            </motion.div>
            {/* Label */}
            <span style={{
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textAlign: "center",
                lineHeight: 1.3,
                maxWidth: 64,
            }}>
                {skill.name}
            </span>
        </motion.div>
    );
}

/* ─── category panel ────────────────────────────────────── */
function CategoryPanel({
    cat,
    index,
    isLight,
}: {
    cat: (typeof techStackCategories)[0];
    index: number;
    isLight: boolean;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background: "var(--bg-card)",
                border: `1px solid var(--border-card)`,
                borderRadius: 16,
                padding: "24px 24px 28px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            whileHover={{
                borderColor: `${cat.accentColor}40`,
                boxShadow: `0 8px 40px ${cat.accentColor}12`,
                transition: { duration: 0.3 },
            }}
        >
            {/* left accent bar */}
            <div style={{
                position: "absolute",
                left: 0,
                top: 16,
                bottom: 16,
                width: 3,
                borderRadius: "0 3px 3px 0",
                background: cat.accentColor,
                boxShadow: `0 0 12px ${cat.accentColor}80`,
            }} />

            {/* Header */}
            <div style={{ marginBottom: 20, paddingLeft: 12 }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-heading)" }}>
                    {cat.name}
                </h3>
                <p style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: cat.accentColor,
                    opacity: 0.75,
                    marginTop: 3,
                }}>
                    {cat.subtitle}
                </p>
            </div>

            {/* Icons row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 20px", paddingLeft: 8 }}>
                {cat.skills.map((skill, i) => (
                    <SkillTile
                        key={skill.name}
                        skill={skill}
                        index={i}
                        isLight={isLight}
                        panelInView={inView}
                    />
                ))}
            </div>
        </motion.div>
    );
}

/* ─── section ───────────────────────────────────────────── */
export default function Skills() {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
    const isLight = useIsLight();

    return (
        <section id="skills" style={{ padding: "72px 0", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb" style={{ width: 600, height: 600, bottom: -200, left: -200, background: "radial-gradient(circle, rgba(0,180,255,0.07), transparent 70%)" }} />
            <div className="glow-orb" style={{ width: 500, height: 500, top: -100, right: -150, background: "radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)" }} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>

                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 28 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: 36, textAlign: "center" }}
                >
                    <h2 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)", fontWeight: 800, color: "var(--text-heading)" }}>
                        <span style={{ color: "var(--text-heading)" }}>Tech </span>
                        <span className="gradient-text">Stacks</span>
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={headerInView ? { width: 48 } : { width: 0 }}
                        transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg, #00d4ff, #6366f1)", marginTop: 10, marginLeft: "auto", marginRight: "auto" }}
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={headerInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        style={{ marginTop: 12, color: "var(--text-secondary)", fontSize: "0.95rem" }}
                    >
                        Production-grade tools across the full stack, from UI to cloud.
                    </motion.p>
                </motion.div>

                {/* 2-column panel grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
                    gap: 20,
                }}>
                    {techStackCategories.map((cat, i) => (
                        <CategoryPanel key={cat.name} cat={cat} index={i} isLight={isLight} />
                    ))}
                </div>
            </div>
        </section>
    );
}
