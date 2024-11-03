import { px } from "./px";

export const ls = (ls: LetterSpacing, size: number) =>
  ls.unit === "PERCENT"
    ? ls.value
      ? `${ls.value / size}em`
      : 0
    : px(ls.value);
