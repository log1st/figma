import { isShadowEffect } from "./isShadowEffect";
import { isInnerShadowEffect } from "./isInnerShadowEffect";
import { px } from "./px";

export const collectEffectStyles = (theme?: "Light" | "Dark") =>
  figma
    .getLocalEffectStyles()
    .filter((style) => theme ? style.name.startsWith(theme) : true)
    .reduce((acc, style) => {
        const name = style.name.split("/").join("_").replace(/[\s\(\)]/g, '_').toLowerCase().replace(theme ? `${theme.toLowerCase()}_` : '', '');
      return [
          ...acc,
          {
              name: `drop-${name}`,
              effects: style.effects
                  .filter(isShadowEffect)
                  .reverse()
                  .map((effect) =>
                      `drop-shadow(${[
                          isInnerShadowEffect(effect) && "inset",
                          px(effect.offset.x),
                          px(effect.offset.y),
                          px(effect.radius),
                          `rgba(${Math.round(effect.color.r * 255)}, ${Math.round(
                              effect.color.g * 255,
                          )}, ${Math.round(effect.color.b * 255)}, ${effect.color.a})`,
                      ]
                          .filter(Boolean)
                          .join(" ")})`)
          },
          {
              name: name,
              effects: style.effects
                  .filter(isShadowEffect)
                  .reverse()
                  .map((effect) =>
                      [
                          isInnerShadowEffect(effect) && "inset",
                          px(effect.offset.x),
                          px(effect.offset.y),
                          px(effect.radius),
                          !["contrast-on-bg-interactive"].some((n) =>
                              style.name.includes(n),
                          ) && px(effect.spread || 0),
                          `rgba(${Math.round(effect.color.r * 255)}, ${Math.round(
                              effect.color.g * 255,
                          )}, ${Math.round(effect.color.b * 255)}, ${effect.color.a})`,
                      ]
                          .filter(Boolean)
                          .join(" "),
                  ),
          }
      ];
    }, [] as {name: string, effects: string[]}[])
    .map(({ name, effects }) => `--effect-${name}: ${effects.join(name.startsWith('drop-') ? " " : ", ")}`)
    .join(";\n");
