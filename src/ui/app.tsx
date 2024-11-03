import { useEffect, useRef, useState } from "react";
import { NetworkMessages } from "../common/network/messages";
import { IconSearch } from "./IconSearch";
import { Icon } from "./Icon";

function App() {
  const [icon, setIcon] = useState<{ family: string;name: string } | null>(null);

  const renderIconRef = useRef<HTMLButtonElement | null>(null);

  const iconSearchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!icon) {
      iconSearchRef.current?.focus();
      return;
    }
    renderIconRef.current?.focus();
  }, [icon]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button
        type="button"
        onClick={() => NetworkMessages.collectThemes.send()}
      >
        Render Themes
      </button>
      <button
        type="button"
        onClick={() => NetworkMessages.collectTypography.send()}
      >
        Render Typography
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {icon && <Icon selected {...icon} />}

        <IconSearch
          ref={iconSearchRef}
          value={icon}
          onChange={setIcon}
        />
        <button
          type="button"
          onClick={() => {
              if(icon) {
                  NetworkMessages.collectIcon.send(icon);
              } else {
                  const name = iconSearchRef.current?.value;
                  if(name) {
                      NetworkMessages.collectIcon.send({family: 'solid', name})
                  }
              }
            setIcon(null);
          }}
          ref={renderIconRef}
        >
          Render Icon
        </button>
      </div>
    </div>
  );
}

export default App;
