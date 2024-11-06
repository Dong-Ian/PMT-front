import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { initialData, Card, List, Board } from "../type/MainType";
import styles from "../style/main.module.css";
import ListComponent from "../component/ListComponent";

const MainPage: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialData);

  // 드래그 종료 시 처리할 함수
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceListIndex = board.lists.findIndex((list) =>
      list.cards.some((card) => card.id === active.id)
    );
    const targetListIndex = board.lists.findIndex((list) =>
      list.cards.some((card) => card.id === over.id)
    );

    if (sourceListIndex === -1 || targetListIndex === -1) return;

    const sourceList = board.lists[sourceListIndex];
    const targetList = board.lists[targetListIndex];

    if (sourceList === targetList) {
      // 같은 리스트 내에서 카드 순서 변경
      const updatedCards = arrayMove(
        sourceList.cards,
        sourceList.cards.findIndex((card) => card.id === active.id),
        targetList.cards.findIndex((card) => card.id === over.id)
      );

      const updatedLists = [...board.lists];
      updatedLists[sourceListIndex] = { ...sourceList, cards: updatedCards };

      setBoard({ lists: updatedLists });
    } else {
      // 다른 리스트로 카드 이동
      const sourceCards = [...sourceList.cards];
      const targetCards = [...targetList.cards];
      const [movedCard] = sourceCards.splice(
        sourceList.cards.findIndex((card) => card.id === active.id),
        1
      );

      targetCards.splice(
        targetList.cards.findIndex((card) => card.id === over.id),
        0,
        movedCard
      );

      const updatedLists = [...board.lists];
      updatedLists[sourceListIndex] = { ...sourceList, cards: sourceCards };
      updatedLists[targetListIndex] = { ...targetList, cards: targetCards };

      setBoard({ lists: updatedLists });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.outer_container}>
        <div className={styles.main_container}>
          {board.lists.map((list) => (
            <SortableContext
              key={list.id}
              items={list.cards.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <ListComponent list={list} />
            </SortableContext>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default MainPage;
