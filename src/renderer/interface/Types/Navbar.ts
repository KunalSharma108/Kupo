import {
  styles,
} from "../Presets/Style";
import { ButtonBlock } from "../Presets/uiBlocks";

export interface Navbar {
  enabled: boolean;
  sticky: boolean;
  logo?: {
    logoURL: string;
    style: styles;
  }

  navLinks?: ButtonBlock[];
  navLinkStyle: styles;
  navLinksPosition: 'Left' | 'Center' | 'Right';

  style: styles
}
