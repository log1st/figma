import * as Networker from "monorepo-networker";
import { NetworkSide } from "../sides";
import { send } from "../../../getClient";

export class SendTypographyMessage extends Networker.MessageType<string> {
  receivingSide(): Networker.Side {
    return NetworkSide.UI;
  }

  handle(typography: string) {
    send("renderTypography", {
      typography,
    });
  }
}
