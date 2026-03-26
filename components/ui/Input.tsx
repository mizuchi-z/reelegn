"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-mono text-[#5A7089] uppercase tracking-widest">
          {label}
        </label>
      )}
      <input
        className={`
          bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px]
          px-4 py-3 font-sans text-sm
          transition-all duration-150 outline-none w-full
          focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)]
          placeholder:text-[#5A7089]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-[#FB923C]" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-[#FB923C] font-mono">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  counter?: { current: number; max: number };
}

export function Textarea({ label, error, counter, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-mono text-[#5A7089] uppercase tracking-widest">
          {label}
        </label>
      )}
      <textarea
        className={`
          bg-[#111F30] text-[#E8EFF6] border border-[rgba(0,180,216,0.12)] rounded-[6px]
          px-4 py-3 font-sans text-sm resize-none
          transition-all duration-150 outline-none w-full
          focus:border-[#00B4D8] focus:shadow-[0_0_10px_rgba(0,180,216,0.15)]
          placeholder:text-[#5A7089]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-[#FB923C]" : ""}
          ${className}
        `}
        {...props}
      />
      <div className="flex justify-between items-center">
        {error && <p className="text-xs text-[#FB923C] font-mono">{error}</p>}
        {counter && (
          <p className={`text-xs font-mono ml-auto ${counter.current > counter.max ? "text-[#FB923C]" : "text-[#5A7089]"}`}>
            {counter.current}/{counter.max}
          </p>
        )}
      </div>
    </div>
  );
}
