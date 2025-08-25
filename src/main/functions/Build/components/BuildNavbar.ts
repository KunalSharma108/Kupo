import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";
import { getCSS } from "./getCss";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

interface navbarProps {
  data: any;
  win: BrowserWindow;
  directory: string;
}

async function getNavbarCss({ data, win, directory }: navbarProps): Promise<string> {
  let css: string = '';
  let navbarClassName = 'navbar';

  if (data.style) {
    if (data.style.styles) {
      let navbarStyleCSS = await getCSS({ styleContent: 'navbar', styleType: 'styles', style: data.style.styles, win, directory });

      if (navbarStyleCSS.code?.trim() !== '') {
        css += `.${navbarClassName} {\n${navbarStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Style css of Navbar was generated.', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's Styling data doesn't exist`, type: 'error' }, win)
    }

    if (data.style.hoverStyles) {
      let navbarHoverStyleCSS = await getCSS({
        styleContent: 'navbar',
        styleType: 'hoverStyles',
        style: data.style.hoverStyles, win, directory
      });

      if (navbarHoverStyleCSS.code?.trim() !== '') {
        css += `\n.${navbarClassName}:hover {\n${navbarHoverStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Hover style css of Navbar was generated', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's hover style data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  return css
}

async function getNavLogoCss({ data, win, directory }: navbarProps): Promise<string> {
  let css = '';
  let navLogoClassName = 'nav-logo';

  if (data.logo.style) {
    if (data.logo.style.styles) {
      let navLogoStyleCSS = await getCSS({
        styleContent: 'navbar logo',
        styleType: 'styles',
        style: data.logo.style.styles, win, directory
      });

      if (navLogoStyleCSS.code?.trim() !== '') {
        css += `.${navLogoClassName} {\n${navLogoStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Style css of Navbar logo was generated.', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's logo's Styling data doesn't exist`, type: 'error' }, win)
    }

    if (data.logo.style.hoverStyles) {
      let navLogoHoverStyleCSS = await getCSS({
        styleContent: 'navbar',
        styleType: 'hoverStyles',
        style: data.logo.style.hoverStyles, win, directory
      });

      if (navLogoHoverStyleCSS.code?.trim() !== '') {
        css += `\n.${navLogoClassName}:hover {\n${navLogoHoverStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Hover style css of Navbar logo was generated', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's logo's hover style data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's logo's Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  return css
}

async function getNavLinksCss({ data, win, directory }: navbarProps): Promise<string> {
  let css = '';
  let navLinksClassName = 'nav-links';

  if (data.navLinkStyle) {
    if (data.navLinkStyle.styles) {
      let navLinksStyleCSS = await getCSS({
        styleContent: 'navbar logo',
        styleType: 'styles',
        style: data.navLinkStyle.styles, win, directory
      });

      if (navLinksStyleCSS.code?.trim() !== '') {
        css += `.${navLinksClassName} > div {\n${navLinksStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Style css of Navbar links was generated.', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's logo's Styling data doesn't exist`, type: 'error' }, win)
    }

    if (data.navLinkStyle.hoverStyles) {
      let navLinksHoverStyleCSS = await getCSS({
        styleContent: 'navbar',
        styleType: 'hoverStyles',
        style: data.navLinkStyle.hoverStyles, win, directory
      });

      if (navLinksHoverStyleCSS.code?.trim() !== '') {
        css += `\n.${navLinksClassName} > div:hover {\n${navLinksHoverStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Hover style css of Navbar links was generated', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's links' hover style data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's links' Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  return css
}

export async function buildNavbar({ data, win, directory }: navbarProps): Promise<returnProps> {
  let html: string = ``;
  let css: string = ``;

  sendLog({ message: 'Building Navbar...', type: 'normal' }, win);

  sendLog({ message: 'processing navbar\'s css', type: 'normal' }, win)
  const navCSS = await getNavbarCss({ data, win, directory });
  
  sendLog({ message: 'processing navbar\'s Logo css', type: 'normal' }, win)
  const navLogoCSS = await getNavLogoCss({ data, win, directory });

  sendLog({ message: 'processing navbar\'s Link css', type: 'normal' }, win)
  const navLinkCSS = await getNavLinksCss({ data, win, directory });

  css += `${navCSS}\n${navLogoCSS}\n${navLinkCSS}`

  return { htmlBlock: html, cssBlock: css }
}