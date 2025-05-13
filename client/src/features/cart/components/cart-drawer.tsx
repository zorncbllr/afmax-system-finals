import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { useCartDrawer } from "../store";
import { Button } from "@/components/ui/button";
import { useFetchCartItems } from "../api/queries";
import { useRemoveToCart, useUpdateCartItem } from "../api/mutations";

export default function CartDrawer() {
  const { isOpen, setIsOpen } = useCartDrawer();
  const { data: cart } = useFetchCartItems();
  const { mutate: removeItem } = useRemoveToCart();
  const { mutate: updateItem } = useUpdateCartItem();

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Cart Items
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart?.cartItems.map((item) => (
                          <li key={item.cartItemId} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt="Cart Item"
                                src={`http://localhost:8000${item.product.image}`}
                                className="size-full object-cover rounded-lg"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a
                                      href={`/products/${item.product.productId}`}
                                    >
                                      {item.product.productName}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    {new Intl.NumberFormat("fil-PH", {
                                      style: "currency",
                                      currency: "PHP",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 2,
                                    }).format(
                                      item.quantity * item.product.price
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-center justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {item.quantity}
                                </p>

                                <div className="flex">
                                  <Button
                                    onClick={() =>
                                      updateItem({
                                        productId: item.product.productId,
                                        quantity: item.quantity + 1,
                                      })
                                    }
                                    variant={"ghost"}
                                  >
                                    <PlusIcon />
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      updateItem({
                                        productId: item.product.productId,
                                        quantity: item.quantity - 1,
                                      })
                                    }
                                    variant={"ghost"}
                                  >
                                    <MinusIcon />
                                  </Button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => removeItem(item.cartItemId)}
                                    className="font-medium text-primary hover:underline"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      {new Intl.NumberFormat("fil-PH", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(cart?.totalPrice ?? 0)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button className="w-full my-6">Proceed to Check Out</Button>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-primary hover:underline"
                      >
                        Continue Browsing
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
