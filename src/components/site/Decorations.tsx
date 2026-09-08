import React from "react";

type DecorProps = React.SVGProps<SVGSVGElement>;

export const BasilDecor = (props: DecorProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2C7.5 2 4 7 4 13C4 19 12 22 12 22C12 22 20 19 20 13C20 7 16.5 2 12 2Z" />
    <path d="M12 22V10" />
    <path d="M12 16L8 14" />
    <path d="M12 13L16 11" />
  </svg>
);

export const OliveDecor = (props: DecorProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const TomatoDecor = (props: DecorProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2V4" />
    <path d="M12 20V22" />
    <path d="M2 12H4" />
    <path d="M20 12H22" />
    <path d="M5 5L6.5 6.5" />
    <path d="M19 19L17.5 17.5" />
    <path d="M5 19L6.5 17.5" />
    <path d="M19 5L17.5 6.5" />
    <path d="M12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    <path d="M9 9A2 2 0 0 0 9 13" />
    <path d="M15 15A2 2 0 0 0 15 11" />
  </svg>
);

export const MushroomDecor = (props: DecorProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 12c0-4.4-4-8-8-8s-8 3.6-8 8h16z" />
    <path d="M10 12v8h4v-8" />
    <path d="M7 12v2" />
    <path d="M17 12v2" />
  </svg>
);

export const PizzaSliceDecor = (props: DecorProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 21L2 5c2-2 18-2 20 0L12 21z" />
    <path d="M2 5c2.5-1.5 17.5-1.5 20 0" strokeWidth="1.5" />
    <circle cx="12" cy="10" r="1.5" />
    <circle cx="10" cy="15" r="1.5" />
    <circle cx="15" cy="8" r="1.5" />
  </svg>
);

export const FlourDecor = (props: DecorProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="4" cy="4" r="1.5" />
    <circle cx="10" cy="2" r="1" />
    <circle cx="20" cy="6" r="2" />
    <circle cx="6" cy="14" r="1" />
    <circle cx="14" cy="10" r="1.5" />
    <circle cx="22" cy="16" r="1" />
    <circle cx="16" cy="20" r="1.5" />
    <circle cx="8" cy="22" r="1" />
    <circle cx="12" cy="16" r="0.5" />
  </svg>
);

export const DoughCurveDecor = (props: DecorProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none" {...props}>
    <path d="M0,50 Q25,20 50,50 T100,50" />
  </svg>
);
