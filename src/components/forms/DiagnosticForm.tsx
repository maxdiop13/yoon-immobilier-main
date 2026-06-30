"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Field, TextInput, Consent, Honeypot } from "./fields";
import { useLeadForm, SuccessPanel, ErrorBanner, SubmitButton } from "./submit";
import { cn } from "@/lib/cn";

type StepKey = "residence" | "projet" | "budget" | "delai" | "avancement";

const STEPS: { key: StepKey; legend: string; help?: string; options: string[] }[] = [
  {
    key: "residence",
    legend: "Où vis-tu en ce moment ?",
    options: ["France", "Belgique", "Canada", "États-Unis", "Royaume-Uni", "Au Sénégal", "Autre"],
  },
  {
    key: "projet",
    legend: "Quel est ton projet ?",
    options: ["Acheter", "Terrain", "Construire", "Investir (locatif)", "Projet familial", "Je me renseigne"],
  },
  {
    key: "budget",
    legend: "Ton budget, à titre indicatif ?",
    help: "Une fourchette suffit — on affine ensemble.",
    options: ["Moins de 25 M FCFA", "25 – 50 M", "50 – 100 M", "100 – 250 M", "Plus de 250 M", "À définir"],
  },
  {
    key: "delai",
    legend: "Sous quel délai veux-tu avancer ?",
    options: ["Immédiat", "3 – 6 mois", "6 – 12 mois", "Plus de 12 mois", "Je me renseigne"],
  },
  {
    key: "avancement",
    legend: "Où en es-tu aujourd'hui ?",
    options: ["Je débute", "J'ai repéré un bien", "En négociation", "Chantier en cours", "Litige / blocage"],
  },
];

const TOTAL = STEPS.length + 1; // + l'étape coordonnées

export function DiagnosticForm() {
  const { status, message, submit, notifyStart } = useLeadForm("diagnostic-projet", {
    redirectTo: "/merci?source=diagnostic",
  });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onCoords = step === STEPS.length;
  const progress = Math.round(((step + (status === "success" ? 1 : 0)) / TOTAL) * 100);

  function choose(key: string, value: string) {
    notifyStart();
    setAnswers((a) => ({ ...a, [key]: value }));
    // avance en douceur à l'étape suivante
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  async function onFinalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const prenom = String(fd.get("prenom") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const whatsapp = String(fd.get("whatsapp") || "").trim();
    const consent = fd.get("consent");
    const next: Record<string, string> = {};
    if (!prenom) next.prenom = "Ton prénom, pour qu'on se parle simplement.";
    if (!email && !whatsapp) next.email = "Laisse au moins un email ou un WhatsApp.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Email invalide.";
    if (!consent) next.consent = "Merci de cocher cette case pour qu'on puisse te répondre.";
    setErrors(next);
    if (Object.keys(next).length) return;

    await submit(
      { ...answers, prenom, email, whatsapp },
      String(fd.get("company_website") || "")
    );
  }

  if (status === "success") {
    return (
      <SuccessPanel title="Diagnostic reçu — on prépare ta réponse.">
        Merci ! On revient vers toi rapidement avec une première lecture honnête de ton projet et
        les prochaines étapes concrètes. Pas de pression, pas de blabla.
      </SuccessPanel>
    );
  }

  const current = STEPS[step];

  return (
    <div className="relative">
      {/* Progression */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-medium text-anthracite/60">
          <span>
            Étape <span className="tnum text-anthracite">{step + 1}</span> / {TOTAL}
          </span>
          <span className="tnum">{progress}%</span>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sable"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL}
        >
          <div
            className="h-full rounded-full bg-forest transition-all duration-500"
            style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {!onCoords ? (
        <fieldset key={current.key} className="animate-fade-up">
          <legend className="font-display text-xl font-semibold text-anthracite">
            {current.legend}
          </legend>
          {current.help && <p className="mt-1.5 text-sm text-pierre">{current.help}</p>}
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {current.options.map((opt) => {
              const selected = answers[current.key] === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => choose(current.key, opt)}
                  aria-pressed={selected}
                  className={cn(
                    "flex min-h-[52px] items-center justify-between gap-2 rounded-token border px-4 py-3 text-left font-medium transition-all",
                    selected
                      ? "border-forest bg-forest/8 text-forest"
                      : "border-sable bg-casse text-anthracite hover:border-forest/50 hover:-translate-y-0.5"
                  )}
                >
                  {opt}
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 flex-none transition-opacity",
                      selected ? "opacity-100 text-forest" : "opacity-30"
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-anthracite/60 transition-colors hover:text-anthracite"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour
            </button>
          )}
        </fieldset>
      ) : (
        <form onSubmit={onFinalSubmit} noValidate className="relative animate-fade-up space-y-4">
          <Honeypot />
          <p className="font-display text-xl font-semibold text-anthracite">
            Dernière étape : comment te recontacter ?
          </p>
          <ErrorBanner message={status === "error" ? message : ""} />
          <Field label="Prénom" name="prenom" required error={errors.prenom}>
            {(p) => <TextInput {...p} type="text" autoComplete="given-name" />}
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" name="email" error={errors.email}>
              {(p) => <TextInput {...p} type="email" autoComplete="email" />}
            </Field>
            <Field label="WhatsApp" name="whatsapp">
              {(p) => <TextInput {...p} type="tel" autoComplete="tel" placeholder="+33 …" />}
            </Field>
          </div>
          <Consent error={errors.consent} />
          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <SubmitButton pending={status === "submitting"} track="submit_diagnostic">
              {status === "submitting" ? "Envoi…" : "Voir où j'en suis"}
            </SubmitButton>
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-token border border-sable px-5 font-medium text-anthracite/70 transition-colors hover:text-anthracite"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
