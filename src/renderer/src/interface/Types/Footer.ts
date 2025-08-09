import { styles } from "../Presets/Style";
import { ButtonBlock } from "../Presets/uiBlocks";

export interface Footer {
  type: "footer";
  desc: 'The footer is the bottom section of a website that usually contains extra info like copyright, links, and contact details.';
  id: string;
  enabled: boolean;
  styles?: styles;
  buttons: ButtonBlock[];
}