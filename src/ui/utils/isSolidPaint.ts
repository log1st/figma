export const isSolidPaint = (paint: Paint): paint is SolidPaint =>
  paint.type === "SOLID";
