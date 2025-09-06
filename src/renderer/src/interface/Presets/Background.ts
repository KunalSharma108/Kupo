import { dynamicStyleOption } from "./Style";
import { ColorOptions } from "./uiBlocks";

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
      position: 'center',
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
  color: ColorOptions,
  gradient: gradientBackground,
  image: customImageBackground,
  "image + gradient": customImageGradientBackground,
} as const;



export type imageGradientBackgroundKey = keyof typeof customImageGradientBackground;
export type imageBackgroundKey = keyof typeof customImageBackground;
export type gradientBackgroundKey = keyof typeof gradientBackground;
export type BackgroundTypeMapKey = keyof typeof backgroundTypeMap;


export const gradientDirectionValue = [
  'to-top',
  'to-bottom',
  'to-left',
  'to-right',
  'to-top-left',
  'to-top-right',
  'to-bottom-left',
  'to-bottom-right'
]
