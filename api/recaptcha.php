<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$secretKey = "YOUR_SECRET_KEY_HERE"; // Replace with your actual secret key
$data = json_decode(file_get_contents("php://input"), true);
$token = $data['token'] ?? '';

if (empty($token)) {
    echo json_encode([
        "success" => false,
        "message" => "No reCAPTCHA token provided"
    ]);
    exit;
}

$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$token}");
$result = json_decode($response, true);

if ($result["success"]) {
    // Here you can process the form data
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $contact = $data['contact'] ?? '';
    
    // Add your form processing logic here
    // For example: save to database, send email, etc.
    
    echo json_encode([
        "success" => true,
        "message" => "Form submitted successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "reCAPTCHA verification failed",
        "errors" => $result["error-codes"] ?? []
    ]);
}
