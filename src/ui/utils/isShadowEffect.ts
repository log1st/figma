import { isDropShadowEffect } from "./isDropShadowEffect";
import { isInnerShadowEffect } from "./isInnerShadowEffect";

export const isShadowEffect = (
  effect: Effect,
): effect is DropShadowEffect | InnerShadowEffect =>
  isDropShadowEffect(effect) || isInnerShadowEffect(effect);
