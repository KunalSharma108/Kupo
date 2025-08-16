import { cssReturnProps } from "../template/props";

interface layoutProps {
  layout: {
    "horizontal align"?: 'left' | 'center' | 'right';
    'vertical align'?: 'top' | 'center' | 'bottom';
    width: 'fit-content' | string;
    height: 'fit-content' | string;
    'max width': 'fit-content' | string | 'none';
    'max height': 'fit-content' | string | 'none'
  }
}

export async function getLayoutCss({layout} :layoutProps): Promise<cssReturnProps> {
  
}