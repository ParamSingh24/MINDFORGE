
import React from "react";
import { cn } from "@/lib/utils";

const ShineBorder = ({
  children,
  className,
  color = ["#A07CFE", "#FE8A71", "#FED7AA"],
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  color?: string[];
  [key: string]: any;
}) => {
  return (
    <div
      style={
        {
          "--shine-color-1": color[0],
          "--shine-color-2": color[1],
          "--shine-color-3": color[2],
        } as React.CSSProperties
      }
      className={cn(
        "group rounded-lg p-px",
        "bg-gradient-to-b from-[--shine-color-1] to-[--shine-color-2]",
        className
      )}
      {...props}
    >
      <div className="h-full rounded-[7px] bg-black/20 backdrop-blur-sm px-4 py-2 transition-colors duration-300 group-hover:bg-black/30">
        {children}
      </div>
    </div>
  );
};

export default ShineBorder;
