# Plateforme de Crowdfunding

## Description

Ce projet est une plateforme de **crowdfunding** conçue pour permettre aux utilisateurs de créer des projets, de contribuer à leur financement, et de suivre leurs contributions. Il intègre des fonctionnalités avancées de sécurité, de gestion des utilisateurs, et de transactions.

---

## Fonctionnalités

### Sécurité
- **CAPTCHA** pour les formulaires critiques (inscription, connexion).
- **Authentification à double facteur (2FA)**.
- **Politique de sécurité du contenu (CSP)**.
- **Hashage des mots de passe** avec un algorithme sécurisé.
- **Gestion des sessions JWT**.
- **Protection contre les attaques courantes** :
  - Injection SQL
  - XSS (Cross-Site Scripting)
  - CSRF (Cross-Site Request Forgery)
  - Bruteforce
  - DoS (Denial of Service)
- **Limitation du nombre de tentatives de connexion**.

### Gestion des utilisateurs
- Inscription, connexion, et déconnexion.
- Profils utilisateurs avec possibilité de personnalisation.
- Historique des contributions.

### Gestion des projets
- Création et soumission de projets.
- Gestion des objectifs financiers.
- Ajout de récompenses pour les donateurs.
- Mise à jour et suivi des projets.

### Transactions
- **Intégration API Stripe et PayPal** pour les paiements.
- Suivi des transactions et des contributions.
- Notifications en temps réel sur l'état des paiements.

### Expérience utilisateur
- Page d'accueil designée pour mettre en avant les projets populaires.
- Fonctionnalité de recherche et de découverte.
- Commentaires et partage des projets sur les réseaux sociaux.

### Tests et documentation
- Tests unitaires, d'intégration, de charge et de pénétration.
- Documentation complète (guide d’installation, API, architecture, etc.).

---

## Prérequis

### Outils
- Node.js (v16 ou supérieur).
- Un serveur web comme Apache ou NGINX.
- MySQL ou PostgreSQL pour la base de données.
- Stripe et/ou PayPal pour le traitement des paiements.

### Bibliothèques / Frameworks
- Backend : **Express.js** ou **Django**.
- Frontend : **React.js**, **Vue.js**, ou **Angular**.
- Authentification : **JWT**, **bcrypt**.
- Tests : **Mocha**, **Chai**, ou **Jest**.

---

## Installation

### Étape 1 : Clonez le projet
```bash
git clone https://github.com/username/crowdfunding-platform.git
cd crowdfunding-platform
```
### Étape 2 : Installez les dépendances
npm install
### Étape 3 : Configurez les fichiers d’environnement
Créez un fichier .env et configurez les variables suivantes :
- DB_HOST=localhost
- DB_PORT=3306
- DB_USER=root
- DB_PASSWORD=your_password
- DB_NAME=crowdfunding
- JWT_SECRET=your_jwt_secret
- STRIPE_API_KEY=your_stripe_api_key
- PAYPAL_CLIENT_ID=your_paypal_client_id

### Étape 4 : Initialisez la base de données
npm run migrate

### Étape 5 : Lancez le serveur
npm start
- Le serveur sera disponible à http://localhost:3000.

### Fonctionnalités principales à tester
- Créer un compte utilisateur.
- Se connecter et gérer une session.
- Soumettre un projet avec un objectif financier.
- Contribuer à un projet et suivre les contributions.
- Effectuer un paiement avec Stripe ou PayPal.
- Ajouter des commentaires et partager un projet.

### Tests
Tests unitaires
- Lancez les tests unitaires avec la commande :
  - npm test
- Tests de charge et de performance :
  - Utilisez des outils comme JMeter ou k6.
- Tests de sécurité :
  - Configurez OWASP ZAP pour analyser les vulnérabilités de l’application.
- Contribution :
 **Si vous souhaitez contribuer :**
  - Forkez le dépôt.
  - Créez une branche avec un nom descriptif.
  - Soumettez une pull request avec une description claire.
 
  ### Auteurs
- J
- M
- N
- M
- N

### License
Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le distribuer.
