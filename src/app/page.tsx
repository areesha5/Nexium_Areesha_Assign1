"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { quotes } from "@/quotes";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleCategoryClick = (category: string) => {
    setTopic(category);
    const result = quotes
      .filter((q) =>
        q.topic.toLowerCase().includes(category.toLowerCase()) ||
        q.text.toLowerCase().includes(category.toLowerCase())
      )
      .slice(0, 3)
      .map((q) => q.text);
    setFilteredQuotes(result);
  };

  const handleCopy = async (quote: string, index: number) => {
    await navigator.clipboard.writeText(quote);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main className="max-w-md mx-auto mt-20 p-4 space-y-6 text-center">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter a topic or keyword"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Search Quotes</Button>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {["Life", "Love", "Success", "Happiness", "Motivation"].map((cat) => (
          <Button
            key={cat}
            variant="secondary"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <AnimatePresence>
        {filteredQuotes.length > 0 && (
          <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {filteredQuotes.map((quote, i) => (
              <motion.div
                key={i}
                className="bg-gray-100 p-4 rounded-lg shadow"
                whileHover={{ scale: 1.02 }}
              >
                <p>➤ {quote}</p>
                <Button
                  className="mt-2"
                  size="sm"
                  onClick={() => handleCopy(quote, i)}
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
