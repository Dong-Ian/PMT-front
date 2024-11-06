// CardComponent.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../type/MainType";

interface CardProps {
  card: Card;
}

const CardComponent: React.FC<CardProps> = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0.5rem",
    marginBottom: "0.5rem",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {card.content}
    </div>
  );
};

export default CardComponent;
