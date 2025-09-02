import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

export async function buildFeature({ data, win, directory }: getProps): Promise<returnProps> {
  sendLog({message: 'Building Feature block....', type:'normal'}, win);
  let html: string = '';
  let css: string = '';

  sendLog({message: 'Building Feature\'s css', type:'normal'}, win);
  

  return { htmlBlock: html, cssBlock: css}
}