import { Card, CardData } from "@components/Card/Card";
import { GhostCard } from "@components/Card/DraggingCard";
import { NewCard } from "@components/Card/NewCard";
import { css } from "@emotion/react";
import { useDragDropContext } from "context/DragDropContext";
import React, { useState } from "react";
import { ColumnHeader } from "./ColumnHeader";

export interface ColumnInfo {
  columnId: number;
  columnIndex: number;
  columnName: string;
  cards: CardData[];
}

interface ColumnProps extends ColumnInfo {
  onCardChanged: () => void;
}

export const Column = ({
  columnId,
  columnIndex,
  columnName,
  cards,
  onCardChanged,
}: ColumnProps) => {
  const { ghostInfo, draggingCard } = useDragDropContext();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const onAddCardClick = () => setIsAdding((prev) => !prev);
  const onAddCancelClick = () => setIsAdding(false);

  const cardCount = cards.length;
  const isGhostLastPosition =
    ghostInfo.columnIndex === columnIndex && ghostInfo.cardIndex === cardCount;

  return (
    <div css={columnStyle}>
      <ColumnHeader
        columnId={columnId}
        columnName={columnName}
        cardCount={cardCount}
        onAddCardClick={onAddCardClick}
        onCardChanged={onCardChanged}
      />
      {isAdding && (
        <NewCard
          columnId={columnId}
          onAddCancelClick={onAddCancelClick}
          onCardChanged={onCardChanged}
        />
      )}
      {cards.map((cardData, index) => {
        const isGhostPosition =
          ghostInfo.columnIndex === columnIndex &&
          ghostInfo.cardIndex === index;

        return (
          <React.Fragment key={`${index}_${cardData.cardId}`}>
            {isGhostPosition && <GhostCard cardData={draggingCard}></GhostCard>}
            <Card cardData={cardData} onCardChanged={onCardChanged} />
          </React.Fragment>
        );
      })}
      {isGhostLastPosition && <GhostCard cardData={draggingCard}></GhostCard>}
    </div>
  );
};

const columnStyle = css({
  width: "332px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
