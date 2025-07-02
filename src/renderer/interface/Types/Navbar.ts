import {
  styles,
} from "../Presets/Style";
import { ButtonBlock } from "../Presets/uiBlocks";

export interface Navbar {
  type: 'Navbar';
  desc: 'A menu bar at the top of the site that helps visitors navigate between different pages or sections.';
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
