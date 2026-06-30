# Webhook Make.com → Google Sheets — YOoN Immobilier

Guide de configuration complet pour relier les formulaires du site à une Google Sheet via Make.com.

---

## ÉTAPE 1 — Créer le scénario Make.com

### 1.1 Créer un compte Make.com

1. Aller sur [make.com](https://make.com) → **Sign up free**
2. Choisir le plan **Free** (1 000 opérations/mois — suffisant pour démarrer)
3. Confirmer l'email et se connecter

### 1.2 Créer le scénario

1. Dans le dashboard → cliquer **Create a new scenario**
2. Cliquer le `+` au centre pour ajouter le premier module

### 1.3 Module 1 — Webhook (déclencheur)

1. Chercher **"Webhooks"** → sélectionner **"Custom webhook"**
2. Cliquer **Add** pour créer un nouveau webhook
3. Donner un nom : `YOoN - Formulaires site`
4. Cliquer **Save**
5. **Copier l'URL générée** (format : `https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   > ⚠️ Garder cette URL — elle sera ajoutée à Vercel à l'Étape 2.
6. Cliquer **OK**

> Le module affiche "Waiting for data" — c'est normal, il attend le premier appel.

### 1.4 Module 2 — Google Sheets (action)

1. Cliquer le `+` à droite du module Webhooks
2. Chercher **"Google Sheets"** → sélectionner **"Add a Row"**
3. Cliquer **Add** pour connecter un compte Google → autoriser les permissions demandées
4. Choisir le **Spreadsheet ID** en cliquant sur l'icône dossier → naviguer dans Google Drive pour sélectionner la feuille (voir 1.5 ci-dessous)
5. Choisir la **Sheet Name** : `Feuille 1` (ou le nom de l'onglet)

### 1.5 Créer la Google Sheet

1. Aller sur [sheets.google.com](https://sheets.google.com) → **+ Nouveau**
2. Renommer la feuille : `YOoN — Leads`
3. En **ligne 1**, saisir exactement ces en-têtes (une colonne par cellule, de A1 à L1) :

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| receivedAt | source | formType | page | prenom | email | whatsapp | pays | projet | budget | delai | avancement |

### 1.6 Mapper les champs Make → Google Sheet

De retour dans Make, une fois la Sheet sélectionnée, mapper chaque colonne :

| Colonne Google Sheet | Valeur Make (glisser depuis le panel Webhooks) |
|----------------------|------------------------------------------------|
| `receivedAt`         | `receivedAt`                                   |
| `source`             | `source`                                       |
| `formType`           | `formType`                                     |
| `page`               | `page`                                         |
| `prenom`             | `prenom`                                       |
| `email`              | `email`                                        |
| `whatsapp`           | `whatsapp`                                     |
| `pays`               | `pays`                                         |
| `projet`             | `projet`                                       |
| `budget`             | `budget`                                       |
| `delai`              | `delai`                                        |
| `avancement`         | `avancement`                                   |

> Si un champ n'apparaît pas encore dans le panel de gauche, c'est parce que Make n'a pas encore reçu de données réelles. Envoyer un test depuis le site (Étape 3) puis revenir mapper les champs manquants.

### 1.7 Activer le scénario

1. Cliquer **OK** → **Save** (icône disquette)
2. En bas à gauche, basculer l'interrupteur **ON**
3. Le scénario est maintenant actif et écoute les soumissions

---

## ÉTAPE 2 — Configurer Vercel

1. Aller sur : [vercel.com/maxdiop14/yoon-immobilier-main/settings/environment-variables](https://vercel.com/maxdiop14/yoon-immobilier-main/settings/environment-variables)
2. Cliquer **Add New**
3. Remplir :
   - **Key** : `FORM_WEBHOOK_URL`
   - **Value** : `https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` ← l'URL copiée à l'Étape 1.3
   - **Environment** : cocher `Production`, `Preview`, `Development`
4. Cliquer **Save**
5. Aller dans l'onglet **Deployments** → cliquer les `...` du dernier déploiement → **Redeploy**

> Vercel redéploie automatiquement avec la nouvelle variable d'environnement.

---

## ÉTAPE 3 — Tester

### 3.1 Test depuis le site

1. Aller sur [yoon-immobilier-main.vercel.app/guide-gratuit](https://yoon-immobilier-main.vercel.app/guide-gratuit)
2. Remplir le formulaire :
   - Prénom : `Test`
   - Email : `test@yoon.test`
   - WhatsApp : `+33 6 00 00 00 00` (optionnel)
   - Pays : `France`
   - Projet : `Je me renseigne`
   - Cocher la case RGPD
3. Cliquer **Recevoir le guide**
4. La page doit rediriger vers `/merci?source=guide`

### 3.2 Vérifier Google Sheets

1. Ouvrir la Google Sheet `YOoN — Leads`
2. Une nouvelle ligne doit apparaître avec toutes les colonnes remplies
3. La colonne `receivedAt` contiendra un timestamp ISO (ex: `2026-06-30T16:00:00.000Z`)

### 3.3 Si aucune ligne n'apparaît

- Vérifier que le scénario Make est bien **ON**
- Dans Make → **History** → regarder si une exécution a eu lieu et quel est son statut
- Vérifier que `FORM_WEBHOOK_URL` est bien sauvegardée dans Vercel et que le redéploiement a eu lieu
- Tester le webhook directement depuis Make (bouton **Run once** puis soumettre le formulaire)

---

## Payload transmis par le site

Le site envoie un JSON aplati à chaque soumission :

```json
{
  "receivedAt": "2026-06-30T16:00:00.000Z",
  "source": "guide",
  "formType": "guide-diaspora",
  "page": "/guide-gratuit",
  "prenom": "Prénom saisi",
  "email": "email@exemple.com",
  "whatsapp": "+33 6 12 34 56 78",
  "pays": "France",
  "projet": "achat"
}
```

Les champs `budget`, `delai`, `avancement` sont émis par d'autres formulaires (diagnostic). Ils seront vides pour le formulaire Guide mais les colonnes doivent exister dans la Sheet pour les recevoir le moment venu.

---

## Sécurité optionnelle — Token d'autorisation

Pour restreindre l'accès au webhook Make, vous pouvez ajouter un header d'autorisation :

1. Dans Make → module Webhooks → **Edit** → activer **Headers** → ajouter `Authorization: Bearer MON_SECRET`
2. Dans Vercel, ajouter une deuxième variable :
   - **Key** : `FORM_WEBHOOK_TOKEN`
   - **Value** : `MON_SECRET` (même valeur que dans Make)

Le site ajoutera automatiquement ce header à chaque appel.
