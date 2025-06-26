import { styles } from "../Presets/Style";
import { FeatureBlock } from "../Presets/uiBlocks";

export interface FeatureSection {
  id: string;
  type: 'feature';
  enabled: boolean;

  heading?: string;
  blocks: FeatureBlock[];

  style:styles;
}
