import * as Networker from "monorepo-networker";
import { NetworkSide } from "../sides";
import { send } from "../../../getClient";

export class SendThemesMessage extends Networker.MessageType<string> {
  receivingSide(): Networker.Side {
    return NetworkSide.UI;
  }

  handle(themes: string) {
    send("renderThemes", {
      themes,
    });
  }
}
