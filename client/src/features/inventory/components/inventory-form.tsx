import Modal from "@/components/modal";
import ModalLayout from "@/layouts/modal-layout";
import { addDays, format } from "date-fns";
import {
  PackagePlusIcon,
  CalendarIcon,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import useInventoryForm from "../hooks/inventory-form-hook";

const InventoryForm = () => {
  const {
    form,
    products,
    isOpen,
    openDate,
    openSelect,
    setIsOpen,
    setOpenDate,
    setOpenSelect,
    submitHandler,
  } = useInventoryForm();

  return (
    <Modal variant="sm" isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <ModalLayout
            heading="Add New Item"
            subHeading="Please fill all fields required to create an item."
            icon={PackagePlusIcon}
          >
            <div className="px-4 py-8 grid gap-6">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Select From Products</FormLabel>
                    <Popover open={openSelect} onOpenChange={setOpenSelect}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-between"
                            aria-expanded={form.getValues("productId") > 0}
                          >
                            {field.value
                              ? products?.find(
                                  (product) => product.productId === field.value
                                )?.productName
                              : "----"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[25rem]">
                        <Command>
                          <CommandInput
                            placeholder="Search products..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No products found.</CommandEmpty>
                            <CommandGroup>
                              {products?.map((product) => (
                                <CommandItem
                                  key={product.productId}
                                  value={product.productName}
                                  onSelect={() => {
                                    form.setValue(
                                      "productId",
                                      product.productId
                                    );
                                    setOpenSelect(false);
                                    form.clearErrors("productId");
                                  }}
                                >
                                  {product.productName}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      field.value === product.productId
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter quantity"
                          min={0}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter unit (e.g., grams, liters)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="abbreviation"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Unit Abbreviation</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter abbreviation (e.g., kg, mL)"
                            maxLength={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Expiration Date</FormLabel>
                    <Popover open={openDate} onOpenChange={setOpenDate}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[25rem] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                              form.formState.errors?.expiration &&
                                "border-red-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-[25rem] p-2">
                        <Select
                          onValueChange={(value) =>
                            field.onChange(
                              addDays(new Date(), parseInt(value)),
                              setOpenDate(false)
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Quick select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="3">In 3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                            <SelectItem value="30">In a month</SelectItem>
                            <SelectItem value="365">In a year</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border mt-2 flex justify-center">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ModalLayout>

          <div className="bg-gray-50 gap-4 px-10 pb-4 -mt-4 sm:flex sm:flex-row-reverse">
            <Button type="submit">Add Item</Button>
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
    </Modal>
  );
};

export default InventoryForm;
