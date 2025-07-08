"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { quotes } from "@/quotes";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = quotes
      .filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3)
      .map((q) => q.text);
    setFilteredQuotes(result);
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter a topic (e.g. life)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Get Quotes</Button>
      </form>

      <div className="space-y-2">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote, i) => <p key={i}>➤ {quote}</p>)
        ) : (
          <p className="text-muted">No quotes yet.</p>
        )}
      </div>
    </main>
  );
}
