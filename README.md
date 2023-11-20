### Instruction

Projet NodeJS dont le but est de permettre une évaluation de vos capacités à développer sur cet environnement.
Une fois le projet téléchargé et installé vous aurez une heure pour effectuer deux principales tâches :

- [x] Concevoir un module, requester dont l'utilisation est faite dans le fichier `src/repository/repository.ts`. Ce module devra permettre d'effectuer des requêtes à une api rest ici fournit par le module json-server.
- [x] Corriger les erreurs détectables par les scripts d'analyse statique du code.

À l'issue du temps impartie vous me ferez une pull request depuis une branche intitulé suivant le partern suivant: `test/{votre_nom}_{votre_prenom}`.

### Installation

1. Commence par cloner le dépôt sur votre environnement local

```Shell
$ git clone git@github.com:pwdllx/test-nodejs.git
```

2. Utilise le gestionnaire de paquet ([npm](https://www.npmjs.com/)) pour installer toutes les dépendances requises

```Shell
$ cd test-nodejs && npm ci
```

### Lancement

Pour lancer le projet sur ton environnement local utilise la commande

```Shell
$ npm run dev
```

**Note**: Il te faudra créer un fichier `.env` et le renseigner en te basant sur l'exemple `.env.example`

Pour te facilité l'inspection du code pendant son exécution, tu peux te connecter au port `9229` avec tes [outils](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients) habituels.
Tu peux maintenant te rendre à l'adresse http://localhost:3000/.

Voilà vous avez tous les outils et instructions nécessaires pour vous lancez 😎

## Mes observations

### Création du module Requester.

J'ai crée le module Requester qui contient une class qui sera utilisée dans le composant Repository. Requester devait contenir deux méthodes :

- Une post, qui va me permettre de créer une nouvelle brand dans ma base de données.
- Une get qui prendra un id optionnel en paramètre, dans le cas de la présence d'un id j'afficherai la marque correpondante, en cas d'absence d'id je ferai un get de toutes les marques.

Erreur PayloadTooLargeError: request entity too large lors du post : j'ai dû corriger une erreur de limitation de donnée de requête http, la limite initiale étant de "1b", je suis passé à "2mb", pour pouvoir poster ma data.

J'ai utilisé ThunderClient, disponible en extension sur Vscode, pour tester mes routes.

### Corriger les erreurs détectables par les scripts d'analyse statique du code.

**Erreurs d'analyse**: Suite au lancement du script npm run analysis, j'ai pu constater une erreur de dépendance circulaire, une anomalie de structure qui crée une boucle car brand.ts et index.ts dans le dossier model dépendent l'un de l'autre.
Ma solution: J'ai crée le fichier model.interface.ts qui est importé dans brand.ts, le fichier index exportant le tout.

**Erreurs de formatage**: une fois cette erreur résolue, il me restait à résoudre une erreur de formatage, je me suis aidé de Prettier, pour corriger le formatage et que l'application respecte les memes normes sur chaque fichier pour aider à sa lisibilité.

**Erreurs d'import**: il a fallu ensuite gérer des problemes d'ordre d'import, notamment dans le composant application, en remontant en premiere ligne l'import des routes. Et la suppresion d'une ligne vide dans le fichier route/rest.ts.
