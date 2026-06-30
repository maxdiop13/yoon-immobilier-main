import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment YOoN Immobilier collecte, utilise et protège tes données personnelles (RGPD) lorsque tu utilises nos formulaires de contact.",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false, follow: true },
};

export default function PolitiquePage() {
  return (
    <LegalPage
      eyebrow="Tes données, ta tranquillité"
      title="Politique de confidentialité"
      intro="On collecte le strict nécessaire pour te répondre, rien de plus. Voici comment tes données sont traitées."
      updated={<Todo>date</Todo>}
    >
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données est <strong>{siteConfig.company.legalName}</strong>{" "}
          (exploitant le nom commercial YOoN Immobilier), dont les coordonnées figurent dans les{" "}
          <a href="/mentions-legales">mentions légales</a>.
        </p>
      </section>

      <section>
        <h2>Données collectées</h2>
        <p>
          Via nos formulaires, nous collectons uniquement les informations que tu nous transmets :
          prénom, email, numéro de téléphone/WhatsApp, pays de résidence, et les éléments relatifs
          à ton projet (type, zone, budget indicatif, message). Un champ anti-spam invisible
          (honeypot) peut être utilisé ; il n&apos;enregistre aucune donnée personnelle.
        </p>
      </section>

      <section>
        <h2>Finalités</h2>
        <p>
          Ces données servent exclusivement à : répondre à ta demande, te recontacter au sujet de
          ton projet, et — si tu y as consenti — t&apos;envoyer la checklist et nos conseils par
          email. Nous ne vendons ni ne louons tes données.
        </p>
      </section>

      <section>
        <h2>Base légale</h2>
        <p>
          Le traitement repose sur ton consentement (case à cocher) et/ou sur les mesures
          précontractuelles prises à ta demande.
        </p>
      </section>

      <section>
        <h2>Destinataires & sous-traitants</h2>
        <p>
          Tes données sont accessibles à l&apos;équipe YOoN et, le cas échéant, à nos
          sous-traitants techniques (hébergement, service d&apos;envoi de formulaires/email) :{" "}
          Vercel (hébergement), Make.com (automatisation formulaires), Google Sheets (stockage leads). Ces prestataires
          n&apos;utilisent pas tes données à d&apos;autres fins.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>
          Les données sont conservées le temps nécessaire au traitement de ta demande, puis
          archivées ou supprimées : [DUREE_A_CONFIRMER].
        </p>
      </section>

      <section>
        <h2>Tes droits (RGPD)</h2>
        <p>
          Conformément au RGPD (et où il s&apos;applique), tu disposes d&apos;un droit
          d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de portabilité de
          tes données. Pour les exercer, écris-nous à [EMAIL_A_CONFIRMER]. Tu peux aussi
          introduire une réclamation auprès de l&apos;autorité compétente (ex. CNIL en France).
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Ce site n&apos;utilise pas de cookie publicitaire ni de traceur tiers à des fins de
          ciblage. Si des outils de mesure d&apos;audience sont ajoutés ultérieurement, cette
          politique sera mise à jour et un bandeau de consentement sera affiché :{" "}
          <Todo>préciser les outils de mesure éventuels</Todo>.
        </p>
      </section>
    </LegalPage>
  );
}
