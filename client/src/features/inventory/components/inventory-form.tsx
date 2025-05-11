import Modal from "@/components/modal";
import { useInventoryStore } from "../store";
import ModalLayout from "@/layouts/modal-layout";
import { PackagePlusIcon } from "lucide-react";

const InventoryForm = () => {
  const { isOpen, setIsOpen } = useInventoryStore();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalLayout
        heading="Add New Item"
        subHeading="Please fill all fields required to create an item."
        icon={PackagePlusIcon}
      >
        <div>hey</div>
      </ModalLayout>
    </Modal>
  );
};

export default InventoryForm;
