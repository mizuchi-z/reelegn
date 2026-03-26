"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-orbitron font-bold tracking-wide transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#00B4D8] text-[#080F1A] hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,180,216,0.4)] hover:-translate-y-px active:translate-y-0",
    secondary:
      "bg-transparent text-[#00B4D8] border border-[#00B4D8] hover:bg-[rgba(0,180,216,0.15)] hover:shadow-[0_0_15px_rgba(0,180,216,0.3)]",
    ghost:
      "bg-transparent text-[#5A7089] border border-[rgba(0,180,216,0.12)] hover:text-[#E8EFF6] hover:border-[rgba(0,180,216,0.3)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded",
    md: "px-6 py-3 text-sm rounded-md",
    lg: "px-8 py-4 text-base rounded-md",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  );
}
