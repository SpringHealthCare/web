"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { ref, push } from "firebase/database";
import { database } from "@/firebaseConfig";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const emailsRef = ref(database, "newsletter-emails");
      await push(emailsRef, { email, timestamp: Date.now() });
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Error saving email to Firebase:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-[#04c7d0] py-20 relative">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20px 20px, white 2px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Stay Informed with Our Newsletter
          </h2>
          <p className="text-gray-100 mb-8">
            Subscribe to our newsletter for the latest health tips, news, and
            exclusive offers.
          </p>
          {subscribed ? (
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <p className="text-[#04c7d0] font-semibold text-xl">
                Thank you for subscribing!
              </p>
              <p className="text-gray-600 mt-2">
                We&apos;ll keep you updated with our latest news and health tips.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#04c7d0]/50 shadow-lg"
              />
              <button
                type="submit"
                className="bg-white text-[#04c7d0] px-6 py-3 rounded-md font-semibold 
                         hover:bg-[#04c7d0] hover:text-white transition-all duration-300 shadow-lg
                         border-2 border-white"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && (
            <p className="mt-4 text-white bg-red-500/80 p-2 rounded">{error}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
