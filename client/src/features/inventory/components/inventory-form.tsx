import Modal from "@/components/modal";
import { useInventoryStore } from "../store";
import ModalLayout from "@/layouts/modal-layout";
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

import { useFetchProducts } from "@/features/products/api/query";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
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
import { Form } from "@/components/ui/form";

const InventoryForm = () => {
  const { isOpen, setIsOpen } = useInventoryStore();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date>();

  const { data: products } = useFetchProducts();

  return (
    <Modal variant="sm" isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form>
        <form>
          <ModalLayout
            heading="Add New Item"
            subHeading="Please fill all fields required to create an item."
            icon={PackagePlusIcon}
          >
            <div className="px-4 py-8 grid gap-8">
              <div className="grid gap-2 w-full">
                <Label>Select From Products</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between"
                    >
                      {value
                        ? products?.find(
                            (product) => product.productName === value
                          )?.productName
                        : "----"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[25rem]">
                    <Command>
                      <CommandInput
                        placeholder="Search"
                        className="h-9 w-full"
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {products?.map((product) => (
                            <CommandItem
                              key={product.productId}
                              value={product.productName}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              {product.productName}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  value === product.productName
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
              </div>

              <div className="grid gap-2">
                <Label>Quantity</Label>
                <Input type="number" />
              </div>

              <div className="flex gap-4">
                <div className="grid gap-2">
                  <Label>Unit</Label>
                  <Input />
                </div>

                <div className="grid gap-2">
                  <Label>Unit Abbreviation</Label>
                  <Input />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[25rem] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="flex w-[25rem] flex-col space-y-2 p-2"
                  >
                    <Select
                      onValueChange={(value) =>
                        setDate(addDays(new Date(), parseInt(value)))
                      }
                    >
                      <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                        <SelectItem value="30">In a month</SelectItem>
                        <SelectItem value="365">In a Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md flex justify-center border">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
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
