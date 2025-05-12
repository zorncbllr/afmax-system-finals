import { useMutation } from "@tanstack/react-query";
import { InventoryErrorResponse, InventoryForm } from "../types";
import { createInventory, deleteInventory, updateInventory } from "./services";
import toast from "react-hot-toast";
import { queryClient } from "@/main";
import { AxiosError } from "axios";
import { useInventoryStore } from "../store";

export const useCreateInventory = () => {
  const client = queryClient;
  const { setIsCreationFormOpen } = useInventoryStore();

  return useMutation({
    mutationKey: ["inventory"],
    mutationFn: async (inventoryData: InventoryForm) =>
      createInventory(inventoryData),

    onSuccess: (data) => {
      console.log(data);

      setIsCreationFormOpen(false);

      client.invalidateQueries({
        queryKey: ["inventory"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error: AxiosError<InventoryErrorResponse>) => {
      console.log(error.response);

      toast.error(error.response!.data.message, {
        position: "top-right",
      });
    },
  });
};

export const useDeleteInventory = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["inventory"],
    mutationFn: async (inventoryId: number) => deleteInventory(inventoryId),

    onSuccess: (data) => {
      console.log(data);

      client.invalidateQueries({
        queryKey: ["inventory"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error: AxiosError<InventoryErrorResponse>) => {
      console.log(error.response);

      toast.error(error.response!.data.message, {
        position: "top-right",
      });
    },
  });
};

export const useUpdateInventory = () => {
  const client = queryClient;
  const { setIsEditFormOpen } = useInventoryStore();

  return useMutation({
    mutationKey: ["inventory"],
    mutationFn: async (params: {
      inventoryId: number;
      inventory: InventoryForm;
    }) => updateInventory(params),

    onSuccess: (data) => {
      console.log(data);
      setIsEditFormOpen(false);

      client.invalidateQueries({
        queryKey: ["inventory"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (error: AxiosError<InventoryErrorResponse>) => {
      console.log(error.response);

      toast.error(error.response!.data.message, {
        position: "top-right",
      });
    },
  });
};
