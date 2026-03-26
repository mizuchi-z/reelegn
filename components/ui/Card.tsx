import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className = "", hover = false, glow = false }: CardProps) {
  return (
    <div
      className={`
        bg-[#0D1826] border border-[rgba(0,180,216,0.12)] rounded-[8px]
        ${hover ? "transition-all duration-150 hover:border-[#00B4D8] hover:shadow-[0_0_15px_rgba(0,180,216,0.2)] cursor-pointer" : ""}
        ${glow ? "shadow-[0_0_20px_rgba(0,180,216,0.1)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
