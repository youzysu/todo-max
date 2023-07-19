import { css } from "@emotion/react";
import { useFetch } from "hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { CardData } from "./Card/Card";
import { CloneCard } from "./Card/CloneCard";
import Column from "./Column";
import { FAB } from "./FAB";

export interface Position {
  x: number;
  y: number;
}

interface Card {
  cardId: number;
  title: string;
  content: string;
  writer: string;
}

interface Column {
  columnId: number;
  columnName: string;
  cards: Card[];
}

export const Main = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({
    columnIndex: -1,
    cardIndex: -1,
  });

  const [initialPosition, setInitialPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [columnList, setColumnList] = useState<Column[]>([]);
  const [cloneCardData, setCloneCardData] = useState<CardData>();
  const [bodyContent, setBodyContent] = useState({});

  const { response, errorMsg, loading, fetch } = useFetch({
    url: "/api/columns",
    method: "get",
    autoFetch: true,
  });

  useEffect(() => {
    response && setColumnList(response);
  }, [response]);

  return (
    <div
      ref={mainRef}
      css={mainStyle}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {columnList &&
        columnList.map(({ columnId, columnName, cards }, index) => (
          <Column
            key={columnId}
            columnId={columnId}
            columnName={columnName}
            cards={cards}
            onCardChanged={onCardChanged}
            setCloneCard={setCloneCard}
            cloneState={{
              hasClone: index === mousePosition.columnIndex,
              cardIndex: mousePosition.cardIndex,
              cloneCardData: cloneCardData,
            }}
          />
        ))}
      {cloneCardData !== undefined && (
        <CloneCard cardData={cloneCardData} initialPosition={initialPosition} />
      )}
      <FAB onColumnChanged={onCardChanged} />
    </div>
  );
};

const mainStyle = css({
  display: "flex",
  gap: "24px",
  width: "1280px",
  overflow: "hidden",
  overflowX: "scroll",
});
