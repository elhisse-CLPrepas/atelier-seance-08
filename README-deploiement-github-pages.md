# Déploiement GitHub Pages — Support interactif séance 08

## Objectif

Ce fichier décrit un premier scénario de production pour publier le support interactif de la séance 08 sur GitHub Pages.

La page cible est :

```text
support-seance-08-prompt-structure-candidat.html
```

Elle peut être renommée en `index.html` pour devenir la page d’accueil du dépôt GitHub Pages.

## Scénario de production

1. Le formateur publie la page sur GitHub Pages.
2. Le candidat ouvre la page pendant l’atelier.
3. Il utilise les prompts et les boutons copier-coller pour préparer son livrable.
4. Il remplit le formulaire d’appel à contribution.
5. La page génère un résumé de contribution.
6. Le résumé est enregistré localement dans le navigateur.
7. Le candidat copie le résumé ou prépare un email au formateur.
8. Le formateur consolide les contributions reçues.

## Architecture recommandée

```text
support-seance-08/
├── index.html
├── affiche-preparation-seance-08.html
├── affiche-preparation-seance-08.pdf
├── support-seance-08-prompt-structure-candidat.md
└── README-deploiement-github-pages.md
```

Option si le projet devient plus grand :

```text
support-seance-08/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── docs/
│   ├── affiche-preparation-seance-08.pdf
│   └── support-seance-08-prompt-structure-candidat.md
└── README.md
```

## Déploiement rapide

1. Créer un dépôt GitHub.
2. Copier `support-seance-08-prompt-structure-candidat.html` dans le dépôt.
3. Renommer ce fichier en `index.html`.
4. Ajouter les fichiers annexes dans le même dossier.
5. Pousser les fichiers sur la branche principale.
6. Dans GitHub, ouvrir `Settings` puis `Pages`.
7. Choisir `Deploy from a branch`.
8. Sélectionner la branche principale et le dossier racine.
9. Ouvrir l’URL GitHub Pages générée.

## Limite importante

GitHub Pages est statique : il n’enregistre pas les inscriptions sur un serveur.

La page proposée :

- génère un résumé ;
- copie le résumé dans le presse-papiers ;
- enregistre temporairement les contributions dans le navigateur via `localStorage` ;
- prépare un email via un lien `mailto:`.

Pour une vraie collecte centralisée, il faudra ajouter plus tard un outil externe comme un formulaire GitHub Issues, Google Forms, Airtable, Notion, Supabase ou Firebase.


## Production réalisée dans ce dépôt

Le scénario ci-dessus est maintenant matérialisé dans le dossier :

```text
site-github-pages/
```

Ce dossier contient une version prête à déployer :

- `index.html` pour la page d’accueil GitHub Pages ;
- `assets/css/styles.css` pour les styles spécifiques ;
- `assets/js/app.js` pour les interactions ;
- `docs/` pour les annexes et supports de séance ;
- `README.md` pour les consignes de publication.

Pour publier rapidement, copiez le contenu de `site-github-pages/` dans un dépôt GitHub et activez GitHub Pages sur la branche principale.


## Collecte des réponses avec la PWA cPanel

Un module prêt à adapter est disponible dans :

```text
collecte-reponses-candidats/
```

Il fournit :

- un endpoint PHP `api/submit.php` pour enregistrer les contributions ;
- un export CSV protégé par jeton `api/export-csv.php` ;
- un adaptateur JavaScript `assets/js/collecte-adapter.js` à brancher sur la page séance 08 ou la PWA ;
- un schéma JSON et un modèle CSV en annexes.

Cette option est adaptée à un hébergement cPanel, car elle ne nécessite pas Node.js ni base de données au démarrage.
