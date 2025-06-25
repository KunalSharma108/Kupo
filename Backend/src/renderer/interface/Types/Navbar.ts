import { fontOptionsKey, fontSizesKey } from "../Presets/FontFamily";
import {
  hoverEffectsKey,
  horizontalPositionKey,
  spacingKey,
  verticalPositionKey,
} from "../Presets/Style";
import { ButtonBlock } from "../Presets/uiBlocks";

export interface Navbar {
  enabled: boolean;
  sticky: boolean;
  logo?: string;
  logoHorizontalPosition: horizontalPositionKey;
  logoVerticalPosition: verticalPositionKey;

  navLinks?: ButtonBlock[];
  navLinksPosition: horizontalPositionKey;

  styles: {
    backgroundColor: string;
    textColor: string;
    fontSize: fontSizesKey;
    fontFamily: fontOptionsKey;
    fontWeight: string;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginLeft?: spacingKey;
    marginRight?: spacingKey;

    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingLeft?: spacingKey;
    paddingRight?: spacingKey;
  };

  hoverStyles?: {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: fontOptionsKey;
    fontWeight?: string;
    fontSize?: fontSizesKey;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginLeft?: spacingKey;
    marginRight?: spacingKey;

    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingLeft?: spacingKey;
    paddingRight?: spacingKey;

    hoverEffect?: hoverEffectsKey;
  };
}
