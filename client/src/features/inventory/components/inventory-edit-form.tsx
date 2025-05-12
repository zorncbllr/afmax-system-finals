import { useEffect, useState } from "react";
import useInventoryForm from "../hooks/inventory-form-hook";
import { useInventoryStore } from "../store";
import InventoryForm from "./inventory-form";
import { Inventory } from "../types";
import { fetchInventoryById } from "../api/services";
import { InventoryForm as InventoryFormData } from "../types";
import { useUpdateInventory } from "../api/mutations";

const EditInventoryForm = () => {
  const inventoryForm = useInventoryForm();
  const { mutate } = useUpdateInventory();
  const { isEditFormOpen, setIsEditFormOpen, inventoryId } =
    useInventoryStore();

  const [inventory, setInventory] = useState<Inventory | undefined>(undefined);

  useEffect(() => {
    if (inventoryId > 0) {
      fetchInventoryById(inventoryId).then((data) => setInventory(data));
    }
  }, [inventoryId]);

  useEffect(() => {
    if (inventory) {
      const date =
        inventory.expiration.length > 0
          ? new Date(inventory.expiration)
          : undefined;

      inventoryForm.form.reset({
        unit: inventory.unit,
        productId: inventory.productId,
        abbreviation: inventory.abbreviation,
        quantity: inventory.quantity,
        expiration: date,
      });
    }
  }, [inventory]);

  const submitHandler = (value: InventoryFormData) =>
    mutate({ inventoryId: inventoryId, inventory: value });

  return (
    <InventoryForm
      {...inventoryForm}
      heading="Edit Inventory Item"
      subHeading="Please fill all fields required to update an item."
      buttonLabel="Update"
      isOpen={isEditFormOpen}
      submitHandler={submitHandler}
      setIsOpen={setIsEditFormOpen}
    />
  );
};

export default EditInventoryForm;
