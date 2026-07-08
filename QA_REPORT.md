# Rapport QA — Gestionnaire de tâches

**Auteur : Yannick Olinga**

## 1. Présentation du projet

Mini application de gestion de tâches : création, modification, priorités, tâches terminées et détection des tâches en retard.

- **Stack** : Node.js + Express, frontend HTML/JS, Jest + Supertest, Playwright, GitHub Actions.
- **Objectif** : appliquer une démarche qualité (tests unitaires, intégration, E2E, CI/CD) sur un périmètre clair.

## 2. Règles métier principales

1. Une tâche sans titre (ou titre uniquement composé d'espaces) est invalide.
2. La priorité doit appartenir à `basse`, `normale`, `haute`.
3. Une tâche dont la date d'échéance est passée est considérée « en retard ».
4. Une tâche terminée n'est **jamais** considérée comme en retard.

## 3. Démarche TDD

TDD appliqué sur la règle « une tâche terminée n'est jamais en retard » via la fonction `isLate(task, now)` :

- test sur échéance passée → en retard
- test sur tâche terminée + échéance passée → **pas** en retard
- refactor léger pour gérer aussi le cas « pas d'échéance »

## 4. Tests unitaires réalisés

Fichier : `tests/unit/taskService.test.js`

- **Cas nominaux** : création valide, update, filtres.
- **Cas limites** : titre espaces, pas d'échéance.
- **Cas d'erreur** : titre manquant, priorité invalide, date invalide, tâche introuvable.

Commande : `npm run test:unit`

## 5. Tests d'intégration réalisés

Fichier : `tests/integration/tasks.api.test.js` (Supertest)

Routes couvertes :

- `POST /api/tasks` : 201, erreurs 400
- `GET /api/tasks` : liste + filtres, erreur 400 sur filtre inconnu
- `PUT /api/tasks/:id` : 200 et 404
- `PATCH /api/tasks/:id/done` : 200 et 404
- `GET /api/tasks/late/count` : compteur cohérent

Chaque test vérifie le **statut HTTP** et le **format JSON**.

Commande : `npm run test:integration`

## 6. Test E2E réalisé

Fichier : `e2e/tasks.spec.js` (Playwright)

Parcours :

1. créer une tâche via le formulaire
2. vérifier qu'elle apparaît dans la liste
3. la marquer comme terminée et vérifier le changement visuel

Second test : création sans titre → affichage d'une erreur.

Sélecteurs : `data-testid` uniquement.

Commande : `npm run e2e`

## 7. Pipeline CI/CD

Fichier : `.github/workflows/ci.yml`

- Déclenchement : `push` et `pull_request`
- Étapes : `npm ci` → `test:unit` → `test:integration` → `e2e`
- En cas d'échec : job rouge, merge bloqué si la CI est requise

## 8. Limites et améliorations possibles

- Stockage en mémoire (pas de persistance).
- Couverture non publiée (possible ajout de `jest --coverage`).
- E2E sur Chromium uniquement (possible multi-navigateurs).

