import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typography?: object;
  color: string;
}
export function Text({ typography, color, ...props }: Props) {
  return (
    <span
      css={{
        color,
        ...typography,
      }}
      {...props}
    />
  );
}
