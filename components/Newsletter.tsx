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
    <section className="bg-teal-600 py-20">
      <div className="container mx-auto px-4">
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
          <p className="text-teal-100 mb-8">
            Subscribe to our newsletter for the latest health tips, news, and
            exclusive offers.
          </p>
          {subscribed ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-teal-600 font-semibold text-xl">
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
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button
                type="submit"
                className="bg-white text-teal-600 px-6 py-3 rounded-md font-semibold hover:bg-teal-100 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && (
            <p className="mt-4 text-red-200 bg-red-600 p-2 rounded">{error}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
