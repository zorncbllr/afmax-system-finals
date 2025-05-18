<?php

namespace Src\Services;

use PDOException;
use Src\Core\Database;
use Src\Core\Exceptions\ServiceException;
use Src\Core\Exceptions\TransactionException;
use Src\Models\DTOs\OrderDTO;
use Src\Models\Invoice;
use Src\Models\OrderDetail;
use Src\Models\Transaction;
use Src\Repositories\CartItemRepository;
use Src\Repositories\CartRepository;
use Src\Repositories\InvoiceRepository;
use Src\Repositories\OrderDetailRepository;
use Src\Repositories\OrderRepository;
use Src\Repositories\UserRepository;

class OrderService
{

    public function __construct(
        protected Database $database,
        protected OrderRepository $orderRepository,
        protected OrderDetailRepository $orderDetailRepository,
        protected UserRepository $userRepository,
        protected CartRepository $cartRepository,
        protected InvoiceRepository $invoiceRepository,
        protected CartItemRepository $cartItemRepository,
        protected TransactionService $transactionService
    ) {}


    /** @return array<OrderDTO> */
    public function getAllOrders(): array
    {
        $orders = $this->orderRepository->getAllOrders();

        return $orders;
    }

    public function placeOrder(int $userId, bool $isDeposit): array
    {
        try {
            $this->database->beginTransaction();

            $user = $this->userRepository->getUserById($userId);

            if (!$user) {
                throw new ServiceException("User does not exists.");
            }

            $cart = $this->cartRepository->findByUserId($user->userId);

            if (!$cart) {
                $cart = $this->cartRepository->createCart($user->userId);
            }

            $cartItems = $this->cartItemRepository->getAllCartItems($cart->cartId);

            if (empty($cartItems)) {
                throw new ServiceException("No cart items to checkout.");
            }

            $order = $this->orderRepository->createOrder($cart->cartId, 0);

            foreach ($cartItems as $item) {
                $orderDetail = new OrderDetail();
                $orderDetail->quantity = $item->quantity;
                $orderDetail->orderId = $order->orderId;
                $orderDetail->productId = $item->productId;
                $orderDetail->unitId = $item->unitId;

                $this->orderDetailRepository->addProductOrder($orderDetail);
            }

            $this->cartItemRepository->clearItems($cart->cartId);

            $orderDTO = $this->orderRepository->getOrderDTOById($order->orderId);

            $order->amountDue = $isDeposit ?  $orderDTO->totalAmount / 2 : $orderDTO->totalAmount;

            $this->orderRepository->updateOrder($order->orderId, $order->amountDue);

            $transactionLink = $this->transactionService->createLink(
                remarks: "Carier will be daily overland.",
                description: "Partial payment for " .  $orderDTO->orderList,
                amount: $order->amountDue,
            );

            $this->database->commit();

            return [
                "orderId" => $order->orderId,
                ...$transactionLink
            ];
        } catch (PDOException $e) {

            $this->database->rollBack();

            throw new ServiceException("Unable to place user order.");
        } catch (TransactionException $e) {

            $this->database->rollBack();

            throw new TransactionException($e->getMessage(), $e->getCode());
        }
    }
}
