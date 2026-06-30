import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig, whatsappDisplay } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de YOoN Immobilier (LEGAL CESSION AFRIQUE SAS) — éditeur, hébergeur et informations légales.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

const c = siteConfig.company;

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      intro="Les informations légales relatives à l'éditeur et à l'hébergeur de ce site."
    >
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>yoon.immo</strong> est édité par <strong>{c.legalName}</strong>.
          <br />
          <em>YOoN</em> (et <em>YOoN Immobilier</em>) est le nom commercial de la société.
          <br />
          Forme juridique : {c.legalForm}
          <br />
          Capital social : {c.capital}
          <br />
          Siège social : {c.registeredOffice}
          <br />
          RCCM : {c.rccm}
          <br />
          NINEA : {c.ninea}
          <br />
          Directeur de la publication : {c.publicationDirector}
          <br />
          Contact : {siteConfig.email} · WhatsApp {whatsappDisplay()}
          <br />
          Adresse de l&apos;agence : {siteConfig.address}
        </p>
      </section>

      <section>
        <h2>Hébergeur</h2>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>
          <br />
          440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          <br />
          Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus de ce site (textes, visuels, rendus 3D, logo YOoN,
          identité graphique) est protégé. Toute reproduction, totale ou partielle, sans
          autorisation préalable de {c.legalName} est interdite.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          Les informations diffusées sur ce site sont fournies à titre indicatif et d&apos;ordre
          général. Elles ne constituent pas un conseil juridique, fiscal ou notarial et ne
          remplacent pas l&apos;avis d&apos;un notaire ou d&apos;un avocat. Les opportunités
          présentées le sont sous réserve de vérification. {c.legalName} ne saurait être tenue
          responsable de décisions prises sur la seule base de ces informations.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données collectées via les formulaires est décrit dans notre{" "}
          <a href="/politique-de-confidentialite">politique de confidentialité</a>.
        </p>
      </section>
    </LegalPage>
  );
}
