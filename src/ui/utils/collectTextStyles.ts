import { ls } from "./ls";
import { lh } from "./lh";
import { px } from "./px";
import { kebabCase } from "./kebabCase";

export const collectTextStyles = () =>
  Promise.all(
    figma.getLocalTextStyles().map(async (style) => {
      await figma.loadFontAsync(style.fontName);

      const fontWeight = (style.consumers[0]?.node as TextNode)?.fontWeight

      return {
        name: kebabCase(style.name).split("/").join("_"),
        font: [
          [
            "font:",
            fontWeight === figma.mixed ? 400 : fontWeight,
            px(style.fontSize),
            `${style.fontName.family}, sans-serif`,
          ].join(" "),
          ["letter-spacing:", ls(style.letterSpacing, style.fontSize)].join(
            " ",
          ),
          ["line-height:", lh(style.lineHeight)].join(" "),
        ].join(";\n"),
      };
    }),
  ).then((i) =>
    i
      .map(
        (s) =>
          `@mixin t-${s.name} {
      ${s.font}
    }`,
      )
      .join("\n\n"),
  );
