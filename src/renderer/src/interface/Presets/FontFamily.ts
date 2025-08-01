import { styleOption } from "./Style";

export const fontOptions: Record<string, {
  label: string;
  import: string;
  fontFamily: string;
}> = {
  poppins: {
    label: 'Poppins',
    import: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'Poppins', sans-serif`,
  },
  inter: {
    label: 'Inter',
    import: `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap');`,
    fontFamily: `'Inter', sans-serif`,
  },
  rubik: {
    label: 'Rubik',
    import: `@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'Rubik', sans-serif`,
  },
  mulish: {
    label: 'Mulish',
    import: `@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'Mulish', sans-serif`,
  },
  lato: {
    label: 'Lato',
    import: `@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');`,
    fontFamily: `'Lato', sans-serif`,
  },
  roboto: {
    label: 'Roboto',
    import: `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');`,
    fontFamily: `'Roboto', sans-serif`,
  },
  openSans: {
    label: 'Open Sans',
    import: `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');`,
    fontFamily: `'Open Sans', sans-serif`,
  },
  montserrat: {
    label: 'Montserrat',
    import: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700;900&display=swap');`,
    fontFamily: `'Montserrat', sans-serif`
  },
  dmSans: {
    label: 'DM Sans',
    import: `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&display=swap');`,
    fontFamily: `'DM Sans', sans-serif`
  },
  nunito: {
    label: 'Nunito',
    import: `@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;900&display=swap');`,
    fontFamily: `'Nunito', sans-serif`,
  },
  quicksand: {
    label: 'Quick Sand',
    import: `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');`,
    fontFamily: `"Quicksand", sans-serif;`,
  },
  
  'mozilla-text': {
    label: 'Mozilla Text',
    import: `@import url('https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap');`,
    fontFamily: `"Mozilla Text", sans-serif;`
  }
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