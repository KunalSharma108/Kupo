import { sendLog } from "../../sendLog";
import { getHeroCss } from "./HeroCss";
import { getProps } from "../../lib/presets/getProps";
import { getHeroTextCss } from "./HeroTextCss";
import { getHeroButtonCss } from "./HeroButtonCss";
import { getHeroTextHtml } from "./HeroTextHtml";
import { getHeroButtonHtml } from "./HeroButtonHtml";

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

  sendLog({ message: `processing Hero's Button's css`, type: 'normal' }, win);
  let HeroButtonCss = await getHeroButtonCss({ data, win, directory });
  css += HeroButtonCss;

  sendLog({message: 'Processing Hero Text HTML', type: 'normal'}, win);
  let HeroTextHtml = await getHeroTextHtml({data, win, directory});

  sendLog({ message: 'Processing Hero Button HTML', type: 'normal' }, win);
  let HeroButtonHtml = await getHeroButtonHtml({ data, win, directory });

  
  html = `<div class='hero'>${HeroTextHtml} ${HeroButtonHtml}</div>`


  return { htmlBlock: html, cssBlock: css }
}