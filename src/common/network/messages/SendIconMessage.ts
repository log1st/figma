import * as Networker from "monorepo-networker";
import { NetworkSide } from "../sides";
import { send } from "../../../getClient";

export class SendIconMessage extends Networker.MessageType<
  Array<[string, Uint8Array]>
> {
  receivingSide(): Networker.Side {
    return NetworkSide.UI;
  }

  handle(icon: Array<[string, Uint8Array]>) {
    const decoder = new TextDecoder();
    const decode = decoder.decode.bind(decoder);
    send("renderIcon", {
      icon: icon.map(([k, a]) => [k, decode(a)]),
    });
  }
}
