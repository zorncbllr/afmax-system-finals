import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/features/categories/components/category-badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useFetchProductById } from "../../api/query";
import AdminLayout from "@/layouts/admin-layout";
import { ImagePlusIcon, PencilIcon, PlusIcon, XIcon } from "lucide-react";
import { breadcrumbList } from "./admin-products";
import { BreadcrumbItem, useBreadcrumb } from "@/features/breadcrumbs/store";
import { useForm } from "react-hook-form";
import { ProductFormSchema } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { urlToFile } from "@/lib/url-to-file";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@headlessui/react";
import { useAutoResizeTextarea } from "../../hooks/use-autoresize-textarea";

const ProductEditView = () => {
  const [mainImage, setMainImage] = useState<string>("");
  const [category, SetCategory] = useState<string>("");

  const { setActivePage, setBreadcrumbList } = useBreadcrumb();

  const { productId } = useParams();
  const { data: product, isFetched } = useFetchProductById(
    parseInt(productId!)
  );

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

  useEffect(() => {
    if (product) {
      const activePage: BreadcrumbItem = {
        href: `/admin/products/edit/${product.productId.toString()}`,
        itemName: product.productName,
      };

      setBreadcrumbList([...breadcrumbList, activePage]);
      setActivePage(activePage);

      const updateImages = async () => {
        const files = await Promise.all(
          product.images.map((url) => urlToFile(url))
        );

        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));

        form.setValue("images", dataTransfer.files);
      };

      updateImages();

      form.setValue("productName", product.productName);
      form.setValue("brand", product.brand);
      form.setValue("price", product.price);
      form.setValue("description", product.description);
      form.setValue("categories", product.categories);

      setMainImage(product!.images[0]);
    }
  }, [product]);

  return (
    <AdminLayout>
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit((value) => {
            console.log(value);
          })}
        >
          <div className="flex flex-col items-center gap-8 px-12">
            <div className="flex w-full gap-2 justify-end">
              <Button variant={"secondary"}>Cancel</Button>
              <Button>Update</Button>
            </div>

            <div className="flex  gap-40">
              <div className="flex w-fit gap-4">
                <div className="flex flex-col gap-4">
                  <div className="relative flex justify-center items-center w-[9rem] h-[9rem] border border-dashed border-blue-500 bg-blue-50 shadow-sm rounded-lg">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="placeholder-transparent text-transparent w-full h-full z-50"
                    />
                    <ImagePlusIcon
                      className="absolute text-blue-500"
                      size={40}
                    />
                  </div>

                  {product?.images.map((image) => (
                    <div className="relative">
                      <img
                        src={"http://localhost:8000" + image}
                        alt="Product Image"
                        className={cn(
                          "w-[9rem] h-[9rem] object-cover shadow-sm",
                          image == mainImage
                            ? " rounded-r-lg border-l-4 border-blue-500"
                            : "rounded-lg"
                        )}
                      />
                      <Button
                        variant={"secondary"}
                        className="rounded-full absolute -top-2 -right-2"
                      >
                        <XIcon />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <img
                    src={"http://localhost:8000" + mainImage}
                    alt="Product Image"
                    className="w-[30rem] h-[30rem] object-cover rounded-r-lg shadow-sm"
                  />
                  <Button
                    variant={"secondary"}
                    className="rounded-full absolute -top-2 -right-2"
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>

              <section className="flex-col flex gap-2 p-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-4 items-center">
                        <FormControl>
                          <Input
                            {...field}
                            className="text-3xl font-semibold font-mono focus:outline-none focus:border-b-1 border-gray-500 w-auto"
                          />
                        </FormControl>
                        <PencilIcon size={20} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-4 w-fit items-center">
                        <FormControl>
                          <Input
                            {...field}
                            className="text-xl focus:outline-none focus:border-b border-gray-500"
                            style={{ width: `${field.value?.length || 1}ch` }}
                          />
                        </FormControl>
                        <PencilIcon size={16} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex relative gap-4 items-center">
                        <div>
                          <span className="text-blue-700 text-2xl font-semibold">
                            &#8369;
                          </span>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              className="text-blue-700 text-2xl font-semibold my-4 focus:outline-none focus:border-b border-gray-500 [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                              style={{
                                width: `${
                                  field.value?.toString().length || 1
                                }ch`,
                              }}
                              value={field.value}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(isNaN(value) ? 0 : value);
                              }}
                            />
                          </FormControl>
                        </div>
                        <PencilIcon size={16} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ fieldState }) => (
                    <FormItem className="grid gap-2">
                      <FormControl>
                        <div className="space-y-4">
                          <div
                            className={cn(
                              "flex gap-2 border rounded-md p-1 w-1/2",
                              fieldState.error && "border-destructive"
                            )}
                          >
                            <Input
                              value={category}
                              onChange={(e) => SetCategory(e.target.value)}
                              className={cn(
                                "w-full border-0 focus-visible:ring-0 focus:outline-none px-4",
                                fieldState.error &&
                                  "text-destructive placeholder:text-destructive/50"
                              )}
                              type="text"
                              placeholder="Add a category..."
                            />
                            <Button
                              type="button"
                              variant={
                                fieldState.error ? "destructive" : "default"
                              }
                            >
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {form.getValues("categories").map((cat, index) => (
                              <CategoryBadge
                                key={cat}
                                category={cat}
                                className={cn(
                                  "text-xs",
                                  fieldState.error &&
                                    "border-destructive text-destructive"
                                )}
                                action={
                                  <button
                                    type="button"
                                    className={
                                      fieldState.error ? "text-destructive" : ""
                                    }
                                  >
                                    <XIcon className="h-3 w-3" />
                                  </button>
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    const textareaRef = useAutoResizeTextarea(field.value);

                    return (
                      <FormItem>
                        <div className="flex flex-col w-[40rem] gap-4 mt-4">
                          <div className="flex gap-4 items-center">
                            <FormLabel className="text-lg font-semibold text-gray-500">
                              Product Description:
                            </FormLabel>
                            <PencilIcon size={16} />
                          </div>
                          <FormControl>
                            <textarea
                              {...field}
                              ref={textareaRef}
                              className="w-full text-gray-500 tracking-wide text-justify bg-transparent border-0 focus:outline-none focus:border-b focus:border-gray-500 resize-none overflow-hidden"
                              style={{ minHeight: "6rem" }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </section>
            </div>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
};

export default ProductEditView;
