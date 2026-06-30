"use client";

import { useState, useCallback, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import { track } from "@/lib/track";

type Status = "idle" | "submitting" | "success" | "error";

export function useLeadForm(formType: string, options?: { redirectTo?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const started = useRef(false);

  // À appeler à la première interaction du formulaire (focus/change).
  const notifyStart = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track("lead_form_started", { formType });
  }, [formType]);

  const goSuccess = useCallback(() => {
    setStatus("success");
    track("lead_form_submitted", { formType });
    if (formType === "guide-diaspora") track("guide_requested");
    if (formType === "diagnostic-projet") track("diagnostic_completed");
    if (options?.redirectTo && typeof window !== "undefined") {
      window.location.assign(options.redirectTo);
    }
  }, [formType, options?.redirectTo]);

  const submit = useCallback(
    async (data: Record<string, unknown>, honeypot: string) => {
      // Honeypot rempli => on simule un succès silencieux (bot).
      if (honeypot) {
        setStatus("success");
        return true;
      }
      setStatus("submitting");
      setMessage("");
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formType, data, page: typeof window !== "undefined" ? window.location.pathname : "" }),
        });
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          fallback?: string;
        };
        if (res.ok && json.ok) {
          goSuccess();
          return true;
        }
        // Message d'erreur explicite — jamais d'échec silencieux.
        setStatus("error");
        setMessage(
          json.error ||
            "L'envoi n'a pas pu aboutir. Réessaie, ou contacte-nous directement sur WhatsApp."
        );
        return false;
      } catch {
        setStatus("error");
        setMessage(
          "Connexion impossible. Réessaie dans un instant, ou écris-nous sur WhatsApp."
        );
        return false;
      }
    },
    [formType, goSuccess]
  );

  return { status, message, submit, notifyStart, reset: () => setStatus("idle") };
}

export function SuccessPanel({
  title = "Bien reçu — merci pour ta confiance.",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const wa = whatsappHref("Bonjour YOoN, je viens de remplir le formulaire sur le site.");
  return (
    <div
      className="rounded-card border border-valide/40 bg-valide/8 p-7 text-center"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="mx-auto h-10 w-10 text-valide" aria-hidden="true" />
      <p className="mt-4 font-display text-xl font-semibold text-anthracite">{title}</p>
      <p className="mt-2 text-pretty text-anthracite/75">
        {children ??
          "On revient vers toi rapidement, avec des réponses claires et sans bla-bla. Si c'est urgent, écris-nous directement."}
      </p>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-token bg-valide px-5 py-3 font-sans font-semibold text-white transition-transform hover:-translate-y-0.5"
          data-cta="success_whatsapp"
        >
          Continuer sur WhatsApp
        </a>
      )}
    </div>
  );
}

export function SubmitButton({
  children,
  pending,
  track,
}: {
  children: React.ReactNode;
  pending: boolean;
  track?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      data-cta={track}
      className={
        "inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-token " +
        "bg-forest px-7 py-4 font-sans text-base font-semibold text-ivoire shadow-soft " +
        "transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-card " +
        "disabled:pointer-events-none disabled:opacity-60"
      }
    >
      {children}
    </button>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      className="rounded-token border border-alerte/30 bg-alerte/8 px-4 py-3 text-sm font-medium text-alerte"
      role="alert"
    >
      {message}
    </p>
  );
}
