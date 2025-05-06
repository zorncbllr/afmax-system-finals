import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { useAdminProductsStore } from "../stores/admin-products-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePlusIcon, ImagesIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProductForm() {
  const { isOpen, setIsOpen } = useAdminProductsStore();

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
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                          Please provide all the details related to the product.
                        </p>
                      </div>
                    </div>
                  </div>

                  <section className="py-8 flex flex-col w-full gap-8">
                    <div className="flex gap-8 h-fit">
                      <div className="flex flex-col gap-4 w-[30rem]">
                        <div className="grid gap-2">
                          <Label>Product Images</Label>
                          <div className="relative grid place-content-center h-[12rem] bg-blue-50 rounded-md border-dashed border border-blue-500 text-blue-500">
                            <div className="absolute grid gap-2 place-items-center place-self-center">
                              <ImagesIcon size={40} />
                              <Label>Drag & Drop or Choose files</Label>
                              <CardDescription>
                                Supports jpeg, jpg, png
                              </CardDescription>
                            </div>

                            <input
                              className="absolute w-full h-full z-50 placeholder-transparent text-transparent "
                              type="file"
                            />
                          </div>
                        </div>

                        <Separator className="my-2" />

                        <div className="grid gap-2">
                          <Label>Product Name</Label>
                          <Input />
                        </div>

                        <div className="grid gap-2">
                          <Label>Brand</Label>
                          <Input />
                        </div>

                        <div className="grid gap-2">
                          <Label>Price</Label>
                          <Input />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Label>Description</Label>
                        <Textarea className="w-full h-full resize-none"></Textarea>
                      </div>
                    </div>

                    <div className="grid gap-2 w-1/2">
                      <Label>Categories</Label>
                      <Input />
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 gap-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button onClick={() => setIsOpen(false)}>Create</Button>
              <Button onClick={() => setIsOpen(false)} variant={"secondary"}>
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
