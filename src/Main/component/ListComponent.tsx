// ListComponent.tsx
import React from "react";
import { List } from "../type/MainType";
import CardComponent from "./CardComponent"; // 카드 렌더링 컴포넌트

interface ListProps {
  list: List;
}

const ListComponent: React.FC<ListProps> = ({ list }) => {
  return (
    <div
      style={{
        margin: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <h3>{list.title}</h3>
      {list.cards.map((card) => (
        <CardComponent key={card.id} card={card} />
      ))}
    </div>
  );
};

export default ListComponent;
