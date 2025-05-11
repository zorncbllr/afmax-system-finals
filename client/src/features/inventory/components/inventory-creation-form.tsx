import { useEffect } from "react";
import useInventoryForm from "../hooks/inventory-form-hook";
import { useInventoryStore } from "../store";
import InventoryForm from "./inventory-form";

const CreateInventoryForm = () => {
  const inventoryForm = useInventoryForm();
  const { isCreationFormOpen, setIsCreationFormOpen } = useInventoryStore();

  useEffect(() => {
    setTimeout(() => {
      inventoryForm.form.reset({
        unit: "",
        productId: 0,
        abbreviation: "",
        quantity: 0,
        expiration: undefined,
      });
    }, 500);
  }, [isCreationFormOpen]);

  return (
    <InventoryForm
      {...inventoryForm}
      isOpen={isCreationFormOpen}
      setIsOpen={setIsCreationFormOpen}
    />
  );
};

export default CreateInventoryForm;
