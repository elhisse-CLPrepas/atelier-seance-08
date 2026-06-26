# Atelier séance 08

Ce dépôt regroupe les supports de la séance 08 autour de la structuration de livrables candidats avec l'IA.

## Contenu

- `site-github-pages/` : version prête à publier sur GitHub Pages.
- `support-seance-08-prompt-structure-candidat.html` : support interactif complet.
- `support-seance-08-prompt-structure-candidat.md` : version Markdown du support.
- `affiche-preparation-seance-08.html` et `affiche-preparation-seance-08.pdf` : affiche de préparation.
- `prompts/` : prompts extraits et scénario de secours si aucun candidat volontaire ne propose de livrable.
- `collecte-reponses-candidats/` : module PHP optionnel pour centraliser les réponses candidat sur un hébergement cPanel.
- `README-deploiement-github-pages.md` : consignes détaillées de publication.

## Déploiement GitHub Pages

La version la plus simple à publier se trouve dans `site-github-pages/`.

1. Copier le contenu de `site-github-pages/` à la racine d'un dépôt GitHub.
2. Pousser la branche principale.
3. Activer GitHub Pages dans `Settings` puis `Pages`.

## Collecte des réponses

Le module `collecte-reponses-candidats/` fournit un exemple d'endpoint PHP, d'export CSV et d'adaptateur JavaScript.

Avant une mise en ligne, copier `collecte-reponses-candidats/api/config.example.php` vers `config.php`, changer le jeton administrateur, puis tester l'envoi sur une URL de préproduction.

Les fichiers `config.php` et `api/data/*.jsonl` sont ignorés par Git afin d'éviter de publier des secrets ou des réponses réelles.
