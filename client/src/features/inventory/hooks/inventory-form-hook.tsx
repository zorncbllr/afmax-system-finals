import { useEffect, useState } from "react";
import { useInventoryStore } from "../store";
import { useFetchProducts } from "@/features/products/api/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryForm, InventoryFormSchema } from "../types";
import { useCreateInventory } from "../api/mutations";

const useInventoryForm = () => {
  const { mutate } = useCreateInventory();

  const { isOpen, setIsOpen } = useInventoryStore();
  const { data: products } = useFetchProducts();
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [openDate, setOpenDate] = useState<boolean>(false);

  const form = useForm<InventoryForm>({
    resolver: zodResolver(InventoryFormSchema),
    defaultValues: {
      unit: "",
      productId: 0,
      abbreviation: "",
      quantity: 0,
      expiration: undefined,
    },
  });

  const submitHandler = (value: InventoryForm) => mutate(value);

  useEffect(() => {
    setTimeout(() => {
      form.reset({
        unit: "",
        productId: 0,
        abbreviation: "",
        quantity: 0,
        expiration: undefined,
      });
    }, 500);
  }, [isOpen]);

  return {
    form,
    isOpen,
    openSelect,
    setOpenSelect,
    openDate,
    setOpenDate,
    products,
    setIsOpen,
    submitHandler,
  };
};

export default useInventoryForm;
