import React from 'react';

/**
 * Renders a Bed (Double) icon.
 * @param {object} props - The component props.
 * @param {number} [props.size=24] - The size of the icon in pixels.
 * @param {string} [props.color="currentColor"] - The color of the icon.
 * @param {string} [props.className=""] - Additional CSS classes to apply.
 */
const BedDouble = ({ size = 24, color = "currentColor", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M12 4v6" />
      <path d="M2 18h20" />
    </svg>
  );
};

export default BedDouble;