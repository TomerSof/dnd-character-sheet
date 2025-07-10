'use client';
import React from 'react';

type MedievalBorderProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function MedievalBorder({ className = '', children }: MedievalBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* SVG Border */}
      <svg
        viewBox="0 0 860 660"
        className="w-full h-auto"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base parchment */}
        <rect x="0" y="0" width="860" height="660" className="fill-yellow-100" />

        {/* Outer frame with smooth curls */}
        <path
          d="
            M20 40
            C60 20, 140 20, 180 40
            C220 60, 300 60, 340 40
            C380 20, 460 20, 500 40
            C540 60, 620 60, 660 40
            C700 20, 780 20, 820 40
            L820 620
            C780 640, 700 640, 660 620
            C620 600, 540 600, 500 620
            C460 640, 380 640, 340 620
            C300 600, 220 600, 180 620
            C140 640, 60 640, 20 620
            Z"
          className="fill-yellow-200 stroke-yellow-800 stroke-[7]"
        />

        {/* Fleur-de-lis corners */}
        <g className="fill-yellow-800 stroke-yellow-900 stroke-[2]">
          <path d="M70 70 L90 40 L110 70 L90 90 L80 110 L70 90 Z" />
          <path d="M790 70 L770 40 L750 70 L770 90 L780 110 L790 90 Z" />
          <path d="M70 590 L90 620 L110 590 L90 570 L80 550 L70 570 Z" />
          <path d="M790 590 L770 620 L750 590 L770 570 L780 550 L790 570 Z" />
        </g>

        {/* Side filigree */}
        <g className="stroke-yellow-900 stroke-[1] fill-none">
          <path d="M50 130 C90 170 70 210 60 230 S40 290 75 320" />
          <path d="M50 330 C90 370 70 410 60 430 S40 490 70 520" />
          <path d="M810 130 C770 170 790 210 800 230 S820 290 785 320" />
          <path d="M810 330 C770 370 790 410 800 430 S820 490 780 520" />
        </g>

        {/* Inner parchment */}
        <rect
          x="80"
          y="80"
          width="700"
          height="500"
          rx="20"
          ry="20"
          className="fill-yellow-50 stroke-yellow-700 stroke-[4]"
        />
      </svg>

      {/* Content overlaid */}
      <div className="absolute inset-0 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}
