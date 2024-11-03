import * as Networker from "monorepo-networker";
import { NetworkSide } from "../sides";
import { NetworkMessages } from "../messages";
import { isPageNode } from "../../../ui/utils/isPageNode";
import { isComponentSetNode } from "../../../ui/utils/isComponentSetNode";
import { isComponentNode } from "../../../ui/utils/isComponentNode";

const iconPaddings = ["square", "roomy", "none", "fixed-width"];

export class CollectIconMessage extends Networker.MessageType<{ name: string; family: string }> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  handle(icon: { name: string; family: string }) {
    const pageNode = figma.root.findOne(
      (i) => i.type === "PAGE" && ["Icon", "components/icon"].includes(i.name),
    );

    if (!isPageNode(pageNode)) {
      return;
    }

    const iconComponentSetNode = pageNode.findOne(
      (i) => i.type === "COMPONENT_SET" && (icon.family === 'brands' ? ['brands-icon'] :["v6-icon", "icon"]).includes(i.name),
    );

    if (!isComponentSetNode(iconComponentSetNode)) {
      return;
    }

    const componentNode = iconComponentSetNode.children[0];

    if (!isComponentNode(componentNode)) {
      return;
    }

    const node = componentNode.createInstance();

    pageNode.appendChild(node);

    const renders: Array<[string, Uint8Array]> = [];

    console.log(icon.family);

    (icon.family === 'brands' ? ['brands'] : ["regular", "solid", "light", "thin"])
      .reduce(async (a, style) => {``
        await a;
        return iconPaddings.reduce(async (a, padding) => {
          await a;

          node.setProperties({
            padding,
            style,
            [icon.family === 'brands' ? 'brand-name#1312:59' : "icon-name#1309:0"]: icon.name,
          });

          renders.push([
            `${icon.name.replace(/\s/g, '-')}_${padding}_${style}`,

            await node.exportAsync({
              format: "SVG",
            }),
          ]);
        }, Promise.resolve());
      }, Promise.resolve())
      .then(() => {
        NetworkMessages.sendIcon.send(renders);
        node.remove();
      });
  }
}
