import * as Networker from "monorepo-networker";
import { NetworkSide } from "../sides";
import { collectPaintStyles } from "../../../ui/utils/collectPaintStyles";
import { collectEffectStyles } from "../../../ui/utils/collectEffectStyles";
import { NetworkMessages } from "../messages";

export class CollectThemesMessage extends Networker.MessageType<void> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  handle() {
    NetworkMessages.sendThemes.send(`
      @import "functions";
        @mixin lightTheme() {
        ${collectPaintStyles('Light')};
        
        ${collectEffectStyles('Light')};
        }
        @mixin darkTheme() {
        ${collectPaintStyles('Dark')};
        
        ${collectEffectStyles('Dark')};
        }
    `);
  }
}
