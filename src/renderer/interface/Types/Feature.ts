import { styles } from "../Presets/Style";
import { FeatureBlock } from "../Presets/uiBlocks";

export interface Feature {
  type: 'Feature';
  desc: 'A section that shows what you offer, with each feature explained using an image and a short message — the layout switches sides as you scroll to keep it visually engaging.'
  id: string;
  enabled: boolean;

  heading?: string;
  blocks: FeatureBlock[];

  style:styles;
}
