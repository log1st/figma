import { px } from "./px";

export const lh = (lh: LineHeight) =>
  lh.unit === "PERCENT"
    ? `${lh.value}%`
    : lh.unit === "PIXELS"
      ? px(lh.value)
      : "normal";
