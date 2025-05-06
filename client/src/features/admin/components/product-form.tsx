import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { useAdminProductsStore } from "../stores/admin-products-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePlusIcon, ImagesIcon, PlusIcon, XIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CategoryBadge } from "@/components/category-badge";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductFormSchema } from "@/features/products/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useCreateProduct } from "@/features/products/product-hooks";

export default function ProductForm() {
  const { isOpen, setIsOpen } = useAdminProductsStore();
  const { mutate } = useCreateProduct();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [category, SetCategory] = useState<string>("");

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

  const submitHandler = (values: z.infer<typeof ProductFormSchema>) => {
    const formData = new FormData();

    formData.set("productName", values.productName);
    formData.set("brand", values.brand);
    formData.set("description", values.description);
    formData.set("price", values.price.toString());

    for (const image of values.images) {
      formData.append("images[]", image, image.name);
    }

    console.log(formData.getAll("images[]"));

    for (const category of values.categories) {
      formData.append("categories[]", category);
    }

    mutate(formData);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-10 "
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[95%] sm:w-full max-w-3/5"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitHandler)}
                encType="multipart/form-data"
              >
                <div className="bg-white px-4 pt-5 pb-8 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                      <div className="flex gap-4">
                        <div className="rounded-full grid place-content-center bg-blue-50 w-14 h-14 text-blue-500">
                          <FilePlusIcon />
                        </div>

                        <div>
                          <Label className="text-base font-semibold text-gray-700">
                            Add New Product
                          </Label>

                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Please provide all the details related to the
                              product.
                            </p>
                          </div>
                        </div>
                      </div>

                      <section className="py-8 flex flex-col w-full gap-8">
                        <div className="flex gap-8 h-fit">
                          <div className="flex flex-col gap-4 w-[30rem]">
                            <FormField
                              control={form.control}
                              name="images"
                              render={({ field, fieldState }) => (
                                <FormItem className="grid gap-2">
                                  <FormLabel>Product Images</FormLabel>
                                  <FormControl>
                                    <div
                                      className={cn(
                                        "relative overflow-hidden grid place-content-center h-[12rem] rounded-md border-dashed border",
                                        fieldState.error
                                          ? "border-destructive text-destructive bg-red-50"
                                          : "border-primary text-primary bg-blue-50"
                                      )}
                                    >
                                      {imagePreviews.length <= 0 ? (
                                        <div className="absolute grid gap-2 place-items-center place-self-center">
                                          <ImagesIcon className="h-10 w-10" />
                                          <Label className="cursor-pointer">
                                            Drag & Drop or Choose files
                                          </Label>
                                          <FormDescription>
                                            Supports jpeg, jpg, png
                                          </FormDescription>
                                        </div>
                                      ) : (
                                        <div
                                          className={cn(
                                            "p-4 gap-2 grid place-items-center",
                                            imagePreviews.length === 1
                                              ? "place-items-center"
                                              : imagePreviews.length === 2
                                              ? "grid-cols-2"
                                              : "grid-cols-3"
                                          )}
                                        >
                                          {imagePreviews.map((image, index) => (
                                            <img
                                              key={index}
                                              src={image}
                                              className="w-full h-full object-cover rounded-md"
                                              alt={`Preview ${index + 1}`}
                                            />
                                          ))}
                                        </div>
                                      )}

                                      <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="absolute w-full h-full z-50 opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                          field.onChange(e.target.files);
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Separator className="my-2" />

                            <FormField
                              control={form.control}
                              name="productName"
                              render={({ field }) => (
                                <FormItem className="grid gap-2">
                                  <FormLabel>Product Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="text" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="brand"
                              render={({ field }) => (
                                <FormItem className="grid gap-2">
                                  <FormLabel>Brand</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="text" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem className="grid gap-2">
                                  <FormLabel>Price</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      step="0.01"
                                      onChange={(e) =>
                                        field.onChange(e.target.valueAsNumber)
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="categories"
                              render={({ field, fieldState }) => (
                                <FormItem className="grid gap-2">
                                  <FormLabel>Categories</FormLabel>
                                  <FormControl>
                                    <div className="space-y-2">
                                      <div
                                        className={cn(
                                          "flex gap-2 border rounded-md p-1",
                                          fieldState.error &&
                                            "border-destructive"
                                        )}
                                      >
                                        <Input
                                          value={category}
                                          onChange={(e) =>
                                            SetCategory(e.target.value)
                                          }
                                          className={cn(
                                            "w-full border-0 focus-visible:ring-0",
                                            fieldState.error &&
                                              "text-destructive placeholder:text-destructive/50"
                                          )}
                                          type="text"
                                          placeholder="Add a category..."
                                        />
                                        <Button
                                          type="button"
                                          variant={
                                            fieldState.error
                                              ? "destructive"
                                              : "default"
                                          }
                                          onClick={appendCategory}
                                        >
                                          <PlusIcon className="h-4 w-4" />
                                        </Button>
                                      </div>

                                      <div className="flex flex-wrap gap-2">
                                        {form
                                          .getValues("categories")
                                          .map((cat, index) => (
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
                                                  onClick={() =>
                                                    removeCategory(index)
                                                  }
                                                  className={
                                                    fieldState.error
                                                      ? "text-destructive"
                                                      : ""
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
                          </div>

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="flex flex-col gap-2 w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    className="w-full h-full resize-none min-h-[120px]"
                                    placeholder="Enter product description..."
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 gap-4 px-4 pb-4 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button type="submit">Create</Button>
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    variant={"secondary"}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
