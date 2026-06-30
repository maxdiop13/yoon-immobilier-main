"use client";

import { useState } from "react";
import { Field, TextInput, Select, Consent, Honeypot } from "./fields";
import { useLeadForm, SuccessPanel, ErrorBanner, SubmitButton } from "./submit";

/**
 * Lead magnet — « Guide gratuit : Investir au Sénégal sans te faire avoir ».
 * Champs : prénom, email, whatsapp (optionnel), pays de résidence, type de projet.
 */
export function GuideForm() {
  const { status, message, submit, notifyStart } = useLeadForm("guide-diaspora", {
    redirectTo: "/merci?source=guide",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const prenom = get("prenom");
    const email = get("email");
    const consent = fd.get("consent");
    const next: Record<string, string> = {};
    if (!prenom) next.prenom = "Ton prénom, pour personnaliser l'envoi.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Une adresse email valide est nécessaire.";
    if (!consent) next.consent = "Merci de cocher cette case pour recevoir le guide.";
    setErrors(next);
    if (Object.keys(next).length) return;

    await submit(
      { prenom, email, whatsapp: get("whatsapp"), pays: get("pays"), projet: get("projet") },
      get("company_website")
    );
  }

  if (status === "success") {
    return (
      <SuccessPanel title="Le guide arrive dans ta boîte mail.">
        Surveille tes emails (et tes spams, au cas où). On t&apos;enverra aussi, de temps en temps,
        un conseil utile pour investir l&apos;esprit tranquille. Désinscription en un clic.
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={notifyStart} noValidate className="relative space-y-4">
      <Honeypot />
      <ErrorBanner message={status === "error" ? message : ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Prénom" name="prenom" required error={errors.prenom}>
          {(p) => <TextInput {...p} type="text" autoComplete="given-name" placeholder="Ton prénom" />}
        </Field>
        <Field label="Email" name="email" required error={errors.email}>
          {(p) => <TextInput {...p} type="email" autoComplete="email" placeholder="prenom@email.com" />}
        </Field>
      </div>
      <Field label="WhatsApp" name="whatsapp">
        {(p) => (
          <TextInput
            {...p}
            type="tel"
            autoComplete="tel"
            placeholder="+33 6 12 34 56 78 ou +221 77 xxx xx xx"
          />
        )}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Pays de résidence" name="pays">
          {(p) => <TextInput {...p} type="text" autoComplete="country-name" placeholder="France, Belgique…" />}
        </Field>
        <Field label="Type de projet" name="projet">
          {(p) => (
            <Select {...p} defaultValue="">
              <option value="">Sélectionne…</option>
              <option value="achat">Achat</option>
              <option value="terrain">Terrain</option>
              <option value="construction">Construction</option>
              <option value="investissement">Investissement locatif</option>
              <option value="familial">Projet familial</option>
              <option value="je-me-renseigne">Je me renseigne</option>
            </Select>
          )}
        </Field>
      </div>
      <Consent error={errors.consent} />
      <SubmitButton pending={status === "submitting"} track="submit_guide">
        {status === "submitting" ? "Envoi…" : "Recevoir le guide"}
      </SubmitButton>
    </form>
  );
}
