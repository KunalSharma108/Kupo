import { BackgroundTypeMapKey } from "../Presets/Background";
import { horizontalPositionKey, spacingKey, verticalPositionKey } from "../Presets/Style";
import { ButtonBlock, TextBlock } from "../Presets/uiBlocks";

export interface HeroSection {
  id: string;
  type: "hero";
  enabled: boolean;

  horizontalPosition: horizontalPositionKey;
  verticalPosition: verticalPositionKey;

  backgroundType: BackgroundTypeMapKey;

  texts: TextBlock[];
  buttons?: ButtonBlock[];

  styles?: {
    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingLeft?: spacingKey;
    paddingRight?: spacingKey;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginLeft?: spacingKey;
    marginRight?: spacingKey;
  };
}

