<?php

namespace Src\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{
    private string $secret;
    private string $issuer;
    private string $audience;
    private int $expiration;
    private int $leeway;

    public function __construct()
    {
        $this->secret = $_ENV['JWT_SECRET'];
        $this->issuer = $_ENV['JWT_ISSUER'];
        $this->audience = $_ENV['JWT_AUDIENCE'];
        $this->expiration = $_ENV['JWT_EXPIRATION'];
        $this->leeway = $_ENV['JWT_LEEWAY'];

        \Firebase\JWT\JWT::$leeway = $this->leeway;
    }

    public function generate(array $customPayload = []): string
    {
        $now = time();

        $payload = array_merge([
            'iss' => $this->issuer,
            'aud' => $this->audience,
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + $this->expiration,
        ], $customPayload);

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function verify(string $token): array
    {
        $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
        return (array) $decoded;
    }
}
