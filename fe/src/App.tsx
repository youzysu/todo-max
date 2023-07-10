import { Bold700, Medium500 } from "@constants/font";
import styled from "styled-components";
import "./App.css";

export function App() {
  return (
    <div>
      <MyStyledComponentL>Your Text</MyStyledComponentL>
      <MyStyledComponentM>Your Text</MyStyledComponentM>
    </div>
  );
}

const MyStyledComponentL = styled.button`
  ${Bold700.L}
`;

const MyStyledComponentM = styled.div`
  ${Medium500.M}
`;
