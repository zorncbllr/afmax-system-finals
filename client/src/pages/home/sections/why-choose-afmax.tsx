import React from "react";
import FastDelivery from "@/assets/fast-delivery-blue.svg";
import DeliveryTruck from "@/assets/delivery-truck.svg";
import WideRange from "@/assets/wide-range.svg";
import Secure from "@/assets/secure.svg";

const WhyChooseAfmax: React.FC = () => {
  return (
    <section className="my-24">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-balance text-gray-900 text-center">
          Why Choose
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            AFMAX
          </span>
          Marketing?
        </h1>

        <p className="text-lg font-medium text-center max-w-2xl text-gray-600">
          At Afmax, we provide high-quality medical supplies with fast delivery,
          secure payments, and competitive pricing.
        </p>
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
              <div className="relative flex h-full gap-4 flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Fast & Reliable Delivery
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    We ensure timely delivery so hospitals and clinics never run
                    out of essential supplies.
                  </p>
                </div>

                <img
                  width="150"
                  className="absolute left-2 z-40 translate-y-56"
                  src={FastDelivery}
                  alt=""
                />
                <img
                  width="2000"
                  className="absolute -left-4 z-40 translate-y-80"
                  src={DeliveryTruck}
                  alt=""
                />
                <div>
                  <div className="absolute top-40 w-[25rem] -left-20 grid place-content-center h-[40rem] bg-gray-700 rounded-4xl">
                    <div className="absolute w-[2rem] bg-gray-700 h-[10rem] -right-1 top-[10rem] z-0 rounded-r-md" />
                    <div className="absolute w-[2rem] bg-gray-700 h-[4rem] -right-1 top-[21rem] z-0 rounded-r-md" />
                    <div className="w-[23rem] overflow-hidden h-[38rem] rounded-2xl bg-gray-900 z-10" />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]" />
            </div>

            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Wide Range of Medical Supplies
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    From surgical tools to protective equipment, we offer a
                    comprehensive selection to meet all medical needs.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img className="w-full" src={WideRange} alt="" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Secure Payment & Processing
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Our platform uses industry-leading encryption and secure
                    gateways to protect your transactions.
                  </p>
                </div>
                <div className="flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    className="h-[min(152px,40cqw)] -translate-x-5 object-cover"
                    src={Secure}
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
            </div>

            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Trusted by Hospitals & Clinics
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Healthcare professionals across the industry rely on Afmax
                    for quality and consistency.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          Hospitals
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">
                          Clinics
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14" />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAfmax;
