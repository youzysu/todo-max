import { Header } from "@components/Header";
import { Main } from "@components/Main";
import { DragDropProvider } from "context/DragDropContext";

export function App() {
  return (
    <div
      css={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <DragDropProvider>
        <Main />
      </DragDropProvider>
    </div>
  );
}
