import { useState } from "react";
import { useFetchProducts } from "@/features/products/api/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryForm, InventoryFormSchema } from "../types";

const useInventoryForm = () => {
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

  return {
    form,
    openSelect,
    setOpenSelect,
    openDate,
    setOpenDate,
    products,
  };
};

export default useInventoryForm;
