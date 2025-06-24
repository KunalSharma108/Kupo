import { ButtonBlock, horizontalPositionKey, spacingKey, TextBlock, verticalPositionKey } from "../designPresets";

export interface HeroSection {
  id: string;
  type: "hero";
  enabled: boolean;

  horizontalPosition: horizontalPositionKey;
  verticalPosition: verticalPositionKey;

  background: {
    type: "color" | "image" | "gradient" | "image+gradient";
    color?: string;
    imageUrl?: string;
    gradient?: string;
    blendMode?: string;
  };

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

