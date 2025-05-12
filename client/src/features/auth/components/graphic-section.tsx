import { motion } from "framer-motion";
import { Link } from "react-router";
import { Truck, ShieldCheck, HeartPulse } from "lucide-react"; // Using Lucide icons
import GridPattern from "@/components/grid-pattern";
import TopGradient from "@/components/top-gradient";
import logo from "@/assets/logo.svg";

import BottomGradient from "@/components/bottom-gradient";

const GraphicSection = () => (
  <div className="bg-white border shadow-xl shadow-blue-100 relative hidden h-full w-full items-center lg:grid lg:w-1/2 overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-0"
    >
      <GridPattern />
      <TopGradient />
      <BottomGradient />
    </motion.div>

    <div className="z-10 flex flex-col items-center justify-center h-full py-12 px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center text-center"
      >
        {/* Enhanced Logo Section */}
        <Link to="/" className="group mb-8 flex gap-4 items-center">
          <motion.img
            whileHover={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 0.6 }}
            width="60"
            src={logo}
            alt="Company Logo"
            className="drop-shadow-lg flex"
          />
          <h1 className="text-start text-5xl font-bold tracking-tighter bg-gradient-to-r from-sky-500 to-emerald-600 bg-clip-text text-transparent">
            AFMAX
            <span className="block text-sm tracking-wide font-normal text-gray-400 mt-1">
              Medical Marketing Solutions
            </span>
          </h1>
        </Link>

        {/* Animated Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-8 w-2/3"
        />

        {/* Feature Icons Grid */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <Truck className="w-12 h-12 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-500">
              24h Delivery
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <ShieldCheck className="w-12 h-12 text-emerald-600 mb-2" />
            <span className="text-sm font-medium text-gray-500">
              Certified Products
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <HeartPulse className="w-12 h-12 text-sky-500 mb-2" />
            <span className="text-sm font-medium text-gray-500">
              Medical Grade
            </span>
          </motion.div>
        </div>

        {/* Enhanced Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <p className="text-2xl text-gray-950 leading-relaxed">
            Empowering Healthcare Through
            <br />
            <span className="font-medium bg-gradient-to-r from-sky-500 to-emerald-600 bg-clip-text text-transparent">
              Reliable Supply Chains
            </span>
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-16 h-px bg-gray-300" />
            Trusted by 500+ medical institutions
            <div className="w-16 h-px bg-gray-300" />
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute bottom-8 right-8 flex items-center gap-2 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        HIPAA Compliant • ISO Certified
      </motion.div>
    </div>
  </div>
);

export default GraphicSection;
