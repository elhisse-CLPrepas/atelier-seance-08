<?php
$configPath = __DIR__ . '/config.php';
$config = file_exists($configPath) ? require $configPath : require __DIR__ . '/config.example.php';

function respond_json(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function apply_cors(array $allowedOrigins): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin && in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

function clean_value($value, int $maxLength): string
{
    $value = trim((string) $value);
    $value = preg_replace('/\s+/u', ' ', $value) ?? '';
    return substr($value, 0, $maxLength);
}

apply_cors($config['allowed_origins']);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    respond_json(204, []);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond_json(405, ['ok' => false, 'error' => 'Méthode non autorisée.']);
}

$rawBody = file_get_contents('php://input') ?: '';
$input = json_decode($rawBody, true);

if (!is_array($input)) {
    respond_json(400, ['ok' => false, 'error' => 'JSON invalide.']);
}

if (!empty($input['website'])) {
    respond_json(200, ['ok' => true, 'message' => 'Contribution reçue.']);
}

$max = (int) ($config['max_field_length'] ?? 3000);
$required = ['candidateName', 'candidateEmail', 'projectTitle', 'projectType', 'projectNeed', 'projectSummary', 'feedbackAsk'];
$record = [];

foreach ($required as $field) {
    $record[$field] = clean_value($input[$field] ?? '', $max);
    if ($record[$field] === '') {
        respond_json(422, ['ok' => false, 'error' => 'Champ obligatoire manquant : ' . $field]);
    }
}

if (!filter_var($record['candidateEmail'], FILTER_VALIDATE_EMAIL)) {
    respond_json(422, ['ok' => false, 'error' => 'Email invalide.']);
}

$record['projectLink'] = clean_value($input['projectLink'] ?? '', $max);
$record['submittedAt'] = gmdate('c');
$record['ipHash'] = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . ($config['admin_token'] ?? ''));
$record['userAgent'] = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 250);
$record['source'] = 'seance-08-support-candidat';

$dataFile = $config['data_file'];
$dataDir = dirname($dataFile);

if (!is_dir($dataDir) && !mkdir($dataDir, 0750, true)) {
    respond_json(500, ['ok' => false, 'error' => 'Impossible de créer le dossier de stockage.']);
}

$line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL;

if (file_put_contents($dataFile, $line, FILE_APPEND | LOCK_EX) === false) {
    respond_json(500, ['ok' => false, 'error' => 'Impossible d’enregistrer la contribution.']);
}

respond_json(201, ['ok' => true, 'message' => 'Contribution enregistrée.', 'submittedAt' => $record['submittedAt']]);
