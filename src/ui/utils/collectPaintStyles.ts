import { isGradientPaint } from "./isGradientPaint";
import { convertToDegree } from "./convertToDegree";
import { isSolidPaint } from "./isSolidPaint";

const colorToRgba = (color: RGBA, opacity?: number) => `rgba(${Math.round(color.r * 255)}, ${Math.round(
    color.g * 255,
)}, ${Math.round(color.b * 255)}, ${
    (typeof opacity === "number" ? opacity : 1) *
    color.a
})`

export const collectPaintStyles = (theme?: "Light" | "Dark") => {
  return figma
    .getLocalPaintStyles()
    .filter((style) => theme ? style.name.startsWith(theme) : true)
    .map((style) => {
      const name = style.name.split("/").join('_')?.replace(/[\s()]/g, '_').replace(theme ? `${theme}_` : '', '');
      return {
        name,
        paints: [
          ...[...style.paints].sort((a, b) =>
            ["SOLID", "GRADIENT_LINEAR"].indexOf(a.type) >
            ["SOLID", "GRADIENT_LINEAR"].indexOf(b.type)
              ? -1
              : 1,
          ),
        ].map((paint) => {
          if (isGradientPaint(paint)) {
            return {
              vars: paint.gradientStops.reduce<string[]>((a, stop, i) => ([
                  ...a,
                  // `@at-root {
                  //   @property --${name}-stop-${i+1} {
                  //     syntax: "<color>";
                  //     initial-value: ${colorToRgba(stop.color, paint.opacity)};
                  //     inherits: false;
                  //   }
                  // }`,
                  `--${name}-stop-${i+1}: ${colorToRgba(stop.color, paint.opacity)}`
              ]), []),
              line: `linear-gradient(${convertToDegree(
                  paint.gradientTransform,
              )}deg, ${paint.gradientStops.map(
                  (stop, i) =>
                      `var(--${name}-stop-${i + 1}) ${stop.position * 100}%`,
              )})`
            };
          }

          if (isSolidPaint(paint)) {
            return {
              line: `rgba(${Math.round(paint.color.r * 255)}, ${Math.round(
                  paint.color.g * 255,
              )}, ${Math.round(paint.color.b * 255)}, ${paint.opacity})`
            };
          }

          return null;
        }),
      };
    })
    .filter(({ paints }) => paints.filter(Boolean).length)
    .map(({ name, paints }) => {
      return [
        ...(paints.reduce<string[]>(
            (a, i) => ([...a, ...i?.vars || []]),
            []
        )).filter(Boolean),
        [
          `--${name}`,
          paints.map(i => i?.line).join(", ")].join(": ")
      ].join(';\n');
    })
    .join(";\n\n");
};
