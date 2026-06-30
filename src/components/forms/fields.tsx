"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/* Wrapper champ : label lié + message d'erreur accessible */
export function Field({
  label,
  name,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-sans text-sm font-semibold text-anthracite">
        {label}
        {required && <span className="ml-1 text-ocre" aria-hidden="true">*</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-pierre">
          {hint}
        </p>
      )}
      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy || undefined,
      })}
      {error && (
        <p id={errId} className="mt-1.5 text-sm font-medium text-alerte" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldBase =
  "w-full rounded-token border bg-casse px-4 py-3 font-sans text-anthracite " +
  "placeholder:text-pierre/70 transition-colors focus:border-forest focus:outline-none " +
  "focus-visible:outline-none min-h-[44px]";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={cn(
        fieldBase,
        rest["aria-invalid"] ? "border-alerte" : "border-sable",
        className
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      {...rest}
      className={cn(
        fieldBase,
        "min-h-[120px] resize-y leading-relaxed",
        rest["aria-invalid"] ? "border-alerte" : "border-sable",
        className
      )}
    />
  );
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return (
    <select
      {...rest}
      className={cn(
        fieldBase,
        "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10",
        rest["aria-invalid"] ? "border-alerte" : "border-sable",
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238A8278' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
      }}
    >
      {children}
    </select>
  );
}

/* Cartes radio accessibles (fieldset/legend) */
export function RadioCards({
  legend,
  name,
  options,
  required,
  error,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-sans text-sm font-semibold text-anthracite">
        {legend}
        {required && <span className="ml-1 text-ocre" aria-hidden="true">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="cursor-pointer rounded-token border border-sable bg-casse px-3.5 py-2.5 text-sm font-medium text-anthracite transition-colors hover:border-forest/50 has-[:checked]:border-forest has-[:checked]:bg-forest/8 has-[:checked]:text-forest has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest"
          >
            <input type="radio" name={name} value={opt.value} className="sr-only" />
            {opt.label}
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-sm font-medium text-alerte" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* Case de consentement RGPD */
export function Consent({ error }: { error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          name="consent"
          type="checkbox"
          aria-invalid={Boolean(error)}
          className="mt-1 h-5 w-5 flex-none rounded border-sable text-forest accent-[#1E5C45]"
        />
        <span className="text-sm leading-relaxed text-anthracite/75">
          J&apos;accepte que mes données soient utilisées pour être recontacté·e au sujet de ma
          demande. Voir la{" "}
          <a href="/politique-de-confidentialite" className="text-forest underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>
      {error && (
        <p className="mt-1.5 text-sm font-medium text-alerte" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* Honeypot anti-spam (caché aux humains, visible aux bots) */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor="company-website">Ne pas remplir ce champ</label>
      <input
        id="company-website"
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
