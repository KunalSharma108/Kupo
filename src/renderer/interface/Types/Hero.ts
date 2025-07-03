import { styles } from "../Presets/Style";
import { ButtonBlock, TextBlock } from "../Presets/uiBlocks";

export interface Hero {
  name:string;
  type: "Hero";
  desc: 'The big intro area you see first, it usually contains a catchy headline, a short message, and maybe a button or image to grab attention';
  id: string;
  enabled: boolean;
  texts: TextBlock[];
  buttons?: ButtonBlock[];
  style:styles
}

