"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select, RadioCards, Consent, Honeypot } from "./fields";
import { useLeadForm, SuccessPanel, ErrorBanner, SubmitButton } from "./submit";

const ZONES = [
  "Ouest Foire",
  "Almadies",
  "Ngor",
  "Mermoz",
  "Yoff",
  "Sacré-Cœur",
  "Plateau",
  "Périphérie de Dakar",
];

export function ProjetForm() {
  const { status, message, submit } = useLeadForm("demande-projet");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const prenom = get("prenom");
    const email = get("email");
    const whatsapp = get("whatsapp");
    const projet = get("projet");
    const consent = fd.get("consent");

    const next: Record<string, string> = {};
    if (!projet) next.projet = "Indique le type de projet.";
    if (!prenom) next.prenom = "Ton prénom, pour qu'on se parle simplement.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Une adresse email valide est nécessaire.";
    if (!whatsapp) next.whatsapp = "Un numéro WhatsApp pour échanger plus vite.";
    if (!consent) next.consent = "Merci de cocher cette case pour qu'on puisse te répondre.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      first?.focus();
      return;
    }

    await submit(
      {
        projet,
        typeBien: get("typeBien"),
        zone: get("zone"),
        budget: get("budget"),
        delai: get("delai"),
        pays: get("pays"),
        prenom,
        email,
        whatsapp,
        message: get("message"),
      },
      get("company_website")
    );
  }

  if (status === "success") {
    return (
      <SuccessPanel title="Demande envoyée — on étudie ton projet.">
        Mohamed et l&apos;équipe reviennent vers toi avec des réponses concrètes et une première
        lecture honnête de ton projet. Pas de pression, pas de blabla.
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot />
      <ErrorBanner message={status === "error" ? message : ""} />

      <RadioCards
        legend="Ton projet"
        name="projet"
        required
        error={errors.projet}
        options={[
          { value: "achat", label: "Acheter pour habiter" },
          { value: "investissement", label: "Investissement locatif" },
          { value: "construction", label: "Construire / faire construire" },
          { value: "airbnb", label: "Meublé / Airbnb" },
          { value: "autre", label: "Autre" },
        ]}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Type de bien" name="typeBien">
          {(p) => (
            <Select {...p} defaultValue="">
              <option value="">Sélectionne…</option>
              <option value="appartement">Appartement</option>
              <option value="villa">Villa</option>
              <option value="terrain">Terrain</option>
              <option value="immeuble">Immeuble</option>
              <option value="je-ne-sais-pas">Je ne sais pas encore</option>
            </Select>
          )}
        </Field>

        <Field
          label="Zone recherchée"
          name="zone"
          hint="Quartiers de Dakar — suggestions disponibles"
        >
          {(p) => (
            <>
              <TextInput {...p} type="text" list="zones-dakar" placeholder="Ex. Ouest Foire" />
              <datalist id="zones-dakar">
                {ZONES.map((z) => (
                  <option key={z} value={z} />
                ))}
              </datalist>
            </>
          )}
        </Field>

        <Field label="Budget" name="budget">
          {(p) => (
            <Select {...p} defaultValue="">
              <option value="">Fourchette indicative</option>
              <option value="<25M">Moins de 25 M FCFA</option>
              <option value="25-50M">25 – 50 M FCFA</option>
              <option value="50-100M">50 – 100 M FCFA</option>
              <option value="100-250M">100 – 250 M FCFA</option>
              <option value=">250M">Plus de 250 M FCFA</option>
              <option value="a-discuter">Je préfère en discuter</option>
            </Select>
          )}
        </Field>

        <Field label="Délai" name="delai">
          {(p) => (
            <Select {...p} defaultValue="">
              <option value="">Quand veux-tu avancer ?</option>
              <option value="immediat">Immédiat</option>
              <option value="3-6">3 à 6 mois</option>
              <option value="6-12">6 à 12 mois</option>
              <option value="+12">Plus de 12 mois</option>
              <option value="renseigne">Je me renseigne</option>
            </Select>
          )}
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Prénom" name="prenom" required error={errors.prenom}>
          {(p) => <TextInput {...p} type="text" autoComplete="given-name" />}
        </Field>
        <Field label="Email" name="email" required error={errors.email}>
          {(p) => <TextInput {...p} type="email" autoComplete="email" />}
        </Field>
        <Field label="WhatsApp" name="whatsapp" required error={errors.whatsapp}>
          {(p) => <TextInput {...p} type="tel" autoComplete="tel" placeholder="+33 …" />}
        </Field>
      </div>

      <Field label="Pays de résidence" name="pays" hint="France, Belgique, Canada, USA, UK…">
        {(p) => <TextInput {...p} type="text" autoComplete="country-name" />}
      </Field>

      <Field label="Ton projet en quelques mots" name="message">
        {(p) => (
          <TextArea
            {...p}
            placeholder="Un bien repéré, une ville, une question précise… dis-nous l'essentiel."
          />
        )}
      </Field>

      <Consent error={errors.consent} />

      <SubmitButton pending={status === "submitting"} track="submit_demande_projet">
        {status === "submitting" ? "Envoi…" : "Envoyer ma demande"}
      </SubmitButton>
      <p className="text-center text-sm text-pierre">
        Réponse sous 48 h ouvrées. Sans engagement.
      </p>
    </form>
  );
}
