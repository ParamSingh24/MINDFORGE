import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface ScrollStackItemProps {
    children: React.ReactNode;
    className?: string;
    i?: number;
    total?: number;
    progress?: MotionValue<number>;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    className = "",
    i = 0,
    total = 0,
    progress,
}) => {

    const targetScale = 1 - (total - i) * 0.02;



    const style = progress ? {
        scale: useTransform(
            progress,
            [i / total, 1],
            [1, targetScale]
        )
    } : {};

    const finalStyle = i === total - 1 ? { scale: 1 } : style;

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center sticky top-0 ${className} rounded-[40px]`}
            style={{
                top: `calc(10vh + ${i * 40}px)`,
                minHeight: '400px',
                marginBottom: '50vh',
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
        >
            {items.map((child, i) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        i,
                        total,
                        progress: scrollYProgress
                    });
                }
                return child;
            })}
            <div className="h-[50vh]" />
        </div>
    );
};

export default ScrollStack;
