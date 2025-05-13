import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductEditFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { breadcrumbList } from "../pages/admin/admin-products";
import { useUpdateProduct } from "../api/mutations";
import { useFetchProductById } from "../api/queries";

export const useEditProductForm = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [category, SetCategory] = useState<string>("");
  const { mutate } = useUpdateProduct();

  const { setActivePage, setBreadcrumbList } = useBreadcrumb();

  const { productId } = useParams();
  const { data: product } = useFetchProductById(parseInt(productId!));

  const form = useForm<z.infer<typeof ProductEditFormSchema>>({
    resolver: zodResolver(ProductEditFormSchema),
    defaultValues: {
      productName: "",
      brand: "",
      description: "",
      price: 0,
      categories: [],
      images: new DataTransfer().files,
    },
  });

  const submitHandler = (values: z.infer<typeof ProductEditFormSchema>) => {
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

    for (const img of imagePreviews) {
      if (!img.match(/blob/)) {
        formData.append(
          "existingImages[]",
          img.replace("http://localhost:8000", "")
        );
      }
    }

    mutate({ product: formData, productId: product!.productId });
  };

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

  const removeImage = (index: number) => {
    const images = [...imagePreviews];

    images.splice(index, 1);
    setImagePreviews(images);

    const formImages = createDataTransfer();

    URL.revokeObjectURL(imagePreviews[index]);
    formImages.items.remove(index);
    form.setValue("images", formImages.files);
  };

  const createDataTransfer = (): DataTransfer => {
    const formImages = new DataTransfer();

    for (const img of form.getValues("images")) {
      formImages.items.add(img);
    }

    return formImages;
  };

  const addImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const formImages = createDataTransfer();
    const imgPrevs = [...imagePreviews];

    if (files) {
      for (const file of files) {
        formImages.items.add(file);
        imgPrevs.push(URL.createObjectURL(file));
      }
    }

    setImagePreviews(imgPrevs);
    form.setValue("images", formImages.files);
  };

  useEffect(() => {
    if (product) {
      const activePage: BreadcrumbItem = {
        href: `/admin/products/edit/${product.productId.toString()}`,
        itemName: product.productName,
      };

      setBreadcrumbList([...breadcrumbList, activePage]);
      setActivePage(activePage);

      setImagePreviews(
        product.images.map((img) => `http://localhost:8000${img}`)
      );

      form.setValue("productName", product.productName);
      form.setValue("brand", product.brand);
      form.setValue("price", product.price);
      form.setValue("description", product.description);
      form.setValue("categories", product.categories);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      for (const img of imagePreviews) {
        URL.revokeObjectURL(img);
      }
    };
  }, []);

  return {
    imagePreviews,
    category,
    form,
    addImages,
    SetCategory,
    removeCategory,
    removeImage,
    appendCategory,
    submitHandler,
  };
};
