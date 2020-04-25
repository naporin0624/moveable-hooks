import React, { useRef } from "react";
import { useDrag } from "../../src/hooks/useDrag";

import { Container, Card, Text } from "./styles";

type Props = {
  disabled?: boolean;
};

export function Demo(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const container = document.getElementById("custom-container")!;
  const pos = useDrag({ ref, container, disabled: props.disabled });
  const tRef = useRef<HTMLParagraphElement>(null);
  useDrag({ ref: tRef, container });

  return (
    <Container id="custom-container">
      <Text ref={tRef}>{`x: ${pos.x}, y: ${pos.y}`}</Text>
      <Card ref={ref} style={{ top: "30px", left: "30px" }}>
        click!
      </Card>
    </Container>
  );
}
