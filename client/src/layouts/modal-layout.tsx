import { Label } from "@radix-ui/react-dropdown-menu";
import { LucideProps } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalLayoutProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  heading: string;
  subHeading: string;
  children: ReactNode;
}

const ModalLayout = ({
  heading,
  icon: Icon,
  subHeading,
  children,
}: ModalLayoutProps) => {
  return (
    <div className="bg-white px-4 pt-5 pb-8 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
          <div className="flex gap-4">
            <div className="rounded-full grid place-content-center bg-blue-50 w-14 h-14 text-blue-500">
              <Icon />
            </div>

            <div>
              <Label className="text-base font-semibold text-gray-700">
                {heading}
              </Label>

              <div className="mt-2">
                <p className="text-sm text-gray-500">{subHeading}</p>
              </div>
            </div>
          </div>

          <section className="w-full h-full">{children}</section>
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
