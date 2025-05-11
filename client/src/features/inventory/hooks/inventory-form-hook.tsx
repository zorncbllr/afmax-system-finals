import { useEffect, useState } from "react";
import { useInventoryStore } from "../store";
import { useFetchProducts } from "@/features/products/api/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryFormSchema } from "../types";
import { z } from "zod";

const useInventoryForm = () => {
  const { isOpen, setIsOpen } = useInventoryStore();
  const { data: products } = useFetchProducts();
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [openDate, setOpenDate] = useState<boolean>(false);

  const form = useForm<z.infer<typeof InventoryFormSchema>>({
    resolver: zodResolver(InventoryFormSchema),
    defaultValues: {
      unit: "",
      productId: 0,
      abbreviation: "",
      quantity: 0,
      expiration: undefined,
    },
  });

  const submitHandler = (value: z.infer<typeof InventoryFormSchema>) => {
    console.log(value);
  };

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
