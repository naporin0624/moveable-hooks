# useDrag

React mouse and touch drag hook

## Usage

```typescript
import React, { useRef } from "react";
import { useDrag } from "moveable-hooks";

export function Example() {
  const ref = useRef(null);
  const container = document.querySelector(".container");

  const { x, y } = useDrag({ ref, container });

  return (
    <div className="container">
      <div ref={ref}></div>
    </div>
  )
}
```

## Reference 

```typescript
import { RefObject } from "react";
declare type Props<T extends HTMLElement> = {
    ref: RefObject<T>;
    container?: HTMLElement;
    disabled?: boolean;
};
declare type Pos = {
    x: number;
    y: number;
};
export declare function useDrag<T extends HTMLElement>(props: Props<T>): Pos;
export {};

```