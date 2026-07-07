# Mini Shop — Qualité logicielle & tests

**Auteur : Yannick Olinga**

Mini application e-commerce réalisée dans le cadre du module Qualité logicielle & tests (TP 3).

## Stack

- **Backend** : Node.js + Express
- **Frontend** : HTML/CSS/JS
- **Tests unitaires & intégration** : Jest + Supertest
- **Tests E2E** : Playwright
- **CI/CD** : GitHub Actions

## Installation

```bash
npm install
```

## Lancer l'application

```bash
npm run dev
```

Puis ouvrir http://localhost:3000

**Compte de test** : `yannick@example.com` / `Motdepasse1!`

## Lancer les tests

```bash
npm test                 # tous les tests (unitaires + intégration)
npm run test:unit        # tests unitaires
npm run test:integration # tests d'intégration
npm run e2e              # tests E2E (prévoir : npx playwright install chromium)
```

## Structure du projet

```
src/
  domain/           -> logique métier (TP 2)
  data/             -> utilisateurs et produits en mémoire
  routes/           -> routes API Express
  app.js            -> configuration Express
  server.js         -> point d'entrée
public/index.html   -> interface utilisateur
tests/
  unit/             -> tests unitaires
  integration/      -> tests d'intégration API
e2e/                -> tests end-to-end
.github/workflows/  -> pipeline CI
QA_REPORT.md        -> rapport qualité
```

## API

| Méthode | Route | Description |
|---|---|---|
| POST | /register | Inscription utilisateur |
| POST | /login | Connexion utilisateur |
| GET | /products | Liste des produits |
| POST | /cart/total | Calcul du total du panier |
| POST | /orders/preview | Aperçu de commande |

## Logique métier (TP 2)

- `cart.js` — calcul du total du panier
- `discount.js` — application d'une remise
- `shipping.js` — frais de livraison
- `user-validation.js` — validation email et mot de passe
- `password-strength.js` — force du mot de passe (TDD)
- `register-user.js` — inscription avec dépendances simulées
