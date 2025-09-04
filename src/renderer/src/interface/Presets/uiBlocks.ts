import { styleOption, styles } from "./Style";

export const ColorOptions: Record<string, styleOption> = {
  red: { label: "Red", css: "e74c3c;" },
  blue: { label: "Blue", css: "3498db;" },
  green: { label: "Green", css: "2ecc71;" },
  yellow: { label: "Yellow", css: "f1c40f;" },
  orange: { label: "Orange", css: "e67e22;" },
  purple: { label: "Purple", css: "9b59b6;" },
  pink: { label: "Pink", css: "ff69b4;" },
  teal: { label: "Teal", css: "1abc9c;" },
  gray: { label: "Gray", css: "7f8c8d;" },
  black: { label: "Black", css: "000000;" },
  white: { label: "White", css: "ffffff;" },
  lightRed: { label: "Light Red", css: "f8d7da;" },
  lightBlue: { label: "Light Blue", css: "d0ebff;" },
  lightGreen: { label: "Light Green", css: "d4edda;" },
  lightYellow: { label: "Light Yellow", css: "fff3cd;" },
  lightGray: { label: "Light Gray", css: "f0f0f0;" },
  darkRed: { label: "Dark Red", css: "c0392b;" },
  darkBlue: { label: "Dark Blue", css: "2c3e50;" },
  darkGreen: { label: "Dark Green", css: "145a32;" },
  navy: { label: "Navy", css: "001f3f;" },
  customColor: {label: 'Custom Color', css: ''}
} as const;

export type ColorsKey = keyof typeof ColorOptions;

export interface TextBlock {
  text: string;
  style: styles;
}

export interface ButtonBlock {
  label: string;
  link: string;
  style: styles;
}

export interface FeatureBlockTitle {
  text: string;
  style: styles;
}

export interface FeatureBlockDesc {
  text: string;
  style: styles;
}

export interface FeatureBlock {
  id: string;

  title: FeatureBlockTitle;
  description: FeatureBlockDesc;

  imageURL: string

  style: styles;
}
