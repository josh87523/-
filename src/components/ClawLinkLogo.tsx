import React from 'react';

interface ClawLinkLogoProps {
  className?: string;
}

export default function ClawLinkLogo({ className = '' }: ClawLinkLogoProps) {
  return (
    <span className={`font-brand font-black drop-shadow-sm ${className}`}>
      <span className="text-[var(--color-brand-purple)]">C</span>
      <span className="text-[var(--color-brand-yellow)]">l</span>
      <span className="text-[var(--color-brand-green)]">a</span>
      <span className="text-[var(--color-brand-purple)]">w</span>
      <span className="text-[var(--color-brand-yellow)]">L</span>
      <span className="text-[var(--color-brand-green)]">i</span>
      <span className="text-[var(--color-brand-purple)]">n</span>
      <span className="text-[var(--color-brand-yellow)]">k</span>
    </span>
  );
}
