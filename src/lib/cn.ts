/** Concatène des classes conditionnelles (mini-utilitaire, zéro dépendance). */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
