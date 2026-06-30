import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_FIELD = 4000;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.slice(0, MAX_FIELD).trim();
}

const FIELD_LABELS: Record<string, string> = {
  prenom: "Prénom",
  email: "Email",
  whatsapp: "WhatsApp",
  telephone: "Téléphone",
  pays: "Pays",
  residence: "Résidence",
  projet: "Projet",
  budget: "Budget",
  delai: "Délai",
  message: "Message",
  source: "Source",
  formType: "Formulaire",
  page: "Page",
  receivedAt: "Reçu le",
};

function buildEmailHtml(payload: Record<string, string>): string {
  const rows = Object.entries(payload)
    .filter(([, v]) => v)
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] ?? k;
      return `<tr><td style="padding:6px 12px;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 12px;color:#111827;">${v}</td></tr>`;
    })
    .join("");

  const sourceLabel = payload.source ?? payload.formType ?? "Formulaire";

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f9fafb;padding:32px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="background:#1a3a2a;padding:20px 24px;">
      <p style="margin:0;color:#fff;font-size:18px;font-weight:700;">YOoN Immobilier — Nouveau lead</p>
      <p style="margin:4px 0 0;color:#a7c4b5;font-size:14px;">${sourceLabel}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>${rows}</tbody>
    </table>
    <div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">Envoyé depuis www.yoon.immo</p>
    </div>
  </div>
</body></html>`;
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

  const payload: Record<string, string> = {
    source,
    formType,
    page,
    receivedAt: new Date().toISOString(),
    ...data,
  };

  const results = await Promise.allSettled([
    // Webhook Make (best-effort)
    (async () => {
      const webhook = process.env.FORM_WEBHOOK_URL;
      if (!webhook) return;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.FORM_WEBHOOK_TOKEN) headers["Authorization"] = `Bearer ${process.env.FORM_WEBHOOK_TOKEN}`;
      const res = await fetch(webhook, { method: "POST", headers, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(`Webhook status ${res.status}`);
    })(),

    // Email Resend (best-effort)
    (async () => {
      const apiKey = process.env.RESEND_API_KEY;
      const to = process.env.NOTIFICATION_EMAIL;
      if (!apiKey || !to) return;
      const resend = new Resend(apiKey);
      const subject = `Nouveau lead ${source} — ${data.prenom || "inconnu"} (${data.pays || ""})`;
      await resend.emails.send({
        from: "YOoN Immobilier <onboarding@resend.dev>",
        to,
        subject,
        html: buildEmailHtml(payload),
      });
    })(),
  ]);

  // Succès si au moins une des deux livraisons a fonctionné
  const anySuccess = results.some((r) => r.status === "fulfilled");

  if (anySuccess) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, error: "Service d'envoi momentanément indisponible. Réessaie ou écris-nous sur WhatsApp." },
    { status: 502 }
  );
}
