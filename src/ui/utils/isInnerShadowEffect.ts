export const isInnerShadowEffect = (
  effect: Effect,
): effect is DropShadowEffect => effect.type === "INNER_SHADOW";
