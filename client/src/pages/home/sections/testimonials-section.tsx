import React from "react";
import SectionHeader from "../components/section-header";
import TestimonialCard from "../components/testimonial-card";

// Define TypeScript types for the testimonials
interface Testimonial {
  statement: string;
  name: string;
  image: string;
  email: string;
  featured: boolean;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    statement: "Laborum quis quam. Dolorum et ut quod quia.",
    name: "Leslie Alexander",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "@lesliealexander",
    featured: false,
  },
  {
    statement: `Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes
                vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis
                blandit vel et proin. Non hendrerit in vel ac diam.`,
    name: "Brenna Goyette",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "@brennagoyette",
    featured: true,
    company: "SavvyCal",
  },
  {
    statement: "Quia dolorem qui et. Atque quo aliquid sit eos officia.",
    name: "Michael Foster",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "@michaelfoster",
    featured: false,
  },
  {
    statement: "Consequatur et atque. Itaque nostrum molestia.",
    name: "Dries Vincent",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    email: "@driesvincent",
    featured: false,
  },
  {
    statement: "Aliquid dolore praesentium ratione.",
    name: "Whitney Francis",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    email: "@whitneyfrancis",
    featured: false,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="p-4 flex items-center flex-col gap-8 mb-32">
      <SectionHeader
        section="Testimonials"
        heading="We have worked with many respectable hospitals."
        description=""
      />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            image={testimonial.image}
            email={testimonial.email}
            isFeatured={testimonial.featured}
            company={testimonial.company ?? ""}
            statement={testimonial.statement}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
