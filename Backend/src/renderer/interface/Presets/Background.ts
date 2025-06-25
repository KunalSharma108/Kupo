import { dynamicStyleOption, styleOption, verticalPosition } from "./Style";

export const colorBackgrounds: Record<string, styleOption> = {
  red: { label: "Red", css: "background-color: #e74c3c;" },
  blue: { label: "Blue", css: "background-color: #3498db;" },
  green: { label: "Green", css: "background-color: #2ecc71;" },
  yellow: { label: "Yellow", css: "background-color: #f1c40f;" },
  orange: { label: "Orange", css: "background-color: #e67e22;" },
  purple: { label: "Purple", css: "background-color: #9b59b6;" },
  pink: { label: "Pink", css: "background-color: #ff69b4;" },
  teal: { label: "Teal", css: "background-color: #1abc9c;" },
  gray: { label: "Gray", css: "background-color: #7f8c8d;" },
  black: { label: "Black", css: "background-color: #000000;" },
  white: { label: "White", css: "background-color: #ffffff;" },
  lightRed: { label: "Light Red", css: "background-color: #f8d7da;" },
  lightBlue: { label: "Light Blue", css: "background-color: #d0ebff;" },
  lightGreen: { label: "Light Green", css: "background-color: #d4edda;" },
  lightYellow: { label: "Light Yellow", css: "background-color: #fff3cd;" },
  lightGray: { label: "Light Gray", css: "background-color: #f0f0f0;" },
  darkRed: { label: "Dark Red", css: "background-color: #c0392b;" },
  darkBlue: { label: "Dark Blue", css: "background-color: #2c3e50;" },
  darkGreen: { label: "Dark Green", css: "background-color: #145a32;" },
  navy: { label: "Navy", css: "background-color: #001f3f;" },
};

export const customColorBackground: Record<string, dynamicStyleOption<string>> = {
  customColor: {
    label: 'Custom Color',
    value: '#fff000',
    css: (val) => `background-color:${val}`
  }
}

export const colorBackgroundOptions = {
  ...colorBackgrounds,
  ...customColorBackground
} as const;


export interface imageBackgroundValue {
  url: string;
  position: 'left' | 'center' | 'right';
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  fit: 'cover' | 'forgot lol'
}

export interface ImageBackgroundValue {
  url: string;
  position: 'left' | 'center' | 'right' | 'top' | 'bottom' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  size: 'auto' | 'cover' | 'contain';
}

export const customImageBackground: Record<string, dynamicStyleOption<ImageBackgroundValue>> = {
  customImage: {
    label: 'Custom Image',
    value: {
      url: '/images/default.jpg',
      position:'center',
      repeat: 'no-repeat',
      size: 'cover'
    },
    css: (val) =>
      `background-image: url(${val.url}); background-position: ${val.position}; background-size: ${val.size}; background-repeat: ${val.repeat};`
  }
};

export interface GradientColorStop {
  color: string;
  position?: string;
}

export interface GradientBackgroundValue {
  direction:
  | "to top"
  | "to bottom"
  | "to left"
  | "to right"
  | "to top left"
  | "to top right"
  | "to bottom left"
  | "to bottom right";

  stops: GradientColorStop[];
}

export const gradientBackground: Record<string, dynamicStyleOption<GradientBackgroundValue>> = {
  gradient: {
    label: 'Gradient',
    value: {
      direction: "to bottom",
      stops: [
        { color: "#ff0000", position: "0%" },
        { color: "#0000ff", position: "100%" }
      ]
    },
    css: (val) => {
      const stopString = val.stops
        .map(stop => stop.position ? `${stop.color} ${stop.position}` : stop.color)
        .join(', ');

      return `background: linear-gradient(${val.direction}, ${stopString});`;
    }
  }
};

export interface ImageGradientBackgroundValue {
  imageUrl: string;
  gradientDirection:
  | "to top"
  | "to bottom"
  | "to left"
  | "to right"
  | "to top left"
  | "to top right"
  | "to bottom left"
  | "to bottom right";
  gradientStops: GradientColorStop[];
  blendMode:
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion";
  gradientOpacity?: number; // 0 to 1
  position: 'left' | 'center' | 'right' | 'top' | 'bottom';
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  size: 'auto' | 'cover' | 'contain';
}

export const customImageGradientBackground: Record<string, dynamicStyleOption<ImageGradientBackgroundValue>> = {
  customImageGradient: {
    label: "Image + Gradient",
    value: {
      imageUrl: "/images/bg.jpg",
      gradientDirection: "to bottom",
      gradientStops: [
        { color: "#000000", position: "0%" },
        { color: "#ffffff", position: "100%" }
      ],
      gradientOpacity: 0.6,
      blendMode: "overlay",
      position: "center",
      repeat: "no-repeat",
      size: "cover"
    },
    css: (val) => {
      const stopString = val.gradientStops
        .map(stop => stop.position ? `${stop.color} ${stop.position}` : stop.color)
        .join(", ");

      const gradientLayer = `linear-gradient(${val.gradientDirection}, ${stopString})`;

      const gradientWithOpacity = `linear-gradient(${val.gradientDirection}, ${val.gradientStops.map(
        stop =>
          stop.position
            ? `rgba(${stop.color}, ${val.gradientOpacity ?? 1}) ${stop.position}`
            : `rgba(${stop.color}, ${val.gradientOpacity ?? 1})`
      ).join(', ')})`;

      return `
        background-image: ${gradientWithOpacity}, url(${val.imageUrl});
        background-blend-mode: ${val.blendMode};
        background-position: ${val.position};
        background-repeat: ${val.repeat};
        background-size: ${val.size};
      `.trim();
    }
  }
};

export const backgroundTypeMap = {
  color: colorBackgroundOptions,
  gradient: gradientBackground,
  image: customImageBackground,
  "image+gradient": customImageGradientBackground,
} as const;


export type BackgroundTypeMapKey = keyof typeof backgroundTypeMap;

