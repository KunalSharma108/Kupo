import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";
import { getFooterCss } from "./FooterCss";
import { getFooterLinkCss } from "./FooterLinkCss";
import { getFooterLinkHtml } from "./FooterLinkHtml";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

export async function buildFooter({ data, win, directory }: getProps): Promise<returnProps> {
  sendLog({ message: 'processing footer....', type: 'normal' }, win);
  let html: string = '';
  let css: string = '';

  sendLog({ message: `Building footer's CSS`, type: 'normal' }, win);
  let footerCss = await getFooterCss({ data, win, directory });
  css += footerCss;

  sendLog({ message: `Building footer's link CSS`, type: 'normal' }, win);
  let footerLinkCss = await getFooterLinkCss({ data, win, directory });
  css += footerLinkCss;

  sendLog({ message: `Building Footer's html`, type: 'normal' }, win);
  let footerHtml = await getFooterLinkHtml({ data, win, directory });

  html = `<div class='footer'>${footerHtml}</div>`

  return { htmlBlock: html, cssBlock: css }
}