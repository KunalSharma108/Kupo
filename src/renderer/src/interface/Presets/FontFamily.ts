import { styleOption } from "./Style";

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
  sm: { label: 'Small', css: '0.875rem;' },
  base: { label: 'Normal', css: '1rem;' },
  lg: { label: 'Large', css: '1.125rem;' },
  xl: { label: 'Extra Large', css: '1.25rem;' },
  '2xl': { label: '2x Large', css: '1.5rem;' },
  '3xl': { label: '3x Large', css: '1.875rem;' },
  '4xl': { label: '4x Large', css: '2.25rem;' }
} as const;

export type fontSizesKey = keyof typeof fontSizes;
export type fontOptionsKey = keyof typeof fontOptions;