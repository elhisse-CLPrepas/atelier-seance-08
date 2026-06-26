<?php
$configPath = __DIR__ . '/config.php';
$config = file_exists($configPath) ? require $configPath : require __DIR__ . '/config.example.php';
$token = $_GET['token'] ?? '';

if (!hash_equals((string) $config['admin_token'], (string) $token)) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Accès refusé.';
    exit;
}

$dataFile = $config['data_file'];
$headers = [
    'submittedAt',
    'candidateName',
    'candidateEmail',
    'projectTitle',
    'projectType',
    'projectNeed',
    'projectSummary',
    'projectLink',
    'feedbackAsk',
    'source',
];

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="reponses-seance-08.csv"');

$output = fopen('php://output', 'w');
fputcsv($output, $headers, ';');

if (is_file($dataFile)) {
    $handle = fopen($dataFile, 'r');
    while (($line = fgets($handle)) !== false) {
        $record = json_decode($line, true);
        if (!is_array($record)) {
            continue;
        }
        $row = [];
        foreach ($headers as $header) {
            $row[] = $record[$header] ?? '';
        }
        fputcsv($output, $row, ';');
    }
    fclose($handle);
}

fclose($output);
