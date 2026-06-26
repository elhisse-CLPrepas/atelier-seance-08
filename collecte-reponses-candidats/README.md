# Collecte des réponses candidats — Séance 08

## Réponse courte

Oui, vous pouvez utiliser l’application PWA hébergée dans cPanel pour collecter les réponses de la page séance 08, à condition d’ajouter une couche de collecte côté serveur.

La page GitHub Pages ou HTML seule ne suffit pas pour centraliser les réponses : `localStorage` conserve les données uniquement dans le navigateur du candidat. Pour récupérer les contributions côté formateur, il faut un endpoint serveur.

Dans cPanel, la solution la plus simple est :

- une page PWA ou HTML côté candidat ;
- un endpoint PHP côté serveur ;
- un stockage JSONL ou CSV dans un dossier protégé ;
- éventuellement une page d’administration protégée par un jeton.

## Dossier cible conseillé dans cPanel

Si votre PWA est publiée ici :

```text
https://clprepas.com/quiz-challenge/
```

vous pouvez ajouter ce module de collecte dans :

```text
public_html/quiz-challenge/seance-08-collecte/
```

ou dans :

```text
public_html/quiz-challenge/api/seance-08/
```

## Architecture fournie

```text
collecte-reponses-candidats/
├── README.md
├── api/
│   ├── config.example.php
│   ├── submit.php
│   ├── export-csv.php
│   └── data/
│       ├── .htaccess
│       └── reponses-seance-08.jsonl
├── assets/
│   └── js/
│       └── collecte-adapter.js
└── annexes/
    ├── schema-reponse-candidat.json
    └── modele-export-reponses.csv
```

## Comment l’utiliser avec la page existante

1. Copier le dossier `api/` dans votre hébergement cPanel, par exemple :

```text
public_html/quiz-challenge/api/seance-08/
```

2. Renommer `config.example.php` en `config.php`.
3. Modifier le jeton administrateur dans `config.php`.
4. Ajouter le script `collecte-adapter.js` à la page HTML de la séance 08 ou à votre PWA.
5. Configurer l’URL d’envoi :

```html
<script>
  window.SEANCE08_COLLECTE_ENDPOINT = '/quiz-challenge/api/seance-08/submit.php';
</script>
<script src="assets/js/collecte-adapter.js"></script>
```

6. Tester l’envoi depuis le formulaire candidat.
7. Exporter les réponses en CSV avec :

```text
https://clprepas.com/quiz-challenge/api/seance-08/export-csv.php?token=VOTRE_JETON_ADMIN
```

## Données collectées

Le module collecte :

- nom du candidat ;
- email ;
- titre de la contribution ;
- type de production ;
- besoin traité ;
- résumé préparé ;
- lien ou fichier de démonstration ;
- feedback attendu ;
- date d’envoi ;
- adresse IP hachée ;
- user-agent tronqué.

## Points de vigilance

- Ne demandez pas de données sensibles inutiles.
- Informez les candidats que leurs réponses seront collectées.
- Ajoutez une durée de conservation claire.
- Protégez le dossier `data/` contre l’accès direct.
- Changez le jeton administrateur avant la mise en ligne.
- Testez d’abord sur une URL de préproduction.

## Évolution possible

Pour une collecte plus robuste, vous pourrez remplacer le stockage JSONL par :

- MySQL cPanel ;
- Google Sheets via Apps Script ;
- Airtable ;
- Supabase ;
- Firebase ;
- GitHub Issues avec un token serveur.
