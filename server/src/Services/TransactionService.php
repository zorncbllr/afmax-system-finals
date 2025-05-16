<?php

namespace Src\Services;

use GuzzleHttp\Client;
use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Exceptions\TransactionException;
use Src\Models\Transaction;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;
use Src\Repositories\TransactionRepository;

class TransactionService
{

    public function __construct(
        protected Database $database,
        protected TransactionRepository $transactionRepository,
        protected OrderRepository $orderRepository,
        protected OrderDetailRepository $orderDetailRepository,
        protected CartRepository $cartRepository,
        protected CartItemRepository $cartItemRepository,
        protected Client $client
    ) {}

    public function createTransaction(string $remarks, string $description, float $amount, int $orderId): Transaction
    {
        $amount = $amount / 2 < 100 ? 100 : $amount;

        $payload = [
            'data' => [
                'attributes' => [
                    'remarks' => $remarks,
                    'description' => $description,
                    'amount' => $amount * 100,
                    'redirect' => [
                        'success' => 'https://9db6-103-200-32-5.ngrok-free.app/transactions/success',
                        'failed' => 'https://9db6-103-200-32-5.ngrok-free.app/transactions/failed'
                    ]
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

        if ($responseBody->errors) {

            throw new TransactionException(
                $responseBody->errors[0]->detail,
                $responseBody->errors[0]->code
            );
        }

        $attributes = $responseBody->data->attributes;

        $transaction = new Transaction();

        $transaction->transactionId = $responseBody->data->id;
        $transaction->remarks = $attributes->remarks;
        $transaction->description = $attributes->description;
        $transaction->status = $attributes->status;
        $transaction->amount = $attributes->amount;
        $transaction->checkOutUrl = $attributes->checkout_url;
        $transaction->referenceNumber = $attributes->referenceNumber;
        $transaction->orderId = $orderId;

        try {
            $this->transactionRepository->createTransaction($transaction);
        } catch (PDOException $e) {

            throw new ServiceException($e->getMessage());
        }

        return $transaction;
    }

    public function handleSuccessPayment(string $transactionId)
    {
        try {
            $this->database->beginTransaction();

            $response = $this->client->request('GET', 'https://api.paymongo.com/v1/links/' . $transactionId, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Basic ' . base64_encode($_ENV["PAYMONGO_SECRET"] . ":"),
                    'Content-Type' => 'application/json',
                ],
            ]);

            $paymentData = json_decode($response->getBody(), false);
            $attributes = $paymentData->data->attributes;

            $this->transactionRepository->updateStatus($attributes->status, $transactionId);

            $this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();
        }
    }

    public function handleFailedPayment(string $transactionId): array
    {
        try {
            $this->database->beginTransaction();

            $response = $this->client->request('GET', 'https://api.paymongo.com/v1/links/' . $transactionId, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Basic ' . base64_encode($_ENV["PAYMONGO_SECRET"] . ":"),
                    'Content-Type' => 'application/json',
                ],
            ]);

            $paymentData = json_decode($response->getBody(), false);

            $error = $paymentData->data->attributes->last_payment_error;

            $transaction = $this->transactionRepository->getTransactionById($transactionId);

            $this->transactionRepository->updateStatus("failed", $transaction->transactionId);

            $order = $this->orderRepository->getOrderById($transaction->orderId);
            $cart = $this->cartRepository->getCartById($order->cartId);

            $orderDetails = $this->orderDetailRepository->getOrderDetails($order->orderId);


            foreach ($orderDetails as $detail) {

                $this->cartItemRepository
                    ->createItem($cart->cartId, $detail->productId, $detail->quantity);
            }

            $this->orderDetailRepository->clearOrderDetails($order->orderId);

            $this->orderRepository->deleteOrder($order->orderId);

            $this->database->commit();

            return ["code" => $error->code, "message" => $error->detail];
        } catch (PDOException $e) {

            $this->database->rollBack();

            throw new ServiceException("Unable to retrieve cart items.");
        }
    }
}
