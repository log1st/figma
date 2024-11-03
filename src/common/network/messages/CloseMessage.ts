import * as Networker from "monorepo-networker";
import { NetworkSide } from "../sides";

export class CloseMessage extends Networker.MessageType<void> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  handle() {
    figma.closePlugin("Closed cause of Escape");
  }
}
