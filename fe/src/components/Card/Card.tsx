import { RemoveModal } from "@components/base/RemoveModal";
import { dropShadow, radius } from "@constants/objectStyle";
import { css } from "@emotion/react";
import { useDragDropContext } from "context/DragDropContext";
import { useFetch } from "hooks/useFetch";
import { MouseEventHandler, memo, useRef, useState } from "react";
import { CardEditor } from "./CardEditor";
import { CardViewer } from "./CardViewer";

export interface CardData {
  cardId: number;
  cardTitle: string;
  cardContent: string;
  writer: string;
}

interface CardProps {
  cardData: CardData;
  onCardChanged: () => void;
}

export const Card = memo(({ cardData, onCardChanged }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { startDrag, draggingCard } = useDragDropContext();
  const isDragging = draggingCard.cardId === cardData.cardId;

  const [status, setStatus] = useState<"viewer" | "editor">("viewer");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { fetch: fetchDelete } = useFetch({
    url: `/api/cards/${cardData.cardId}`,
    method: "delete",
  });

  const onClickEdit = () => setStatus("editor");
  const exitEdit = () => setStatus("viewer");

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const onSubmit = () => {
    onCardChanged();
    exitEdit();
  };

  const handleMouseDown: MouseEventHandler = (e) => {
    if (e.target instanceof Element && e.target.closest("button")) {
      return;
    }

    const cardRect = cardRef.current?.getBoundingClientRect();
    const startPosition = { x: cardRect?.x || 0, y: cardRect?.y || 0 };

    startDrag({ cardData: cardData, startPosition: startPosition });
  };

  const onClickRemove = async () => {
    await fetchDelete();
    onCardChanged();
  };

  return (
    <div
      ref={cardRef}
      css={[cardStyle, isDragging && { display: "none" }]}
      onMouseDown={handleMouseDown}
    >
      {status === "viewer" ? (
        <>
          <CardViewer
            onClickEdit={onClickEdit}
            onClickRemove={openModal}
            cardData={cardData}
          />
          <RemoveModal
            isOpen={isOpenModal}
            removeHandler={onClickRemove}
            closeHandler={closeModal}
            text={"카드 삭제"}
          />
        </>
      ) : (
        <CardEditor
          cardData={cardData}
          type="edit"
          onCancel={exitEdit}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
});

export const cardStyle = css`
  width: 300px;
  height: 88px;
  padding: 16px;
  ${radius.radius8}
  ${dropShadow.normal}
`;
