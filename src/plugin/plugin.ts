import { initializeNetwork } from "../common/network/init";
import { NetworkSide } from "../common/network/sides";

async function bootstrap() {
  initializeNetwork(NetworkSide.PLUGIN);

  if (figma.editorType === "figma") {
    figma.showUI(__html__, {
      width: 800,
      height: 650,
      title: "Framework helper",
    });
  }
}

bootstrap();
