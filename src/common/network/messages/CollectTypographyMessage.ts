import * as Networker from "monorepo-networker";
import { NetworkSide } from "../sides";
import { NetworkMessages } from "../messages";
import { collectTextStyles } from "../../../ui/utils/collectTextStyles";

export class CollectTypographyMessage extends Networker.MessageType<void> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  handle() {
    collectTextStyles().then((t) =>
      NetworkMessages.sendTypography.send(`
      @import "functions";
      
      ${t}
    `),
    );
  }
}
