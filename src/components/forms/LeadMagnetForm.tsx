"use client";

import { useState } from "react";
import { Field, TextInput, Honeypot } from "./fields";
import { useLeadForm, ErrorBanner, SubmitButton } from "./submit";
import { CheckCircle2 } from "lucide-react";

/**
 * Capture email (lead magnet) : checklist « Avant d'acheter » + liste hebdo
 * « 1 conseil + 1 opportunité vérifiée par semaine ».
 * Compacte, posable dans une section sombre (tone="light") ou claire.
 */
export function LeadMagnetForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { status, message, submit } = useLeadForm("checklist-diaspora");
  const [error, setError] = useState("");
  const light = tone === "light";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const consent = fd.get("consent");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Indique une adresse email valide.");
      return;
    }
    if (!consent) {
      setError("Merci d'accepter de recevoir la checklist par email.");
      return;
    }
    setError("");
    await submit({ email }, String(fd.get("company_website") || ""));
  }

  if (status === "success") {
    return (
      <div
        className={
          "flex items-center gap-3 rounded-card border p-5 " +
          (light ? "border-ivoire/25 bg-ivoire/10 text-ivoire" : "border-valide/40 bg-valide/8")
        }
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-7 w-7 flex-none text-valide" aria-hidden="true" />
        <p className="text-pretty">
          C&apos;est parti — surveille ta boîte mail. La checklist arrive, puis un conseil utile
          chaque semaine. Désinscription en un clic.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <Honeypot />
      {error && <ErrorBanner message={error} />}
      {status === "error" && <ErrorBanner message={message} />}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Field label="Ton email" name="email" required>
            {(p) => <TextInput {...p} type="email" autoComplete="email" placeholder="prenom@email.com" />}
          </Field>
        </div>
        <div className="sm:self-end">
          <SubmitButton pending={status === "submitting"} track="submit_lead_magnet">
            {status === "submitting" ? "Envoi…" : "Recevoir la checklist"}
          </SubmitButton>
        </div>
      </div>
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          name="consent"
          type="checkbox"
          className="mt-1 h-5 w-5 flex-none rounded accent-[#1E5C45]"
        />
        <span className={"text-sm leading-relaxed " + (light ? "text-ivoire/75" : "text-anthracite/70")}>
          J&apos;accepte de recevoir la checklist et les conseils par email. Désinscription à tout
          moment — voir la{" "}
          <a
            href="/politique-de-confidentialite"
            className={light ? "text-dore underline" : "text-forest underline"}
          >
            politique de confidentialité
          </a>
          .
        </span>
      </label>
    </form>
  );
}
