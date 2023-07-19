import { css } from "@emotion/react";
import { Position } from "context/DragDropContext";
import { CardData, cardStyle } from "./Card";
import { CardViewer } from "./CardViewer";

type DraggingCardProps = {
  cardData: CardData;
  position: Position;
};

export const DraggingCard = ({ cardData, position }: DraggingCardProps) => {
  return (
    <div css={draggingCardStyle(position)}>
      <CardViewer cardData={cardData} />
    </div>
  );
};

export const GhostCard = ({ cardData }: { cardData: CardData }) => {
  return (
    <div css={ghostCardStyle}>
      <CardViewer cardData={cardData} />
    </div>
  );
};

const ghostCardStyle = css`
  ${cardStyle}
  opacity: 0.5;
`;

const draggingCardStyle = (position: Position) => css`
  ${cardStyle}
  position: fixed;
  background: white;
  top: ${position.y}px;
  left: ${position.x}px;
`;
