export default function StudioIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Creative studio illustration"
      className={className}
    >
      <rect
        x="20"
        y="30"
        width="280"
        height="160"
        rx="18"
        fill="#fff0f6"
        stroke="#fbcfe8"
        strokeWidth="3"
      />

      {/* spotlight */}
      <path d="M78 40 L116 40 L150 96 L44 96 Z" fill="#fde68a" opacity="0.5" />
      <rect x="80" y="26" width="34" height="14" rx="7" fill="#f472b6" />

      {/* camera */}
      <rect x="136" y="98" width="76" height="46" rx="10" fill="#ec4899" />
      <rect x="154" y="88" width="40" height="14" rx="6" fill="#be185d" />
      <circle
        cx="174"
        cy="121"
        r="15"
        fill="#fff0f6"
        stroke="#9d174d"
        strokeWidth="4"
      />
      <circle cx="174" cy="121" r="6" fill="#9d174d" />

      {/* tripod */}
      <path
        d="M154 144 L132 188 M194 144 L216 188 M174 144 L174 188"
        stroke="#9d174d"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* floor */}
      <path
        d="M42 190 H278"
        stroke="#f9a8d4"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* sparkles */}
      <circle cx="236" cy="64" r="4" fill="#f472b6" />
      <circle cx="252" cy="84" r="3" fill="#f9a8d4" />
      <circle cx="60" cy="150" r="3" fill="#f9a8d4" />
      <path
        d="M250 52 v10 M245 57 h10"
        stroke="#f472b6"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
