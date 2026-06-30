import { cn } from "@/lib/cn";

/**
 * Logo officiel YOoN — reproduction vectorielle fidèle du lockup fourni
 * (assets/yoon-logo-lockup.jpg) : trajectoire en pointillés ocre → « œil »/repère
 * de carte → wordmark serif « Yoon ». Concept « ton œil sur place ».
 *
 * `tone="dark"`  → encre anthracite (sur fond clair)
 * `tone="light"` → encre ivoire (sur fond sombre)
 */
type LogoProps = {
  tone?: "dark" | "light";
  withWord?: boolean;
  showImmobilier?: boolean;
  className?: string;
};

export function Logo({
  tone = "dark",
  withWord = true,
  showImmobilier = true,
  className,
}: LogoProps) {
  const ink = tone === "light" ? "#F4EFE5" : "#1C1C1A";

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 leading-none", className)}
      aria-hidden="true"
    >
      <svg
        className="h-[1.55em] w-auto flex-none"
        viewBox="0 0 34 30"
        fill="none"
        focusable="false"
      >
        {/* trajectoire pointillée — ocre */}
        <path
          d="M3 24 C 8 14, 13 26, 18 16 S 27 6, 31 9"
          stroke="#C2703D"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.1 5.2"
        />
        {/* point de départ */}
        <circle cx="3" cy="24" r="2.6" fill={ink} />
        {/* œil / repère de carte */}
        <circle cx="31" cy="9" r="3" fill="none" stroke={ink} strokeWidth="2.2" />
        <circle cx="31" cy="9" r="0.7" fill={ink} />
      </svg>
      {withWord && (
        <span className="flex items-baseline gap-2">
          <span
            className="font-serif text-[1.45em] font-semibold leading-none tracking-tight"
            style={{ color: ink }}
          >
            Yoon
          </span>
          {showImmobilier && (
            <span
              className="hidden font-sans text-[0.5em] font-semibold uppercase tracking-[0.32em] sm:inline"
              style={{ color: tone === "light" ? "#C2A14D" : "#8A8278" }}
            >
              Immobilier
            </span>
          )}
        </span>
      )}
    </span>
  );
}
