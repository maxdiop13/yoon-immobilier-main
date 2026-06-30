"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Consent, Honeypot } from "./fields";
import { useLeadForm, SuccessPanel, ErrorBanner, SubmitButton } from "./submit";

export function VerifBienForm() {
  const { status, message, submit } = useLeadForm("verifier-un-bien");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const prenom = get("prenom");
    const whatsapp = get("whatsapp");
    const bien = get("bien");
    const consent = fd.get("consent");

    const next: Record<string, string> = {};
    if (!bien) next.bien = "Décris le bien ou colle le lien de l'annonce.";
    if (!prenom) next.prenom = "Ton prénom, pour qu'on se parle simplement.";
    if (!whatsapp) next.whatsapp = "Un numéro WhatsApp pour te transmettre nos constats.";
    if (!consent) next.consent = "Merci de cocher cette case pour qu'on puisse te répondre.";
    setErrors(next);
    if (Object.keys(next).length) return;

    await submit(
      {
        bien,
        lienMedia: get("lienMedia"),
        prenom,
        whatsapp,
        email: get("email"),
      },
      get("company_website")
    );
  }

  if (status === "success") {
    return (
      <SuccessPanel title="Reçu — on regarde ça de près.">
        On revient vers toi avec une première lecture : ce qui semble sain, ce qui mérite une
        visite sur place, et les documents à demander avant d&apos;aller plus loin.
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <ErrorBanner message={status === "error" ? message : ""} />

      <Field
        label="Le bien à vérifier"
        name="bien"
        required
        error={errors.bien}
        hint="Lien de l'annonce, adresse approximative, ou description (type, quartier, prix demandé)."
      >
        {(p) => (
          <TextArea {...p} placeholder="Ex. Appartement T3 à Mermoz, annonce vue sur… , prix demandé…" />
        )}
      </Field>

      <Field
        label="Lien d'une vidéo ou de photos (optionnel)"
        name="lienMedia"
        hint="Un lien WhatsApp, Drive, YouTube… si tu as déjà des images du bien."
      >
        {(p) => <TextInput {...p} type="url" placeholder="https://…" />}
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Prénom" name="prenom" required error={errors.prenom}>
          {(p) => <TextInput {...p} type="text" autoComplete="given-name" />}
        </Field>
        <Field label="WhatsApp" name="whatsapp" required error={errors.whatsapp}>
          {(p) => <TextInput {...p} type="tel" autoComplete="tel" placeholder="+33 …" />}
        </Field>
        <Field label="Email (optionnel)" name="email">
          {(p) => <TextInput {...p} type="email" autoComplete="email" />}
        </Field>
      </div>

      <Consent error={errors.consent} />

      <SubmitButton pending={status === "submitting"} track="submit_verifier_bien">
        {status === "submitting" ? "Envoi…" : "Faire vérifier ce bien"}
      </SubmitButton>
    </form>
  );
}
