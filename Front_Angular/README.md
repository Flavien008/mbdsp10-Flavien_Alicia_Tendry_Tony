
# Takalo

Takalo est une application web développée avec Angular. Ce projet permet aux utilisateurs d'échanger des objets, de gérer des publications et de consulter des offres. Il comprend des fonctionnalités de création, de mise à jour et de suppression de publications, ainsi que la gestion de l'authentification et de l'autorisation des utilisateurs.

## Prérequis

Avant de commencer, assurez-vous d'avoir respecté les prérequis suivants :

- **Node.js** : Assurez-vous d'avoir Node.js installé. Vous pouvez le télécharger depuis [Node.js](https://nodejs.org/).
- **Angular CLI** : Installez Angular CLI globalement si ce n'est pas déjà fait.

  ```bash
  npm install -g @angular/cli
  ```

## Installation

Suivez ces étapes pour configurer le projet localement :

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/votre-nom-utilisateur/takalo.git
   cd takalo
   ```

2. **Installer les dépendances** :

   Après avoir navigué dans le répertoire du projet, installez les dépendances requises en exécutant :

   ```bash
   npm install
   ```

## Serveur de développement

Pour démarrer le serveur de développement, exécutez :

```bash
ng serve
```

Naviguez ensuite vers `http://localhost:4200/` dans votre navigateur. L'application se rechargera automatiquement si vous modifiez des fichiers source.

## Compilation

Pour compiler le projet en production, exécutez :

```bash
ng build
```

Les artefacts de compilation seront stockés dans le répertoire `dist/`. Utilisez l'option `--prod` pour une compilation de production.

## Génération de code

Pour générer un nouveau composant, directive, pipe, service, classe, garde, interface, enum ou module, utilisez :

```bash
ng generate component nom-du-composant
```

Remplacez `nom-du-composant` par le nom souhaité pour votre composant ou autre fichier généré.

## Exécution des tests unitaires

Pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io), exécutez :

```bash
ng test
```

Cela lancera le testeur Karma et exécutera tous les tests unitaires du projet.

## Exécution des tests de bout en bout

Pour exécuter des tests de bout en bout, vous devez d'abord ajouter un package qui implémente des capacités de test de bout en bout, comme Protractor ou Cypress.

Après avoir installé le package, vous pouvez exécuter :

```bash
ng e2e
```

Cela exécutera les tests de bout en bout via la plateforme que vous avez choisie.

## Informations de connexion

- **Username**: Tendry Arivony
- **Mot de passe**: tendry

## Configuration de l'environnement

Le projet peut nécessiter la configuration de certaines variables d'environnement. Ces variables sont généralement stockées dans les fichiers `src/environments/environment.ts` et `src/environments/environment.prod.ts`.

### Exemple de `environment.ts` :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8010/api',
};
```

### Exemple de `environment.prod.ts` :

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://modular-analog-431619-t6.oa.r.appspot.com',
};
```

Assurez-vous que ces fichiers sont correctement configurés en fonction de vos environnements de développement et de production.

## Aide supplémentaire

Pour plus d'aide avec Angular CLI, utilisez :

```bash
ng help
```

Vous pouvez également consulter la [page de présentation et de référence d'Angular CLI](https://angular.io/cli) pour des informations plus détaillées.
