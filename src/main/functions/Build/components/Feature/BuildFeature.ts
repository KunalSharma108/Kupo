import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getFeatureBlockCss } from "./FeatureBlockCss";
import { getFeatureCss } from "./FeatureCss";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

export async function buildFeature({ data, win, directory }: getProps): Promise<returnProps> {
  sendLog({ message: 'Building Feature block....', type: 'normal' }, win);
  let html: string = '';
  let css: string = '';

  sendLog({ message: 'Building Feature\'s css', type: 'normal' }, win);
  let featureCss = await getFeatureCss({ data, win, directory });
  css += featureCss;

  sendLog({ message: 'Building Feature\'s block\'s css', type: 'normal' }, win);
  let featureBlockCss = await getFeatureBlockCss({ data, win, directory });
  css += featureBlockCss;

  return { htmlBlock: html, cssBlock: css }
}