import React from "react";

const logos = [
  {
    src: "https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg",
    alt: "Transistor",
  },
  {
    src: "https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg",
    alt: "Reform",
  },
  {
    src: "https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg",
    alt: "Tuple",
  },
  {
    src: "https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg",
    alt: "SavvyCal",
  },
  {
    src: "https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg",
    alt: "Statamic",
  },
];

const TrustedHospitals: React.FC = () => {
  return (
    <div className="py-16 overflow-hidden">
      <div className="mx-auto relative max-w-7xl flex flex-col h-[6rem] md:h-[10rem] justify-center items-center">
        <h2 className="text-center text-xs md:text-sm absolute top-0 leading-8 font-semibold text-gray-900">
          Trusted by the most reliable hospitals in Bicol
        </h2>

        <div className="bottom-0 w-full overflow-hidden absolute grid place-items-center backdrop-blur-md bg-primary-foreground/20 border-b border-primary-foreground/10">
          <div className="p-4 whitespace-nowrap animate-scroll flex gap-x-8 items-center ">
            {logos.map((logo, index) => (
              <img
                key={index}
                className="w-20 md:w-28 lg:w-32"
                src={logo.src}
                alt={logo.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedHospitals;
