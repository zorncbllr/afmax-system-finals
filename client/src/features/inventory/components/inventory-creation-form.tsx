import { useEffect } from "react";
import useInventoryForm from "../hooks/inventory-form-hook";
import { useInventoryStore } from "../store";
import InventoryForm from "./inventory-form";
import { InventoryForm as InventoryFormData } from "../types";
import { useCreateInventory } from "../api/mutations";

const CreateInventoryForm = () => {
  const inventoryForm = useInventoryForm();
  const { isCreationFormOpen, setIsCreationFormOpen } = useInventoryStore();
  const { mutate } = useCreateInventory();

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

  const submitHandler = (value: InventoryFormData) => mutate(value);

  return (
    <InventoryForm
      {...inventoryForm}
      heading="Add New Item"
      subHeading="Please fill all fields required to create an item."
      buttonLabel="Add Item"
      isOpen={isCreationFormOpen}
      submitHandler={submitHandler}
      setIsOpen={setIsCreationFormOpen}
    />
  );
};

export default CreateInventoryForm;
