"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { quotes } from "@/quotes";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = quotes
      .filter((q) =>
        q.topic.toLowerCase().includes(topic.toLowerCase()) ||
        q.text.toLowerCase().includes(topic.toLowerCase())
      )
      .slice(0, 3)
      .map((q) => q.text);
    setFilteredQuotes(result);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          ✨ Quote Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Type any word or topic (e.g. love)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="text-black"
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500"
          >
            Show Quotes
          </Button>
        </form>

        <AnimatePresence>
          {filteredQuotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {filteredQuotes.map((quote, index) => (
                <motion.p
                  key={index}
                  className="bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  ➤ {quote}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
