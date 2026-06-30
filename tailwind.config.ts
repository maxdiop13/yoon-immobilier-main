import type { Config } from "tailwindcss";

/**
 * YOoN Immobilier — design tokens (charte §9 du brief).
 * Source de vérité unique : aucune valeur hex en dur dans les composants.
 * Palette « le document foncier rencontre l'architecture contemporaine africaine ».
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // — Base —
        ivoire: "#F4EFE5", // fond clair principal (~70%)
        anthracite: "#1C1C1A", // texte / fonds sérieux
        forest: {
          DEFAULT: "#1E5C45", // vert profond YOoN — couleur de marque
          deep: "#16432F",
        },
        // — Accents premium —
        ocre: {
          DEFAULT: "#C2703D", // terrain, chantier, surlignage
          deep: "#A85A2C",
        },
        dore: "#C2A14D", // doré discret — filets, jamais aplat large
        // — Fonctionnelles —
        alerte: "#B23A2E", // rouge brique — alerte uniquement
        valide: "#3E8E6A", // vert validation — « vérifié sur place »
        // — Neutres —
        sable: {
          DEFAULT: "#E5D9C3", // sable moyen — séparateurs, cartes
          soft: "#EFE7D6",
        },
        pierre: "#8A8278", // gris pierre — texte secondaire
        casse: "#FBF9F4", // blanc cassé — cartes sur ivoire
      },
      fontFamily: {
        // Titres = Archivo (alternative gratuite de Söhne/Neue Haas)
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        // Corps = Inter
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Accent éditorial parcimonieux = Fraunces (serif)
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        // Coins 16–24px (charte) ; jamais d'angles « bubble »
        token: "16px",
        card: "20px",
        block: "24px",
      },
      maxWidth: {
        shell: "1200px",
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,28,26,.05), 0 18px 44px -28px rgba(28,28,26,.40)",
        soft: "0 1px 2px rgba(28,28,26,.06), 0 10px 26px -18px rgba(28,28,26,.32)",
        lift: "0 1px 2px rgba(28,28,26,.06), 0 30px 60px -30px rgba(28,28,26,.45)",
      },
      letterSpacing: {
        label: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "draw-path": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.9s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
