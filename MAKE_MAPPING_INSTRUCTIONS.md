# Guide de mapping Make.com — YOoN Immobilier

## Contexte

Le webhook `/api/lead` envoie un JSON **aplati** (pas d'objet imbriqué) directement à Make.com.
Le curl de test ci-dessous retourne 200 — Make reçoit bien les données.
Le problème est uniquement dans la configuration du mapping dans le scénario.

---

## Structure exacte du JSON reçu par Make

```json
{
  "source":      "guide",
  "formType":    "guide-diaspora",
  "page":        "/guide-gratuit",
  "receivedAt":  "2026-06-30T14:23:00.000Z",
  "prenom":      "Marie",
  "email":       "marie@exemple.com",
  "whatsapp":    "+33600000000",
  "pays":        "France",
  "projet":      "Achat résidentiel",
  "budget":      "100k-200k",
  "delai":       "6 mois"
}
```

Valeurs possibles de `source` : `contact` · `guide` · `diagnostic`

Champs optionnels (présents selon le formulaire) : `budget`, `delai`, `whatsapp`

---

## Étape 1 — Configurer le module Webhook dans Make

1. Ouvre ton scénario Make.com
2. Clique sur le module **Webhooks > Custom webhook**
3. Clique sur **"Re-determine data structure"** (ou "Redéterminer la structure")
4. Envoie le curl de test suivant depuis ton terminal :

```bash
curl -X POST https://hook.eu1.make.com/ir7khbx4uu4ad5fjstds9uvp2gh58icu \
  -H "Content-Type: application/json" \
  -d '{
    "source": "guide",
    "formType": "guide-diaspora",
    "page": "/guide-gratuit",
    "receivedAt": "2026-06-30T14:00:00.000Z",
    "prenom": "Test",
    "email": "test@test.com",
    "whatsapp": "+33600000000",
    "pays": "France",
    "projet": "achat",
    "budget": "100k-200k",
    "delai": "6 mois"
  }'
```

5. Make détecte automatiquement tous les champs — clique **OK** pour valider la structure

---

## Étape 2 — Mapper les champs vers Google Sheets

Dans le module **Google Sheets > Add a Row**, mappe chaque colonne comme suit :

| Colonne Google Sheet | Champ Make à utiliser          |
|----------------------|-------------------------------|
| Date                 | `{{receivedAt}}`              |
| Source               | `{{source}}`                  |
| Type formulaire      | `{{formType}}`                |
| Page                 | `{{page}}`                    |
| Prénom               | `{{prenom}}`                  |
| Email                | `{{email}}`                   |
| WhatsApp             | `{{whatsapp}}`                |
| Pays                 | `{{pays}}`                    |
| Projet               | `{{projet}}`                  |
| Budget               | `{{budget}}`                  |
| Délai                | `{{delai}}`                   |

> **Important** : les variables Make s'écrivent avec des doubles accolades `{{nomDuChamp}}`.
> Le nom du champ doit correspondre exactement à la clé JSON (minuscules, sans accent).

---

## Étape 3 — Vérifier le mapping

1. Dans Make, clique sur **"Run once"** (bouton play en bas à gauche)
2. Envoie à nouveau le curl de test (Étape 1)
3. Clique sur la bulle qui apparaît sur chaque module pour voir les données qui transitent
4. Vérifie que la bulle du module Google Sheets affiche bien toutes les valeurs

### Diagnostic rapide

| Symptôme | Cause probable | Solution |
|----------|---------------|----------|
| Les champs apparaissent vides | Structure non re-déterminée | Refaire l'étape 1 |
| Erreur "undefined" sur un champ | Nom du champ mal orthographié | Vérifier la casse (ex. `prenom` pas `Prenom`) |
| Une ligne est ajoutée mais vide | Mapping Google Sheets non sauvegardé | Cliquer Save dans le module |
| Make reçoit les données mais ne les passe pas | Filtre ou condition bloquante dans le scénario | Vérifier s'il y a un module Filter entre Webhook et Sheets |

---

## Étape 4 — Activer le scénario

1. Assure-toi que le scénario est **ON** (interrupteur en bas à gauche, vert)
2. Règle la fréquence sur **"Immediately"** (déclenchement instantané) si disponible
3. Sauvegarde le scénario

---

## Test final end-to-end

Depuis le site en production, remplis le formulaire `/guide-gratuit` avec une vraie adresse email.
Tu dois voir :
- La page `/merci?source=guide` s'afficher
- Une nouvelle ligne apparaître dans Google Sheets dans les secondes qui suivent
