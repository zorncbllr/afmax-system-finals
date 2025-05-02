import React from "react";

type SectionHeaderProps = {
  section: string;
  heading: string;
  description: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  section,
  heading,
  description,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="font-semibold text-sky-600">
        {section} <span aria-hidden="true">&rarr;</span>
      </p>

      <h1 className="text-2xl font-semibold tracking-tight text-balance text-gray-900 text-center">
        {heading}
      </h1>

      <p className="text-lg font-medium text-center max-w-2xl text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
