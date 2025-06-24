export interface styleOption {
  label: string;
  css: string;
}

export interface dynamicStyleOption<T> {
  label: string;
  value: T;
  css: (value: T) => string;
}

export const hoverEffects: Record<string, styleOption> = {
  underline: { label: 'underline', css: 'text-decoration: underline;' },
  scale: { label: 'Scale Up', css: 'transform: scale(1.05); transition: transform 0.2s;' },
  none: { label: 'None', css: '' },
} as const;

export const horizontalPosition = {
  left: {
    label: 'Left',
    css: 'justify-content: flex-start; text-align: left;'
  },
  center: {
    label: 'Center',
    css: 'justify-content: center; text-align: center;'
  },
  right: {
    label: 'Right',
    css: 'justify-content: flex-end; text-align: right;'
  }
} as const;

export const verticalPosition = {
  top: {
    label: 'Top',
    css: 'align-items: flex-start;'
  },
  center: {
    label: 'Center',
    css: 'align-items: center;'
  },
  bottom: {
    label: 'Bottom',
    css: 'align-items: flex-end;'
  }
} as const;

export const spacingOptions: Record<string, styleOption> = {
  none: { label: 'None', css: '0' },
  xs: { label: 'Extra Small', css: '4px' },
  sm: { label: 'Small', css: '8px' },
  md: { label: 'Medium', css: '16px' },
  lg: { label: 'Large', css: '24px' },
  xl: { label: 'Extra Large', css: '32px' },
} as const;

export const fontOptions: Record<string, {
  label: string;
  import: string;
  fontFamily: string;
  weights: {
    label: string;
    weight: number;
  }[];
}> = {
  poppins: {
    label: 'Poppins',
    import: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'Poppins', sans-serif`,
    weights: [
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Medium', weight: 500 },
      { label: 'Bold', weight: 700 },
      { label: 'Black', weight: 900 },
    ],
  },
  inter: {
    label: 'Inter',
    import: `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap');`,
    fontFamily: `'Inter', sans-serif`,
    weights: [
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Medium', weight: 500 },
      { label: 'Bold', weight: 700 },
      { label: 'Black', weight: 900 },
    ],
  },
  rubik: {
    label: 'Rubik',
    import: `@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'Rubik', sans-serif`,
    weights: [
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Medium', weight: 500 },
      { label: 'Bold', weight: 700 },
      { label: 'Black', weight: 900 },
    ],
  },
  mulish: {
    label: 'Mulish',
    import: `@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'Mulish', sans-serif`,
    weights: [
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Medium', weight: 500 },
      { label: 'Bold', weight: 700 },
      { label: 'Black', weight: 900 },
    ],
  },
  lato: {
    label: 'Lato',
    import: `@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');`,
    fontFamily: `'Lato', sans-serif`,
    weights: [
      { label: 'Thin', weight: 100 },
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Bold', weight: 700 },
      { label: 'Black', weight: 900 },
    ],
  },
  roboto: {
    label: 'Roboto',
    import: `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');`,
    fontFamily: `'Roboto', sans-serif`,
    weights: [
      { label: 'Thin', weight: 100 },
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Medium', weight: 500 },
      { label: 'Bold', weight: 700 },
    ],
  },
  openSans: {
    label: 'Open Sans',
    import: `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');`,
    fontFamily: `'Open Sans', sans-serif`,
    weights: [
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'SemiBold', weight: 600 },
      { label: 'Bold', weight: 700 },
      { label: 'ExtraBold', weight: 800 },
    ],
  },
  montserrat: {
    label: 'Montserrat',
    import: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700;900&display=swap');`,
    fontFamily: `'Montserrat', sans-serif`,
    weights: [
      { label: 'Thin', weight: 100 },
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Medium', weight: 500 },
      { label: 'Bold', weight: 700 },
    ],
  },
  dmSans: {
    label: 'DM Sans',
    import: `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'DM Sans', sans-serif`,
    weights: [
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'Medium', weight: 500 },
      { label: 'Bold', weight: 700 },
      { label: 'Black', weight: 900 },
    ],
  },
  nunito: {
    label: 'Nunito',
    import: `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;900&display=swap');`,
    fontFamily: `'Nunito', sans-serif`,
    weights: [
      { label: 'ExtraLight', weight: 200 },
      { label: 'Light', weight: 300 },
      { label: 'Regular', weight: 400 },
      { label: 'SemiBold', weight: 600 },
      { label: 'Bold', weight: 700 },
    ],
  },
};

export const fontSizes: Record<string, styleOption> = {
  sm: { label: 'Small', css: 'font-size: 0.875rem;' },
  base: { label: 'Normal', css: 'font-size: 1rem;' },
  lg: { label: 'Large', css: 'font-size: 1.125rem;' },
  xl: { label: 'Extra Large', css: 'font-size: 1.25rem;' },
  '2xl': { label: '2x Large', css: 'font-size: 1.5rem;' },
  '3xl': { label: '3x Large', css: 'font-size: 1.875rem;' },
  '4xl': { label: '4x Large', css: 'font-size: 2.25rem;' }
} as const;

export interface TextBlock {
  text: string;
  styles: {
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
    textColor: string;
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

export const customGradientBackground: Record<string, dynamicStyleOption<GradientBackgroundValue>> = {
  customGradient: {
    label: 'Custom Gradient',
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

export type verticalPositionKey = keyof typeof verticalPosition;
export type fontSizesKey = keyof typeof fontSizes;
export type fontOptionsKey = keyof typeof fontOptions;
export type spacingKey = keyof typeof spacingOptions;
export type hoverEffectsKey = keyof typeof hoverEffects;
export type horizontalPositionKey = keyof typeof horizontalPosition;
