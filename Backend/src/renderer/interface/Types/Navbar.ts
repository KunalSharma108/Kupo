import {
  fontOptionsKey,
  fontSizesKey,
  hoverEffectsKey,
  horizontalPositionKey,
  spacingKey,
  TextBlock,
  ButtonBlock
} from "../designPresets";

export interface Navbar {
  enabled: boolean;
  sticky: boolean;
  logo?: string;
  logoPosition: horizontalPositionKey;

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
