import React from "react";
import Card from "./Card";
import { Check, Wind, Book } from "lucide-react";


const cards = [
  {
    title: "Habits",
    description: "Track and maintain your daily habits to achieve your goals.",
    icon: <Check className="w-12 h-12 text-brand-500" />,
  },
  {
    title: "Meditation",
    description: "Relax and focus your mind with guided meditation sessions.",
    icon: <Wind className="w-12 h-12 text-brand-500" />,
  },
  {
    title: "Quotes",
    description: "Get daily motivational quotes to inspire your journey.",
    icon: <Book className="w-12 h-12 text-brand-500" />,
  },
];

const InfoCards: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default InfoCards;
