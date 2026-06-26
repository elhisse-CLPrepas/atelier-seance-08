<?php
// Copier ce fichier en config.php puis modifier les valeurs.
return [
    'admin_token' => 'CHANGEZ_CE_JETON_AVANT_MISE_EN_LIGNE',
    'allowed_origins' => [
        'https://clprepas.com',
        'https://www.clprepas.com',
    ],
    'data_file' => __DIR__ . '/data/reponses-seance-08.jsonl',
    'max_field_length' => 3000,
];
