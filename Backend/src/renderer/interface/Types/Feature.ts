import { spacingKey } from "../Presets/Style";
import { FeatureBlock } from "../Presets/uiBlocks";

export interface FeatureSection {
  id: string;
  type: 'feature';
  enabled: boolean;

  heading?: string;
  blocks: FeatureBlock[];

  styles?: {
    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingLeft?: spacingKey;
    paddingRight?: spacingKey;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginLeft?: spacingKey;
    marginRight?: spacingKey;

    backgroundColor?: string;
  };
}
