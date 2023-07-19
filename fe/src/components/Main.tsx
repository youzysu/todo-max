import { css } from "@emotion/react";
import { useDragDropContext } from "context/DragDropContext";
import { useFetch } from "hooks/useFetch";
import { MoveCardBodyType } from "mocks/handlers";
import { MouseEventHandler, useRef, useState } from "react";
import { DraggingCard } from "./Card/DraggingCard";
import Column from "./Column";
import { ColumnInfo } from "./Column/Column";
import { FAB } from "./FAB";

export const Main = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const {
    isDragging,
    draggingCard,
    moveDragging,
    position,
    stopDrag,
    moveGhost,
    ghostInfo,
  } = useDragDropContext();

  const [cardPositionInfo, setCardPositionInfo] = useState<MoveCardBodyType>({
    changedColumnId: 0,
    topCardId: null,
    bottomCardId: null,
  });

  const {
    response: columnList,
    fetch: fetchColumnList,
  }: { response: ColumnInfo[]; fetch: () => void } = useFetch({
    url: "/api/columns",
    method: "get",
    autoFetch: true,
  });

  const { fetch: fetchCardPatch } = useFetch({
    url: `/api/cards/${draggingCard.cardId}`,
    method: "patch",
    body: cardPositionInfo,
  });

  const updateCardPositionInfo = () => {
    const currentColumnId = columnList[ghostInfo.columnIndex].columnId;
    const currentCards = columnList[ghostInfo.columnIndex].cards;

    const topCardId =
      ghostInfo.cardIndex > 0
        ? currentCards[ghostInfo.cardIndex - 1].cardId
        : null;

    const bottomCardId =
      ghostInfo.cardIndex < currentCards.length ||
      ghostInfo.cardIndex === currentCards.length - 1
        ? currentCards[ghostInfo.cardIndex].cardId
        : null;

    const cardMovePositionInfo = {
      changedColumnId: currentColumnId,
      topCardId: topCardId,
      bottomCardId: bottomCardId,
    };

    setCardPositionInfo(cardMovePositionInfo);
  };

  const handleMouseUp: MouseEventHandler = async () => {
    if (!isDragging) {
      return;
    }

    stopDrag();
    updateCardPositionInfo();

    await fetchCardPatch();
    onCardChanged();
  };

  const onCardChanged = () => fetchColumnList();

  const handleMouseMove: MouseEventHandler = (e) => {
    if (!isDragging) {
      return;
    }

    const movePosition = { x: e.movementX, y: e.movementY };
    moveDragging(movePosition);

    // TODO: 고정값 아닐 때도 가능하도록 추상화 필요
    const columnValue = {
      width: 332,
      margin: 24,
    };
    const cardValue = {
      height: 88,
      margin: 10,
    };

    const mousePos = { x: e.clientX, y: e.clientY };
    const mainRect = mainRef.current && mainRef.current.getBoundingClientRect();
    if (!mainRect) {
      return;
    }

    const columnIndex = Math.floor(
      (mousePos.x - mainRect.left) / (columnValue.width + columnValue.margin)
    );
    const currentColumn = columnList[columnIndex];
    if (!currentColumn) {
      return;
    }

    const cardIndex = Math.min(
      Math.floor(
        (mousePos.y - mainRect.top) / (cardValue.height + cardValue.margin)
      ),
      currentColumn.cards.length
    );

    moveGhost({ columnIndex, cardIndex });
  };

  return (
    <div
      ref={mainRef}
      css={mainStyle}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {columnList &&
        columnList.map(({ columnId, columnName, cards }, index) => (
          <Column
            key={columnId}
            columnIndex={index}
            columnId={columnId}
            columnName={columnName}
            cards={cards}
            onCardChanged={onCardChanged}
          />
        ))}
      <FAB onColumnChanged={onCardChanged} />
      {draggingCard && position && (
        <DraggingCard cardData={draggingCard} position={position} />
      )}
    </div>
  );
};

const mainStyle = css({
  display: "flex",
  gap: "24px",
  width: "1280px",
  overflowX: "scroll",
});
