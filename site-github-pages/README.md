# Site GitHub Pages — Support interactif séance 08

## Objectif

Ce dossier contient une version directement déployable du support interactif de la séance 08.

Il reprend la page candidat, les styles, les scripts, les annexes et les documents utiles dans une architecture prête pour GitHub Pages.

## Structure livrée

```text
site-github-pages/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── docs/
│   ├── affiche-preparation-seance-08.html
│   ├── affiche-preparation-seance-08.pdf
│   ├── semaine-03&04-v1.md
│   └── support-seance-08-prompt-structure-candidat.md
└── README.md
```

## Fonctionnalités actives

- navigation par ancres ;
- prompts prêts à copier-coller ;
- formulaire d’appel à contribution ;
- génération automatique d’un résumé candidat ;
- copie du résumé dans le presse-papiers ;
- stockage local temporaire via `localStorage` ;
- préparation d’un email via `mailto:` ;
- liens vers les annexes de la séance 08.

## Déploiement sur GitHub Pages

1. Créer un dépôt GitHub, par exemple `support-seance-08`.
2. Copier le contenu du dossier `site-github-pages/` à la racine du dépôt.
3. Vérifier que `index.html` est bien à la racine.
4. Faire un commit puis pousser sur GitHub.
5. Aller dans `Settings` → `Pages`.
6. Choisir `Deploy from a branch`.
7. Sélectionner la branche principale et le dossier `/root`.
8. Enregistrer puis ouvrir l’URL GitHub Pages générée.

## Limite de la version statique

Cette version ne possède pas de base de données côté serveur.

Les contributions sont donc :

- conservées localement dans le navigateur du candidat ;
- copiables dans le presse-papiers ;
- transférables par email grâce au lien généré.

Pour une collecte centralisée, il faudra ajouter une solution externe : GitHub Issues, Google Forms, Airtable, Notion, Supabase ou Firebase.
