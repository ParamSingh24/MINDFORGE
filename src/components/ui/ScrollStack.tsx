import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface ScrollStackItemProps {
    children: React.ReactNode;
    className?: string; // Standard className prop
    i?: number; // Index (injected by parent)
    total?: number; // Total items (injected by parent)
    progress?: MotionValue<number>; // Scroll progress (injected by parent)
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    className = "",
    i = 0,
    total = 0,
    progress,
}) => {
    // Calculate scale based on the parent's scroll progress
    // We want the card to be scale 1 until it starts being covered by the next one.
    // Actually, we want it to settle at a stacked scale.

    // Let's rely on a simpler per-card sticky logic if possible, 
    // but for a unified stack effect, we often need the parent's progress.

    // Alternative: Pure CSS Sticky for position, generic scale.
    // BUT the user wants the specific "Stack" look.

    // Let's try the "Card handles its own transform" approach relative to viewport?
    // UseScroll({ target: cardRef, offset: ['start end', 'start start'] })?
    // No, sticky breaks standard IntersectionObservers often.

    // Let's use the Parent Progress injection which is reliable.
    const targetScale = 1 - (total - i) * 0.02;

    // We want to scale from 1 to targetScale as the scroll progresses past this card.
    // The range for card `i` is roughly `i / total` to `(i + 1) / total`.

    // Simple check: default to plain div if progress isn't passed (safety)
    const style = progress ? {
        scale: useTransform(
            progress,
            [i / total, 1],
            [1, targetScale]
        )
    } : {};

    // Additional dynamic styles?
    // Ensure we don't scale the last item
    const finalStyle = i === total - 1 ? { scale: 1 } : style;

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center sticky top-0 ${className} rounded-[40px]`}
            style={{
                top: `calc(10vh + ${i * 40}px)`, // Stacking offset
                minHeight: '400px', // Ensure it takes effective space
                marginBottom: '50vh', // Space to scroll through
            }}
        >
            <motion.div
                style={finalStyle}
                className={`w-full h-full bg-black/20 backdrop-blur-md border border-white/5 p-6 md:p-12 rounded-[30px] md:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] overflow-hidden origin-top`}
            >
                {children}
            </motion.div>
        </div>
    );
};

interface ScrollStackProps {
    children: React.ReactNode;
    className?: string;
    itemHeight?: number;
    useWindowScroll?: boolean;
    itemStackDistance?: number;
    itemScale?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const items = React.Children.toArray(children);
    const total = items.length;

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className}`}
        // No fixed height here, let the content define it via margins/padding
        >
            {items.map((child, i) => {
                // Clone element to pass props
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        i,
                        total,
                        progress: scrollYProgress
                    });
                }
                return child;
            })}
            <div className="h-[50vh]" /> {/* Spacer to ensure last item stacks */}
        </div>
    );
};

export default ScrollStack;
