# YOoN Immobilier — Informations à compléter (avant production)

Site en **version de travail**. Aucune donnée n'a été inventée : les zones manquantes
affichent des placeholders élégants (« Coordonnées bientôt disponibles », « En cours de
validation », etc.). Cette liste recense ce qu'il reste à fournir.

## 1. Coordonnées
- [x] WhatsApp : **+221 78 658 87 41** (intégré partout : `wa.me/221786588741`)
- [x] Adresse : **Rue YF-543, Ouest Foire, Dakar**
- [x] Langues : **Français · Anglais · Wolof**
- [~] Horaires : provisoirement « Sur rendez-vous » — préciser les horaires réels
- [x] E-mail : **contact@yoon.immo** (footer, page Contact, JSON-LD)
- [ ] `NEXT_PUBLIC_BOOKING_URL` — lien de réservation d'appel (Calendly / Cal.com…)

## 2. Réception des leads
- [ ] `FORM_WEBHOOK_URL` (+ `FORM_WEBHOOK_TOKEN`) — endpoint de réception des formulaires
      (Make / Zapier / n8n / CRM / e-mail). Sans lui : repli `mailto` automatique.

## 3. Mentions légales & RGPD (pages `/mentions-legales`, `/politique-de-confidentialite`)
- [x] Éditeur : **LEGAL CESSION AFRIQUE SAS** (nom commercial YOoN), SAS, capital 1 000 000 FCFA
- [x] Siège social : SICAP Liberté 6, Villa 6347, Dakar · RCCM **SN.DKR.2020.B.31726** · NINEA **008263197**
- [x] Directeur de la publication : Gora Ngom · Hébergeur : Vercel Inc.
- [ ] À confirmer : montant exact du capital (doc = 1 000 000 FCFA), orthographe complète du directeur de publication
- [ ] Politique de confidentialité : sous-traitants / outils (e-mail, analytics), durée de conservation, e-mail DPO

## 4. Équipe (`/equipe`)
- [x] Mohamed intégré : **Ngom Mohamed**, Responsable terrain & sourcing immobilier — Dakar (+ bio validée, Person JSON-LD)
- [ ] Photos réelles de Mohamed, Sarah, Gora (emplacements prêts)
- [ ] Bios validées pour Sarah et Gora (textes actuels rédigés par défaut)

## 4 bis. Opportunités (`/investir-a-dakar`)
- [x] Section sobre « Opportunités en cours de qualification » (Ouest Foire, Guédiawaye, Face Mbao — statut/prix à préciser)
- [ ] Prix, surfaces, statuts fonciers, photos, documents, mandats à valider avant toute annonce détaillée

## 5. Partenaires (`/partenaires`)
- [ ] **URL exacte de Charles & Rémy Immobilier** (pour analyse + lien)
- [ ] Logo Charles & Rémy + **autorisation écrite** d'affichage
- [ ] Statut du partenariat (passer de « en cours de validation » à validé)

## 6. Preuve & crédibilité
- [ ] Témoignages clients validés (avec accord écrit) — aucun avis inventé
- [x] Rubrique **Nos projets** (`/projets`) + projet pilote **Ouest Foire** (avant chantier / après rendus, points vérifiés)
- [ ] ⚠️ À CONFIRMER : les photos « avant » utilisées pour Ouest Foire viennent d'un lot où plusieurs documents concernent **Grand-Mbao / Face Mbao** (TF N°11.058/DP, Mme Ndèye Ngom). Vérifier qu'elles sont bien celles de l'immeuble Ouest Foire — sinon créer un projet « Grand-Mbao » distinct et réaffecter.
- [ ] Ajouter d'autres projets réels (Guédiawaye, Face Mbao…) avec leurs `pointsVerifies`
- [ ] Photo professionnelle (façade / terrain) si disponible

## 7. Offre
- [ ] Tarifs ou modalités de facturation (analyse, vérification, suivi de chantier)

## 8. Tracking
- [ ] Choisir Plausible (recommandé) ou GA4 + bandeau consentement RGPD.
      Les événements sont déjà poussés dans `window.dataLayer` :
      `cta_click` (avec `data-cta`) et `form_submitted` (avec `formType`).

## 9. Contenu (lot suivant)
- [ ] Rédiger les guides restants (priorité : arnaques, titre foncier, terrain Dakar…)
- [ ] Créer les sous-pages services (`/services/...`) — actuellement préparées en lot futur
- [ ] Visuel/mockup réel du guide PDF + fichier téléchargeable

---
_Mise à jour : lot « fondations SEO / conversion / crédibilité »._
