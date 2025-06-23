export interface styleOption {
  label: string,
  css: string
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
    marginLeft?:spacingKey;

    transition?:number;
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



export type verticalPositionKey = keyof typeof verticalPosition;
export type fontSizesKey = keyof typeof fontSizes;
export type fontOptionsKey = keyof typeof fontOptions;
export type spacingKey = keyof typeof spacingOptions;
export type hoverEffectsKey = keyof typeof hoverEffects;
export type horizontalPositionKey = keyof typeof horizontalPosition;
