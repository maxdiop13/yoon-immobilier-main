"use client";

import { useState } from "react";
import { Field, TextInput, Select, Consent, Honeypot } from "./fields";
import { useLeadForm, SuccessPanel, ErrorBanner, SubmitButton } from "./submit";

export function RappelForm() {
  const { status, message, submit } = useLeadForm("etre-rappele");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const prenom = String(fd.get("prenom") || "").trim();
    const tel = String(fd.get("telephone") || "").trim();
    const consent = fd.get("consent");
    const next: Record<string, string> = {};
    if (!prenom) next.prenom = "Indique au moins ton prénom.";
    if (!tel) next.telephone = "On a besoin d'un numéro pour te rappeler.";
    if (!consent) next.consent = "Merci de cocher cette case pour qu'on puisse te répondre.";
    setErrors(next);
    if (Object.keys(next).length) return;

    await submit(
      {
        prenom,
        telephone: tel,
        creneau: String(fd.get("creneau") || ""),
      },
      String(fd.get("company_website") || "")
    );
  }

  if (status === "success") {
    return <SuccessPanel title="C'est noté — on te rappelle." >On te recontacte au créneau indiqué. À très vite.</SuccessPanel>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <ErrorBanner message={status === "error" ? message : ""} />
      <Field label="Prénom" name="prenom" required error={errors.prenom}>
        {(p) => <TextInput {...p} type="text" autoComplete="given-name" placeholder="Ton prénom" />}
      </Field>
      <Field label="Téléphone / WhatsApp" name="telephone" required error={errors.telephone}>
        {(p) => <TextInput {...p} type="tel" autoComplete="tel" placeholder="+33 …" />}
      </Field>
      <Field label="Créneau préféré" name="creneau">
        {(p) => (
          <Select {...p} defaultValue="">
            <option value="">Quand te rappeler ?</option>
            <option value="matin">En matinée</option>
            <option value="apres-midi">L&apos;après-midi</option>
            <option value="soir">En soirée</option>
            <option value="weekend">Le week-end</option>
          </Select>
        )}
      </Field>
      <Consent error={errors.consent} />
      <SubmitButton pending={status === "submitting"} track="submit_etre_rappele">
        {status === "submitting" ? "Envoi…" : "Être rappelé·e"}
      </SubmitButton>
    </form>
  );
}
