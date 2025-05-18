import Modal from "@/components/modal";
import ModalLayout from "@/layouts/modal-layout";
import { useCartFormStore } from "../stores/cart-form-store";
import { MinusIcon, PlusIcon, TicketPlusIcon } from "lucide-react";

import { ProductDetails } from "@/features/products/types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAddToCart } from "../api/mutations";
import { useAuthStore } from "@/features/auth/store";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { SERVER_BASEURL } from "@/lib/api";

const AddToCartForm = ({ product }: { product: ProductDetails }) => {
  const { isOpen, setIsOpen } = useCartFormStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(product.price);
  const { mutate } = useAddToCart();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  const increment = () => setQuantity((qty) => qty + 1);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((qty) => qty - 1);
    }
  };

  const addToCart = () => {
    if (isAuthenticated && user?.role === "User") {
      mutate({ productId: product.productId, quantity });
    }

    if (user?.role === "Admin") {
      toast.error("Admin cannot add item to cart.", {
        position: "top-right",
      });
    }

    if (!isAuthenticated && user?.role == undefined) {
      navigate("/auth/sign-in");
    }

    setIsOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setQuantity(1);
    }, 500);
  }, [isOpen]);

  useEffect(() => {
    setTotalPrice(() => product.price * quantity);
  }, [setQuantity, quantity]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} variant="sm">
      <div>
        <ModalLayout
          heading="Add Item to Cart"
          subHeading="Customize product quantity and unit to your liking."
          icon={TicketPlusIcon}
        >
          <div className="py-8 px-4">
            <div className="size-60 shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                alt="Cart Item"
                src={SERVER_BASEURL + product.images[0]}
                className="size-full object-cover rounded-lg"
              />
            </div>

            <div className="ml-4 mt-8 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between font-semibold text-lg text-gray-700">
                  <h3>
                    <a href={`/products/${product.productId}`}>
                      {product.productName}
                    </a>
                  </h3>
                  <p className="ml-4 text-blue-500">
                    {new Intl.NumberFormat("fil-PH", {
                      style: "currency",
                      currency: "PHP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }).format(totalPrice)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
              </div>
              <div className="flex flex-1 items-center justify-between text-sm">
                <p className="text-gray-500 font-semibold">Qty {quantity}</p>

                <div className="flex">
                  <Button onClick={increment} variant={"ghost"}>
                    <PlusIcon />
                  </Button>
                  <Button onClick={decrement} variant={"ghost"}>
                    <MinusIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalLayout>

        <div className="px-8 pb-8 flex justify-end gap-2">
          <Button onClick={() => setIsOpen(false)} variant={"secondary"}>
            Cancel
          </Button>
          <Button onClick={addToCart}>Add Item</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToCartForm;
