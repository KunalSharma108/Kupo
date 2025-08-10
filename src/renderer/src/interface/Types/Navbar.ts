import {
  styles,
} from "../Presets/Style";
import { ButtonBlock } from "../Presets/uiBlocks";

export interface Navbar {
  desc: 'A menu bar at the top of the site that helps visitors navigate between different pages or sections'
  id: string;
  type: 'Navbar';
  enabled: boolean;
  sticky: boolean;
  logo?: {
    logoURL: string | false;
    style: styles;
  }

  navLinks?: ButtonBlock[] | false;
  navLinkStyle?: styles | false;
  navLinksPosition?: 'left' | 'center' | 'right' | false;

  style: styles
}
