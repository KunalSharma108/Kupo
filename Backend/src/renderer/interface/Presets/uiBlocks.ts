import { dynamicStyleOption, horizontalPositionKey, hoverEffectsKey, spacingKey, styleOption, verticalPositionKey } from "./Style";
import { fontOptionsKey, fontSizesKey } from "./FontFamily";

export const textColors: Record<string, styleOption> = {
  red: { label: "Red", css: "color: #e74c3c;" },
  blue: { label: "Blue", css: "color: #3498db;" },
  green: { label: "Green", css: "color: #2ecc71;" },
  yellow: { label: "Yellow", css: "color: #f1c40f;" },
  orange: { label: "Orange", css: "color: #e67e22;" },
  purple: { label: "Purple", css: "color: #9b59b6;" },
  pink: { label: "Pink", css: "color: #ff69b4;" },
  teal: { label: "Teal", css: "color: #1abc9c;" },
  gray: { label: "Gray", css: "color: #7f8c8d;" },
  black: { label: "Black", css: "color: #000000;" },
  white: { label: "White", css: "color: #ffffff;" },
  lightRed: { label: "Light Red", css: "color: #f8d7da;" },
  lightBlue: { label: "Light Blue", css: "color: #d0ebff;" },
  lightGreen: { label: "Light Green", css: "color: #d4edda;" },
  lightYellow: { label: "Light Yellow", css: "color: #fff3cd;" },
  lightGray: { label: "Light Gray", css: "color: #f0f0f0;" },
  darkRed: { label: "Dark Red", css: "color: #c0392b;" },
  darkBlue: { label: "Dark Blue", css: "color: #2c3e50;" },
  darkGreen: { label: "Dark Green", css: "color: #145a32;" },
  navy: { label: "Navy", css: "color: #001f3f;" },
};

export const customTextColor: Record<string, dynamicStyleOption<string>> = {
  customColor: {
    label: 'Custom Color',
    value: '#fff000',
    css: (val) => `color: ${val};`
  }
};

export const textColorOptions = {
  ...textColors,
  ...customTextColor
} as const;


export interface TextBlock {
  text: string;
  styles: {
    fontFamily: fontOptionsKey;
    fontWeight: string;
    fontSize: fontSizesKey;
    textColor: keyof typeof textColorOptions;
    horizontalPosition: horizontalPositionKey;
    verticalPosition: verticalPositionKey;

    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingRight?: spacingKey;
    paddingLeft?: spacingKey;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginRight?: spacingKey;
    marginLeft?: spacingKey;

    transition?: number;
  };
  hoverStyles: {
    hoverEffect?: hoverEffectsKey;
    fontFamily: fontOptionsKey;
    fontWeight: string;
    fontSize: fontSizesKey;
    textColor: string;

    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingRight?: spacingKey;
    paddingLeft?: spacingKey;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginRight?: spacingKey;
    marginLeft?: spacingKey;
  }
}

export interface ButtonBlock {
  label: string;
  link: string;

  styles: {
    backgroundColor: string;
    textColor: keyof typeof textColorOptions;
    fontFamily: fontOptionsKey;
    fontWeight: string;
    fontSize: fontSizesKey;

    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingLeft?: spacingKey;
    paddingRight?: spacingKey;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginLeft?: spacingKey;
    marginRight?: spacingKey;

    border?: string;
    borderRadius?: string;
  };

  hoverStyles?: {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: fontOptionsKey;
    fontWeight?: string;
    fontSize?: fontSizesKey;

    paddingTop?: spacingKey;
    paddingBottom?: spacingKey;
    paddingLeft?: spacingKey;
    paddingRight?: spacingKey;

    marginTop?: spacingKey;
    marginBottom?: spacingKey;
    marginLeft?: spacingKey;
    marginRight?: spacingKey;

    border?: string;
    borderRadius?: string;
    hoverEffect?: hoverEffectsKey;
  };
}

export interface FeatureBlockTitle {
  text: string;

  fontSize?: fontSizesKey;
  fontFamily?: fontOptionsKey;
  color?: keyof typeof textColorOptions;

  textAlign?: verticalPositionKey;
}

export interface FeatureBlockDesc {
  text: string;

  fontSize?: fontSizesKey;
  fontFamily?: fontOptionsKey;
  color?: keyof typeof textColorOptions;

  textAlign?: verticalPositionKey;
}

export interface FeatureBlock {
  id: string;

  title: FeatureBlockTitle;
  description: FeatureBlockDesc;

  imageUrl: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right' | 'toggle';
}
