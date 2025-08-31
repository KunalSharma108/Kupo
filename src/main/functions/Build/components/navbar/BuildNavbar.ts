import { sendLog } from "../../sendLog";
import { getNavbarCss } from "./NavbarCss";
import { getNavLogoCss } from "./NavLogoCss";
import { getNavLinksCss } from "./NavLinksCss";
import { getNavLogoHTML } from "./NavLogoHTML";
import { getNavLinksHTML } from "./NavLinksHtml";
import { getProps } from "../../lib/presets/getProps";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

export async function buildNavbar({ data, win, directory }: getProps): Promise<returnProps> {
  let html: string = ``;
  let css: string = ``;

  sendLog({ message: 'Building Navbar...', type: 'normal' }, win);

  sendLog({ message: 'processing navbar\'s css', type: 'normal' }, win);
  const navCSS = await getNavbarCss({ data, win, directory });

  sendLog({ message: 'processing navbar\'s Logo css', type: 'normal' }, win);
  const navLogoCSS = await getNavLogoCss({ data, win, directory });

  sendLog({ message: 'processing navbar\'s Link css', type: 'normal' }, win);
  const navLinkCSS = await getNavLinksCss({ data, win, directory });

  css += `${navCSS}\n${navLogoCSS}\n${navLinkCSS}`.trim();

  sendLog({ message: `Navbar's styling is done, Working on HTML now.`, type: 'normal' }, win);

  const logoHTML = await getNavLogoHTML({ data, win, directory });
  const linkHTML = await getNavLinksHTML({ data, win, directory });

  html = `<div class='navbar'>${logoHTML}${linkHTML}</div>`;

  return { htmlBlock: html, cssBlock: css }
}