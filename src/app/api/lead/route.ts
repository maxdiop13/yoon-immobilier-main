import { NextResponse } from "next/server";

/**
 * Endpoint de réception des formulaires — configurable par variable d'environnement.
 *
 * - Si FORM_WEBHOOK_URL est défini : on relaie la soumission (POST JSON aplati) vers ce
 *   webhook — compatible Make / Zapier / Airtable / Google Sheet / n8n / CRM.
 *   En-tête Authorization optionnel via FORM_WEBHOOK_TOKEN.
 * - Sinon : on renvoie `ok:false` avec un message clair (jamais d'échec silencieux,
 *   jamais de redirection vers /merci). L'utilisateur est invité à passer par WhatsApp.
 *
 * Champs transmis (aplatis) : prenom, email, whatsapp/telephone, pays/residence,
 * projet, budget, delai, + source, page, receivedAt (timestamp ISO), formType.
 */

const MAX_FIELD = 4000;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.slice(0, MAX_FIELD).trim();
}

export async function POST(request: Request) {
  let body: { formType?: string; data?: Record<string, unknown>; page?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const formType = sanitize(body.formType) || "inconnu";
  const page = sanitize(body.page);
  const rawData = body.data && typeof body.data === "object" ? body.data : {};

  // Honeypot serveur : si rempli, on répond OK sans rien transmettre.
  if (sanitize(rawData["company_website"])) {
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(rawData)) {
    if (k === "company_website") continue;
    data[k] = sanitize(v);
  }

  const source = formType.includes("guide")
    ? "guide"
    : formType.includes("diagnostic")
      ? "diagnostic"
      : formType;

  // Payload aplati (lisible par Google Sheet / Airtable / Make sans transformation).
  const payload = {
    source,
    formType,
    page,
    receivedAt: new Date().toISOString(),
    ...data,
  };

  const webhook = process.env.FORM_WEBHOOK_URL;

  if (webhook) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.FORM_WEBHOOK_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.FORM_WEBHOOK_TOKEN}`;
      }
      const res = await fetch(webhook, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook status ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Service d'envoi momentanément indisponible. Réessaie ou écris-nous sur WhatsApp." },
        { status: 502 }
      );
    }
  }

  // Pas de webhook configuré : message clair, pas d'échec silencieux, pas de redirection.
  return NextResponse.json(
    {
      ok: false,
      error:
        "On ne peut pas encore enregistrer ta demande en ligne. Écris-nous directement sur WhatsApp — on te répond tout de suite.",
    },
    { status: 503 }
  );
}
