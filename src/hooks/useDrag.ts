import { useEffect, RefObject, useRef, useState } from "react";

type Props<T extends HTMLElement> = {
  ref: RefObject<T>;
  container?: HTMLElement;
  disabled?: boolean;
};

type Pos = {
  x: number;
  y: number;
};

export function useDrag<T extends HTMLElement>(props: Props<T>) {
  const { ref, disabled } = props;
  const container = props?.container ?? document.body;
  const initPosRef = useRef<Pos | null>(null);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });

  // initial action
  useEffect(() => {
    if (disabled) return;

    const style = ref.current?.style;
    if (!style) return;
    style.position = "absolute";

    return () => {
      style.position = "";
    };
  }, [ref, disabled]);

  // lift action
  useEffect(() => {
    if (disabled) return;

    const el = container;
    if (!el) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Element)) return;
      const { pageX, pageY } = e instanceof MouseEvent ? e : e.changedTouches[0];
      initPosRef.current = { x: pageX, y: pageY };
    };
    el.addEventListener("mousedown", handler, { passive: false });
    el.addEventListener("touchstart", handler, { passive: false });

    return () => {
      el.removeEventListener("mousedown", handler);
      el.removeEventListener("touchstart", handler);
    };
  }, [container, disabled, ref]);

  // holding action
  useEffect(() => {
    if (disabled) return;

    const el = container;
    if (!el) return;

    const handler = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const initPos = initPosRef.current;
      if (!initPos) return;
      const { pageX, pageY } = e instanceof MouseEvent ? e : e.changedTouches[0];
      const { x, y } = initPos;
      const style = ref?.current?.style;
      if (!style) return;
      style.transform = `translate(${pageX - x}px, ${pageY - y}px)`;
    };

    el.addEventListener("mousemove", handler, { passive: false });
    el.addEventListener("touchmove", handler, { passive: false });

    return () => {
      el.removeEventListener("mousemove", handler);
      el.removeEventListener("touchmove", handler);
    };
  }, [container, disabled, ref]);

  // release action
  useEffect(() => {
    if (disabled) return;

    const el = container;
    if (!el) return;

    const handler = () => {
      const el1 = ref?.current;
      if (!el1) return;
      const { top, left, transform } = getComputedStyle(el1);
      const [, , , , tx, ty] = (
        transform.match(/-?[0-9]+(\.[0-9]*)?/g) ?? ["0", "0", "0", "0", "0", "0"]
      ).map((s) => Math.ceil(parseInt(s)));

      const [x, y] = [
        tx + parseInt(left.replace("px", ""), 10),
        ty + parseInt(top.replace("px", ""), 10),
      ];
      const style = ref?.current?.style;
      if (!style) return;
      style.transform = "";
      style.top = `${y}px`;
      style.left = `${x}px`;
      setPos({ x, y });
      initPosRef.current = null;
    };

    el.addEventListener("mouseup", handler, { passive: false });
    el.addEventListener("touchend", handler, { passive: false });

    return () => {
      el.removeEventListener("mouseup", handler);
      el.removeEventListener("touchend", handler);
    };
  }, [container, disabled, ref]);

  return pos;
}
