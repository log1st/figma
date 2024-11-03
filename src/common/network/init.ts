import * as Networker from "monorepo-networker";
import { NetworkMessages } from "./messages";
import { NetworkSide } from "./sides";

export const initializeNetwork = Networker.createInitializer({
  messagesRegistry: NetworkMessages.registry,

  initTransports(register) {
    register(NetworkSide.PLUGIN, NetworkSide.UI, (message) => {
      figma.ui.postMessage(message);
    });

    register(NetworkSide.UI, NetworkSide.PLUGIN, (message) => {
      parent.postMessage({ pluginMessage: message }, "*");
    });
  },
});
