<?php

namespace Src\Services;

use GuzzleHttp\Client;
use Src\Core\Database;
use Src\Models\Transaction;
use Src\Repositories\TransactionRepository;

class TransactionService
{

    public function __construct(
        protected Database $database,
        protected TransactionRepository $transactionRepository,
        protected Client $client
    ) {}

    public function createTransaction(string $remarks, string $description, float $amount, int $userId): Transaction
    {
        $payload = [
            'data' => [
                'attributes' => [
                    'remarks' => $remarks,
                    'description' => $description,
                    'amount' => $amount * 100
                ]
            ]
        ];

        $response = $this->client->request('POST', 'https://api.paymongo.com/v1/links', [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode($_ENV["PAYMONGO_SECRET"] . ":"),
                'Content-Type' => 'application/json',
            ],
            'json' => $payload,
        ]);

        $responseBody = json_decode($response->getBody(), false);
        $attributes = $responseBody->data->attributes;

        $transaction = new Transaction();

        $transaction->transactionId = $responseBody->data->id;
        $transaction->remarks = $attributes->remarks;
        $transaction->description = $attributes->description;
        $transaction->status = $attributes->status;
        $transaction->amount = $attributes->amount;
        $transaction->checkOutUrl = $attributes->checkout_url;
        $transaction->referenceNumber = $attributes->reference_number;
        $transaction->userId = $userId;

        $this->transactionRepository->createTransaction($transaction);

        return $transaction;
    }

    public function retrieveTransaction(string $transactionId)
    {
        $response = $this->client->request('GET', 'https://api.paymongo.com/v1/links/' . $transactionId, [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic ' . base64_encode($_ENV["PAYMONGO_SECRET"] . ":"),
            ],
        ]);

        echo $response->getBody();
    }
}
