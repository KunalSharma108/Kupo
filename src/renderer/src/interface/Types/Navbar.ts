import {
  styles,
} from "../Presets/Style";
import { ButtonBlock } from "../Presets/uiBlocks";

export interface Navbar {
  type: 'Navbar';
  enabled: boolean;
  sticky: boolean;
  logo?: {
    logoURL: string | false;
    style: styles;
  }

  navLinks?: ButtonBlock[] | false;
  navLinkStyle?: styles | false;
  navLinksPosition?: 'Left' | 'Center' | 'Right' | false;

  style: styles
}
