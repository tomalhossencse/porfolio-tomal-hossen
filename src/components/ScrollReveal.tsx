"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface Props {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
    once?: boolean;
    amount?: number;
}

const getInitial = (d: Direction) => {
    switch (d) {
        case "up": return { opacity: 0, y: 48 };
        case "down": return { opacity: 0, y: -48 };
        case "left": return { opacity: 0, x: 60 };
        case "right": return { opacity: 0, x: -60 };
        case "scale": return { opacity: 0, scale: 0.82 };
        case "fade": return { opacity: 0 };
    }
};

export default function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.65,
    className,
    style,
    once = true,
    amount = 0.15,
}: Props) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, amount });

    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            initial={getInitial(direction)}
            animate={inView
                ? { opacity: 1, y: 0, x: 0, scale: 1 }
                : getInitial(direction)
            }
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
