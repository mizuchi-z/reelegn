import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "green" | "orange" | "purple" | "muted";
  className?: string;
}

export function Badge({ children, variant = "cyan", className = "" }: BadgeProps) {
  const variants = {
    cyan: "text-[#00B4D8] bg-[rgba(0,180,216,0.15)] border-[rgba(0,180,216,0.3)]",
    green: "text-[#34D399] bg-[rgba(52,211,153,0.15)] border-[rgba(52,211,153,0.3)]",
    orange: "text-[#FB923C] bg-[rgba(251,146,60,0.15)] border-[rgba(251,146,60,0.3)]",
    purple: "text-[#A78BFA] bg-[rgba(167,139,250,0.15)] border-[rgba(167,139,250,0.3)]",
    muted: "text-[#5A7089] bg-[rgba(90,112,137,0.15)] border-[rgba(90,112,137,0.3)]",
  };

  return (
    <span
      className={`
        inline-block font-mono text-[11px] tracking-[2px] uppercase
        px-2.5 py-1 rounded-[4px] border
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
