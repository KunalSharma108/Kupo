import { styles } from "../Presets/Style";
import { ButtonBlock, TextBlock } from "../Presets/uiBlocks";

export interface HeroSection {
  id: string;
  type: "hero";
  enabled: boolean;
  texts: TextBlock[];
  buttons?: ButtonBlock[];
  style:styles
}

