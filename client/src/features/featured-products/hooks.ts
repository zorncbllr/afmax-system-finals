import { useMutation, useQuery } from "@tanstack/react-query";
import { getFeaturedCategories, setIsFeatured } from "./service";
import { queryClient } from "@/main";
import toast from "react-hot-toast";

export const useFetchFeaturedCategories = () =>
  useQuery({
    queryKey: ["featured"],
    queryFn: getFeaturedCategories,
  });

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

      toast.success("Product has been featured.", {
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
