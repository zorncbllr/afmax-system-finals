<?php

namespace Src\Services;

use GuzzleHttp\Client;
use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Exceptions\TransactionException;
use Src\Models\Invoice;
use Src\Models\Transaction;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\InventoryRepository;
use Src\Repositories\InvoiceRepository;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;
use Src\Repositories\PaymentMethodRepository;
use Src\Repositories\PaymentRepository;
use Src\Repositories\TransactionRepository;

class TransactionService
{

    public function __construct(
        protected Database $database,
        protected TransactionRepository $transactionRepository,
        protected OrderRepository $orderRepository,
        protected PaymentRepository $paymentRepository,
        protected PaymentMethodRepository $paymentMethodRepository,
        protected OrderDetailRepository $orderDetailRepository,
        protected CartRepository $cartRepository,
        protected InvoiceRepository $invoiceRepository,
        protected InventoryRepository $inventoryRepository,
        protected CartItemRepository $cartItemRepository,
        protected Client $client
    ) {}

    public function createLink(string $remarks, string $description, float $amount): array
    {
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

        if (isset($responseBody->errors)) {

            throw new TransactionException(
                $responseBody->errors[0]->detail,
                $responseBody->errors[0]->code
            );
        }

        return [
            "transactionId" => $responseBody->data->id,
            "checkoutLink" => $$responseBody->data->attributes->checkout_url
        ];
    }

    public function handleSuccessPayment(string $transactionId, int $orderId)
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

            try {
                $paymentMethod = $this->paymentMethodRepository
                    ->createPaymentMethod($attributes->source->type);
            } catch (PDOException $_) {

                $paymentMethod = $this->paymentMethodRepository
                    ->getMethodByName($attributes->source->type);
            }

            $payment = $this->paymentRepository
                ->createPayment(
                    $attributes->amount,
                    $paymentMethod->paymentMethodId
                );

            $transaction = $this->transactionRepository
                ->createTransaction($payment->paymentId);

            $invoice = $this->invoiceRepository
                ->createInvoice(
                    orderId: $orderId,
                    transactionId: $transaction->transactionId,
                    description: $attributes->description,
                    remarks: $attributes->remarks
                );

            $order = $this->orderRepository->getOrderById($orderId);

            $this->orderRepository->updateOrder(
                orderId: $order->orderId,
                amountDue: $order->amountDue - $payment->amount
            );

            $orderDetails = $this->orderDetailRepository->getOrderDetails($order->orderId);

            foreach ($orderDetails as $orderDetail) {
            }

            // TODO: INTEGRATE SYMPHONY MAILER & PDF GENERATOR

            $this->$this->database->commit();
        } catch (PDOException $e) {

            $this->database->rollBack();
        }
    }

    public function handleFailedPayment(int $orderId): string
    {
        try {
            $this->database->beginTransaction();

            $order = $this->orderRepository->getOrderById($orderId);
            $cart = $this->cartRepository->getCartById($order->cartId);

            $orderDetails = $this->orderDetailRepository->getOrderDetails($order->orderId);

            foreach ($orderDetails as $detail) {

                $this->cartItemRepository
                    ->createItem($cart->cartId, $detail->productId, $detail->quantity);
            }

            $this->orderDetailRepository->clearOrderDetails($order->orderId);

            $this->orderRepository->deleteOrder($order->orderId);

            $this->database->commit();

            return "Unable to place user order.";
        } catch (PDOException $e) {

            $this->database->rollBack();

            throw new ServiceException("Unable to retrieve cart items.");
        }
    }
}
