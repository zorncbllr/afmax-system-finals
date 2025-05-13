import { useEffect, useState } from "react";
import { ProductError, ProductFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProductFormStore } from "../store";
import { AxiosError } from "axios";
import { useCreateProduct } from "../api/mutations";

const useProductForm = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [category, SetCategory] = useState<string>("");
  const { isOpen } = useProductFormStore();
  const { mutate, isError, error } = useCreateProduct();

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      productName: "",
      brand: "",
      description: "",
      price: 0,
      categories: [],
      images: new DataTransfer().files,
    },
  });

  if (isError) {
    const err = error as AxiosError<ProductError>;
    const data = err.response?.data;

    if (data?.description) {
      form.setError("description", { message: data.description });
    }

    if (data?.images) {
      form.setError("images", { message: data.images });
    }
  }

  const appendCategory = () => {
    if (category != "") {
      form.setValue("categories", [...form.getValues("categories"), category]);
      SetCategory("");
    }
  };

  const removeCategory = (index: number) => {
    const categories = form.getValues("categories");
    categories.splice(index, 1);
    form.setValue("categories", categories);
  };

  const submitHandler = (values: z.infer<typeof ProductFormSchema>) => {
    const formData = new FormData();

    formData.set("productName", values.productName);
    formData.set("brand", values.brand);
    formData.set("description", values.description);
    formData.set("price", values.price.toString());

    for (const image of values.images) {
      formData.append("images[]", image, image.name);
    }

    for (const category of values.categories) {
      formData.append("categories[]", category);
    }

    mutate(formData);
  };

  useEffect(() => {
    const generatePreviews = async () => {
      if (form.watch("images")?.length > 0) {
        const previews = await Promise.all(
          Array.from(form.watch("images")).map((file) =>
            URL.createObjectURL(file)
          )
        );
        setImagePreviews(previews);
      } else {
        setImagePreviews([]);
      }
    };

    generatePreviews();
  }, [form.watch("images")]);

  useEffect(() => {
    if (form.getValues("categories").length > 0) {
      form.clearErrors("categories");
    }
  }, [form.watch("categories")]);

  useEffect(() => {
    setTimeout(() => {
      imagePreviews.forEach((image) => {
        URL.revokeObjectURL(image);
      });

      form.clearErrors();

      setImagePreviews([]);
      SetCategory("");

      form.reset({
        productName: "",
        brand: "",
        description: "",
        price: 0,
        categories: [],
        images: new DataTransfer().files,
      });
    }, 300);
  }, [isOpen]);

  return {
    imagePreviews,
    setImagePreviews,
    category,
    SetCategory,
    form,
    appendCategory,
    removeCategory,
    submitHandler,
  };
};

export default useProductForm;
