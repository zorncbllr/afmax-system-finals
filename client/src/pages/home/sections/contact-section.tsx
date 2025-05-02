import React from "react";
import SectionHeader from "../components/section-header";

const ContactSection: React.FC = () => {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeader
        section="Contact"
        heading="Getting in Touch"
        description="We’d love to hear from you. Please fill out this form or shoot us an email."
      />

      <div className="flex justify-center gap-8 mb-[10rem]">
        <div className="grid gap-2 p-4">
          <div className="p-2 shadow-sm bg-gray-700 rounded-lg" />
          <div className="grid gap-2 grid-cols-2">
            <div className="p-2 shadow-sm w-[20rem] bg-gray-700 rounded-lg" />
            <div className="p-2 shadow-sm w-[20rem] bg-gray-700 rounded-lg" />
          </div>
          <div className="p-2 shadow-sm bg-gray-700 rounded-lg" />
        </div>

        <div>
          <div className="w-[28rem] grid place-content-center h-[55rem] bg-gray-700 rounded-4xl relative">
            <div className="absolute w-[2rem] bg-gray-700 h-[10rem] -right-1 top-[10rem] z-0 rounded-r-md" />
            <div className="absolute w-[2rem] bg-gray-700 h-[4rem] -right-1 top-[22rem] z-0 rounded-r-md" />
            <div className="w-[26rem] h-[53rem] rounded-2xl bg-gray-900 overflow-hidden z-10">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                title="map"
                marginHeight={0}
                marginWidth={0}
                scrolling="no"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Tiwi+Albay&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
