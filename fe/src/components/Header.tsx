import { COLOR_VARIANTS } from "@constants/colors";
import { useState } from "react";
import ActionHistoryList from "./ActionHistoryList";
import { Button } from "./base/Button";
import { HistoryIcon } from "./icon/HistoryIcon";

export const Header = () => {
  const [isOpenActionHistory, setIsOpenActionHistory] = useState(false);

  const openActionHistory = () => setIsOpenActionHistory(true);
  const closeActionHistory = () => setIsOpenActionHistory(false);

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <div>오직 너만을 위한 투두리스트 TODO LIST ONLY FOR YOU</div>
      <Button pattern="icon" onClick={openActionHistory}>
        <HistoryIcon size={24} rgb={COLOR_VARIANTS.textDefault} />
      </Button>
      {isOpenActionHistory && (
        <ActionHistoryList onClose={closeActionHistory} />
      )}
    </div>
  );
};
