import * as Networker from "monorepo-networker";
import { CollectThemesMessage } from "./messages/CollectThemesMessage";
import { SendThemesMessage } from "./messages/SendThemesMessage";
import { CollectTypographyMessage } from "./messages/CollectTypographyMessage";
import { SendTypographyMessage } from "./messages/SendTypographyMessage";
import { SendIconMessage } from "./messages/SendIconMessage";
import { CollectIconMessage } from "./messages/CollectIconMessage";
import { CloseMessage } from "./messages/CloseMessage";

export namespace NetworkMessages {
  export const registry = new Networker.MessageTypeRegistry();

  export const collectThemes = registry.register(
    new CollectThemesMessage("collectThemes"),
  );

  export const sendThemes = registry.register(
    new SendThemesMessage("sendThemes"),
  );

  export const collectTypography = registry.register(
    new CollectTypographyMessage("collectTypography"),
  );

  export const sendTypography = registry.register(
    new SendTypographyMessage("sendTypography"),
  );

  export const collectIcon = registry.register(
    new CollectIconMessage("collectIcon"),
  );

  export const sendIcon = registry.register(new SendIconMessage("sendIcon"));
  export const close = registry.register(new CloseMessage("close"));
}
