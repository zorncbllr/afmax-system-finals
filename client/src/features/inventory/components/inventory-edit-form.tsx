import { useEffect } from "react";
import useInventoryForm from "../hooks/inventory-form-hook";
import { useInventoryStore } from "../store";
import InventoryForm from "./inventory-form";
import { useFetchInventoryById } from "../api/queries";

const EditInventoryForm = ({ inventoryId }: { inventoryId: number }) => {
  const inventoryForm = useInventoryForm();
  const { isEditFormOpen, setIsEditFormOpen } = useInventoryStore();

  const { data: inventory } = useFetchInventoryById(inventoryId);

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
  }, [isEditFormOpen]);

  useEffect(() => {
    if (inventory) {
      inventoryForm.form.reset({
        unit: inventory.unit,
        productId: inventory.productId,
        abbreviation: inventory.abbreviation,
        quantity: inventory.quantity,
        expiration: new Date(inventory.expiration),
      });
    }
  }, [inventory]);

  return (
    <InventoryForm
      {...inventoryForm}
      isOpen={isEditFormOpen}
      setIsOpen={setIsEditFormOpen}
    />
  );
};

export default EditInventoryForm;
