"use client";

import { useState } from "react";
import { Field, TextInput, Consent, Honeypot } from "./fields";
import { useLeadForm, SuccessPanel, ErrorBanner, SubmitButton } from "./submit";
import { CTAButton } from "@/components/CTAButton";
import { whatsappHref } from "@/lib/site";

/**
 * Formulaire de capture de lead sur une fiche projet :
 * « Ce projet m'intéresse / Être tenu au courant » + WhatsApp.
 */
export function ProjetLeadForm({ projet }: { projet: string }) {
  const { status, message, submit, notifyStart } = useLeadForm("projet-interet", {
    redirectTo: "/merci?source=projet",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const wa = whatsappHref(
    `Bonjour YOoN, le projet « ${projet} » m'intéresse, j'aimerais en savoir plus.`
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const prenom = get("prenom");
    const email = get("email");
    const whatsapp = get("whatsapp");
    const consent = fd.get("consent");
    const next: Record<string, string> = {};
    if (!prenom) next.prenom = "Indique au moins ton prénom.";
    if (!email && !whatsapp) next.email = "Laisse un email ou un WhatsApp pour qu'on te recontacte.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Email invalide.";
    if (!consent) next.consent = "Merci de cocher cette case pour qu'on puisse te répondre.";
    setErrors(next);
    if (Object.keys(next).length) return;
    await submit({ projet, prenom, email, whatsapp }, get("company_website"));
  }

  if (status === "success") {
    return (
      <SuccessPanel title="C'est noté — on te tient au courant.">
        Merci pour ton intérêt. On revient vers toi avec les prochaines étapes de ce projet, à
        titre indicatif et sous réserve de vérification.
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={notifyStart} noValidate className="relative space-y-4">
      <Honeypot />
      <ErrorBanner message={status === "error" ? message : ""} />
      <Field label="Prénom" name="prenom" required error={errors.prenom}>
        {(p) => <TextInput {...p} type="text" autoComplete="given-name" placeholder="Ton prénom" />}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" name="email" error={errors.email}>
          {(p) => <TextInput {...p} type="email" autoComplete="email" placeholder="prenom@email.com" />}
        </Field>
        <Field label="WhatsApp" name="whatsapp">
          {(p) => <TextInput {...p} type="tel" autoComplete="tel" placeholder="+33 …" />}
        </Field>
      </div>
      <Consent error={errors.consent} />
      <SubmitButton pending={status === "submitting"} track="submit_projet_interet">
        {status === "submitting" ? "Envoi…" : "Être tenu·e au courant"}
      </SubmitButton>
      {wa && (
        <div className="pt-1 text-center">
          <p className="mb-2 text-sm text-anthracite/60">Tu préfères échanger directement ?</p>
          <CTAButton href={wa} variant="whatsapp" track="projet_whatsapp">
            Ce projet m&apos;intéresse — WhatsApp
          </CTAButton>
        </div>
      )}
    </form>
  );
}
