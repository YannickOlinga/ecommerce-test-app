# Rapport QA — TP Partie 3

**Auteur : Yannick Olinga**

## Présentation du projet

Mini application e-commerce permettant de se connecter, consulter des produits et calculer un aperçu de commande (sous-total, remise, livraison, total).

- **Stack** : Node.js, Express, Jest, Supertest, Playwright, GitHub Actions
- **Frontend** : page unique avec connexion, catalogue produits et formulaire de commande

## Rappel des tests unitaires du TP 2

| Fichier | Règles testées |
|---|---|
| `cart.js` | total panier, quantités, prix décimaux, panier vide |
| `discount.js` | remise 0 %, 10 %, 100 %, remise invalide |
| `shipping.js` | frais selon le poids, poids invalide |
| `user-validation.js` | email valide/invalide, mot de passe valide/invalide |
| `password-strength.js` | weak, medium, strong (TDD) |
| `register-user.js` | création utilisateur, email bienvenue (mocks) |

**Commande** : `npm run test:unit`

## Tests d'intégration réalisés

| Route | Cas nominaux | Cas d'erreur |
|---|---|---|
| `POST /register` | création compte + réponse sans mot de passe | email invalide, mot de passe invalide |
| `POST /login` | connexion réussie, token | mauvais MDP, user inexistant, email/MDP manquant, pas de MDP dans réponse |
| `GET /products` | liste, propriétés, types | — |
| `POST /cart/total` | panier valide, vide, quantités, décimaux | body invalide, items manquant/incorrect |
| `POST /orders/preview` | sous-total, remise, livraison, total | remise invalide, poids invalide, panier invalide, livraison manquante |

**Commande** : `npm run test:integration`

## Tests E2E réalisés

Fichier : `e2e/shop.spec.js` (Playwright)

| Parcours | Description |
|---|---|
| Connexion + produits | login → confirmation utilisateur → liste avec noms, prix, stocks |
| Aperçu commande | login → formulaire → calcul → affichage du total |

**Sélecteurs** : `data-testid` uniquement.

## Choix de l'outil E2E

**Playwright** — démarrage automatique du serveur (`webServer`), API moderne, tests lisibles.

## Utilisation de la vraie API ou d'une interception

Vraie API : les tests E2E appellent le serveur Express réel. Aucune interception réseau.

| Avantage | Limite |
| parcours réaliste | plus lent qu'un mock |
| détecte les vrais problèmes d'intégration | sensible à l'environnement (port, navigateur) |

Pipeline CI/CD

Fichier : `.github/workflows/ci.yml`

- Déclenchement : push et pull request
- Étapes : `npm ci` → tests unitaires → tests intégration → E2E (Chromium)
- En cas d'échec : pipeline rouge, job E2E bloqué si les tests rapides échouent
Limites de la stratégie actuelle

- Données en mémoire (pas de vraie base)
- Pas de tests de performance
- E2E sur Chromium uniquement
- Pas de couverture publiée en CI

Améliorations possibles

- Base de données de test avec reset automatique
- `jest --coverage` dans la CI
- Tests de performance légers (k6)
- Tests d'accessibilité
