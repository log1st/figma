export const isGradientPaint = (paint: Paint): paint is GradientPaint =>
  paint.type === "GRADIENT_LINEAR";
