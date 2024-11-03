import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NetworkSide } from "../common/network/sides";
import { initializeNetwork } from "../common/network/init";

async function bootstrap() {
  initializeNetwork(NetworkSide.UI);

  const App = (await import("./app")).default;

  const rootElement = document.getElementById("root") as HTMLElement;
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();
