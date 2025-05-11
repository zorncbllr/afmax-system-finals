import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { setIsFeatured } from "./services";
import toast from "react-hot-toast";

export const useSetFeatured = () => {
  const client = queryClient;

  return useMutation({
    mutationKey: ["featured"],
    mutationFn: async (params: { productId: number; value: boolean }) =>
      setIsFeatured(params),

    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["featured"],
      });

      client.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success(data.message, {
        position: "top-right",
      });
    },

    onError: (err) => {
      console.log(err);
      toast.error("Failed to feature product.", {
        position: "top-right",
      });
    },
  });
};
