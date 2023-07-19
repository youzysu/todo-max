import { CardData } from "@components/Card/Card";
import { createContext, useCallback, useContext, useState } from "react";

export type Position = { x: number; y: number };

type GhostInfo = {
  columnIndex: number;
  cardIndex: number;
};

type StartDrag = ({
  cardData,
  startPosition,
}: {
  cardData: CardData;
  startPosition: Position;
}) => void;

type DragDropState = {
  isDragging: boolean;
  draggingCard: CardData;
  position: Position | null;
  ghostInfo: GhostInfo;
  startDrag: StartDrag;
  moveDragging: (position: Position) => void;
  stopDrag: () => void;
  moveGhost: (ghostInfo: GhostInfo) => void;
};

const initialState: DragDropState = {
  isDragging: false,
  draggingCard: {
    cardId: -1,
    cardTitle: "",
    cardContent: "",
    writer: "",
  },
  position: null,
  ghostInfo: {
    cardIndex: -1,
    columnIndex: -1,
  },
  startDrag: () => {},
  moveDragging: () => {},
  stopDrag: () => {},
  moveGhost: () => {},
};

const DragDropContext = createContext(initialState);

export const DragDropProvider = ({ children }: { children: any }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingCard, setDraggingCard] = useState<CardData>(
    initialState.draggingCard
  );
  const [position, setPosition] = useState<Position | null>(null);
  const [ghostInfo, setGhostInfo] = useState<GhostInfo>(initialState.ghostInfo);

  const startDrag: StartDrag = useCallback(({ cardData, startPosition }) => {
    setIsDragging(true);
    setPosition(startPosition);
    setDraggingCard(cardData);
  }, []);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
    setGhostInfo(initialState.ghostInfo);
    setDraggingCard(initialState.draggingCard);
    setPosition(null);
  }, []);

  const moveDragging = useCallback((position: Position) => {
    setPosition((prev) => {
      return prev && { x: prev.x + position.x, y: prev.y + position.y };
    });
  }, []);

  const moveGhost = useCallback((newGhostInfo: GhostInfo) => {
    const isSameColumnIndex =
      newGhostInfo.columnIndex === ghostInfo.columnIndex;
    const isSameCardIndex = newGhostInfo.cardIndex === ghostInfo.cardIndex;

    if (isSameColumnIndex && isSameCardIndex) {
      return;
    }

    setGhostInfo(newGhostInfo);
  }, []);

  return (
    <DragDropContext.Provider
      value={{
        isDragging,
        draggingCard,
        position,
        ghostInfo,
        startDrag,
        moveDragging,
        stopDrag,
        moveGhost,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};

export const useDragDropContext = () => {
  return useContext(DragDropContext);
};
