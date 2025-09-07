import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode | string;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2 text-brand-950">{title}</h3>
      <p className="text-gray-700 dark:text-brand-900">{description}</p>
    </div>
  );
};

export default Card;
