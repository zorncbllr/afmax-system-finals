import React from "react";

interface TestimonialCardProps {
  name: string;
  statement: string;
  email: string;
  image: string;
  company: string;
  isFeatured: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  statement,
  email,
  image,
  company,
  isFeatured,
}) => {
  return (
    <div
      className={`${
        isFeatured
          ? "col-span-1 md:col-span-2 bg-white p-8 rounded-lg shadow-sm"
          : "bg-white text-gray-500 p-6 rounded-lg shadow-sm"
      }`}
    >
      <p className="font-semibold text-gray-700">“{statement}”</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full" src={image} alt="User" />
          <div className="ml-3">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
        {isFeatured && (
          <span className="text-gray-600 font-bold">{company}</span>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
