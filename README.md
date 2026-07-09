# Restobar — Gestion de restaurant

Application web complète pour la gestion d'un restaurant ou d'un bar : commandes, tables, produits, clients et livraisons.

## Fonctionnalités

- **Tableau de bord** — Vue d'ensemble de l'activité
- **Commandes** — Création, suivi et modification des commandes (sur place et livraison)
- **Tables** — Gestion des tables du restaurant
- **Produits & catégories** — Catalogue avec images et prix
- **Clients** — Fiche client et historique
- **Utilisateurs** — Authentification JWT avec rôles admin / utilisateur
- **Livraisons** — Suivi des commandes en livraison

## Stack technique

| Couche      | Technologies                                      |
|-------------|---------------------------------------------------|
| Frontend    | React 16, Redux, React Router, Axios              |
| Backend     | Node.js, Express, Sequelize, JWT, bcrypt          |
| Base de données | MySQL 5.7                                     |
| Infra       | Docker, Docker Compose, Nginx                     |

## Prérequis

- [Docker](https://www.docker.com/) et Docker Compose **(recommandé)**
- Ou Node.js 14.x, npm et MySQL 5.7 pour une installation manuelle

## Installation avec Docker

```bash
git clone https://github.com/olufemi220/projet_restaurant.git
cd projet_restaurant
docker-compose up --build
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

| Service  | Port local |
|----------|------------|
| Frontend (via Nginx) | 3000 |
| Backend API          | 5000 |
| MySQL                | 33061 |

## Installation manuelle

### 1. Base de données

Créez une base MySQL nommée `restobar`, puis importez le schéma :

```bash
mysql -u root -p < database/init.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Éditez .env avec vos paramètres MySQL
npm install
npx sequelize-cli db:seed:all
npm run dev
```

Le serveur API démarre sur le port **5000**.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

L'interface démarre sur [http://localhost:3000](http://localhost:3000).

## Comptes de démonstration

| Rôle  | Email              | Mot de passe |
|-------|--------------------|--------------|
| Admin | admin@example.com  | 123456       |
| User  | user@example.com   | 123456       |

## API REST

Toutes les routes sont préfixées par `/api` :

| Ressource    | Endpoint          |
|--------------|-------------------|
| Utilisateurs | `/api/users`      |
| Catégories   | `/api/categories` |
| Produits     | `/api/products`   |
| Clients      | `/api/clients`    |
| Tables       | `/api/tables`     |
| Commandes    | `/api/orders`     |
| Upload       | `/api/upload`     |

Les routes protégées nécessitent un token JWT dans l'en-tête `Authorization: Bearer <token>`.

## Structure du projet

```
projet_restaurant/
├── backend/          # API Express + Sequelize
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── database/     # Migrations et seeders
│   └── server.js
├── frontend/         # Application React
│   └── src/
│       ├── actions/
│       ├── components/
│       ├── reducers/
│       └── screens/
├── database/         # Script SQL d'initialisation
├── nginx/            # Configuration reverse proxy
└── docker-compose.yml
```

## Tests

```bash
cd frontend
npm test
```

## Licence

Ce projet est basé sur [restobar](https://github.com/matias-rivera/restobar) de Juan Matías Rivera, sous licence MIT.

## Auteur

[Développé par olufemi220](https://github.com/olufemi220)
