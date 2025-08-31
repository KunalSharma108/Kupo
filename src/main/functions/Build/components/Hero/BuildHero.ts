import { sendLog } from "../../sendLog";
import { getHeroCss } from "./HeroCss";
import { getProps } from "../../lib/presets/getProps";
import { getHeroTextCss } from "./HeroTextCss";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

export async function buildHero({ data, win, directory }: getProps): Promise<returnProps> {
  sendLog({ message: 'Building Hero...', type: 'normal' }, win)

  let html: string = '';
  let css: string = '';

  sendLog({ message: 'processing Hero\'s css', type: 'normal' }, win);
  let HeroCss = await getHeroCss({ data, win, directory });
  css += HeroCss;

  sendLog({ message: `processing Hero's Text's css`, type: 'normal' }, win);
  let HeroTextCss = await getHeroTextCss({ data, win, directory });
  css += HeroTextCss;

  return { htmlBlock: html, cssBlock: css }
}