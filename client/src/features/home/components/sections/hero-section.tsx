import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-2xl pt-54 relative z-20">
      <div className="flex justify-center">
        <div className="relative rounded-full mb-6 px-3 py-1 text-sm/6 w-fit text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Latest medical supplies available.
          <Link to="#" className="font-semibold text-sky-600">
            <span className="absolute inset-0" aria-hidden="true"></span>
            See what's new <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-6xl p-4 lg:text-[4.8rem] font-semibold tracking-tight text-balance text-gray-900">
          Trusted Medical Supplies,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Delivered!
          </span>
        </h1>
        <p className="mt-2 px-8 text-sm font-medium text-pretty text-gray-500 sm:text-xl/8">
          Order high-quality medical supplies with ease and get them delivered
          to your hospital or clinic on time.
        </p>
        <div className="mt-16 flex items-center justify-center gap-x-6">
          <Link
            to="/products"
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs bg-gradient-to-r to-emerald-600 from-sky-400"
          >
            See Products
          </Link>
          <Link to="#" className="text-sm/6 font-semibold text-gray-900">
            Create Custom <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
