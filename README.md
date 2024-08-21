# TAKALO - Plateforme de Troc en Ligne

Bienvenue sur le dépôt Git de **TAKALO**, une plateforme de troc d'objets entre particuliers. Ce projet a été réalisé dans le cadre du Projet Transversal MBDS - Promotion 10.

## Description du projet

**TAKALO** est une plateforme en ligne permettant aux utilisateurs de proposer des échanges d'objets sans transaction financière. Les utilisateurs peuvent ajouter des objets qu'ils souhaitent échanger et naviguer parmi les objets proposés par d'autres utilisateurs pour trouver des échanges mutuellement avantageux.

### Cibles

1. **Particuliers adultes (18 ans et plus) :**
   - Utilisateurs qui souhaitent échanger des objets sans transaction financière.
   - Intéressés par l'économie circulaire et le réemploi des biens.

2. **Administrateurs de la plateforme :**
   - Responsables de la gestion des utilisateurs et de la modération des contenus.
   - Assurent la sécurité et le bon fonctionnement de la plateforme.

## Fonctionnalités principales

- Inscription et gestion de profil utilisateur.
- Ajout, modification, et suppression d'objets à échanger.
- Proposition et validation d'échanges entre utilisateurs.
- Notifications pour les nouvelles propositions d'échange et les mises à jour.

Voici une présentation pour chaque dossier visible sur votre capture d'écran, adaptée au README :

---

## Structure du dépôt TAKALO

Ce dépôt contient les différents modules et composants du projet TAKALO, chacun organisé dans des dossiers spécifiques en fonction de leur rôle dans l'architecture globale du projet.

### 1. **BDD**
   - **Description :** Ce dossier contient les schémas et scripts relatifs à la base de données utilisée par le projet TAKALO. Les schémas sont principalement destinés à une base Postgres. Vous y trouverez les structures de tables, les relations, et les migrations nécessaires à la configuration initiale de la base de données.

### 2. **BackofficeSpringboot**
   - **Description :** Ce dossier regroupe les fichiers relatifs à l'implémentation du back office de TAKALO, développé en Spring Boot. Ce module gère les aspects administratifs de la plateforme, incluant la gestion des utilisateurs, la modération des échanges, et le suivi des transactions. Il inclut également les configurations de déploiement et de debug.

### 3. **Front_Angular**
   - **Description :** Ce dossier contient le code source de l'interface utilisateur principale (front office) du site TAKALO, développé en Angular. Il inclut toutes les fonctionnalités accessibles par les utilisateurs finaux, telles que la création de profils, l'ajout d'objets, et la gestion des propositions d'échanges.

### 4. **MobileIonicAdmin**
   - **Description :** Ce dossier contient l'application mobile administrative développée avec le framework Ionic. Cette application est utilisée par les administrateurs pour gérer les postes et effectuer des actions administratives directement depuis un appareil mobile. Les fonctionnalités incluent la suppression de postes, la gestion des utilisateurs, et la modération des échanges.

### 5. **NodeServerApi**
   - **Description :** Ce dossier contient l'API Node.js qui sert de pont entre le front office, le client lourd, et les bases de données. Il gère la logique métier et assure la communication entre les différentes parties de l'application. Il inclut également les configurations pour les environnements de développement et de production.

### 6. **TPTMBDS**
   - **Description :** Ce dossier est dédié au développement de l'application mobile pour les utilisateurs finaux. Il contient l'interface mobile qui permet aux utilisateurs de gérer leurs échanges d'objets, consulter les propositions, et interagir avec la plateforme TAKALO depuis leurs appareils mobiles. Le développement est réalisé en utilisant des technologies mobiles natives.


## Technologies utilisées

- **Serveur d'application :** Java
- **Base de données :** Postgres pour le serveur principal, MongoDB pour la gestion des données non relationnelles.
- **Frontend :** Angular
- **Application mobile :** Développement natif pour Android studio, Ionic pour mobile hybride.
- **Client lourd :** WinForms avec C#, utilisant un service web pour fonctionner.

## Liens importants

- **Site Web :** [Lien vers le site TAKALO](#)  
  *(Remplacez "#" par l'URL réelle du site web une fois disponible)*

- **Application mobile (APK) :** [Lien de téléchargement de l'APK Android](#)  
  *(Remplacez "#" par le lien de téléchargement de l'APK)*

- **Exécutable client lourd :** [Lien de téléchargement de l'exécutable pour le client lourd](#)  
  *(Remplacez "#" par le lien de téléchargement du client lourd, assurant que le service web est configuré)*

## Installation et déploiement

### Site Web

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Flavien008/mbdsp10-Flavien_Alicia_Tendry_Tony.git
   ```
2. Accédez au répertoire du projet et installez les dépendances :
   ```bash
   cd Front_Angular
   npm install
   ```
3. Configurez les paramètres de la base de données et des services dans le fichier de configuration.
4. Lancez le serveur :
   ```bash
   npm start
   ```
5. Accédez au site via votre navigateur à l'URL spécifiée.

### Application mobile

1. Téléchargez et installez l'APK depuis le lien fourni ci-dessus.
2. Ouvrez l'application et connectez-vous à votre compte TAKALO.

### Client lourd

1. Téléchargez l'exécutable depuis le lien fourni ci-dessus.
2. Assurez-vous que le service web est en cours d'exécution et accessible.
3. Lancez l'application et connectez-vous avec vos identifiants TAKALO.

## Contact

Pour toute question ou suggestion, merci de contacter l'équipe de développement à [votre-email@example.com](mailto:votre-email@example.com).


