export const isDropShadowEffect = (
  effect: Effect,
): effect is DropShadowEffect => effect.type === "DROP_SHADOW";
