"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { quotes } from "@/quotes";
import { motion } from "framer-motion"; // ✅ Import motion

export default function Home() {
  const [topic, setTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = quotes
      .filter((q: { topic: string }) =>
        q.topic.toLowerCase().includes(topic.toLowerCase())
      )
      .slice(0, 3)
      .map((q: { text: string }) => q.text);
    setFilteredQuotes(result);
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-4 space-y-6">
      
      {/* ✅ Animated form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <Input
          type="text"
          placeholder="Enter a topic (e.g. life)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Get Quotes</Button>
      </motion.form>

      <div className="space-y-2">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote, i) => (
            // ✅ Animated quote block
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="text-lg font-medium text-gray-700 bg-white p-3 rounded shadow"
            >
              ➤ {quote}
            </motion.p>
          ))
        ) : (
          <p className="text-muted">No quotes yet.</p>
        )}
      </div>
    </main>
  );
}
