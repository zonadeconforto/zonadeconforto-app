"use client";

import SignupForm from "@/shared/components/SignupForm";
import SignupHeader from "@/shared/components/SignupHeader";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <SignupHeader />
        <SignupForm />
      </motion.div>
    </div>
  );
}
