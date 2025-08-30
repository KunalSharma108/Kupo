import { BrowserWindow } from "electron";
import { sendLog } from "../sendLog";
import { getCSS } from "./getCss";
import { copyImg } from "../lib/presets/copyImg";

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

  let childAlignmentCss = `
  .navbar > div {flex: 0 0 auto;} .navbar > div.left {margin-right: auto;} .navbar > div.center { position: absolute; left: 50%; transform: translateX(-50%); } .navbar > div.right { margin-left: auto;  }
  `;
  if (data.style) {
    if (data.style.styles) {
      let navbarStyleCSS = await getCSS({ styleContent: 'navbar', styleType: 'styles', style: data.style.styles, win, directory });

      if (navbarStyleCSS.code?.trim() !== '') {
        navbarStyleCSS.code = `
        display:flex; justify-content:space-between; align-items: center; position: relative; ${navbarStyleCSS.code}
        `.trim();

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

  css += childAlignmentCss;

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

  css += `.nav-logo > img { height: inherit; width: inherit;}`;

  return css
}

async function getNavLinksCss({ data, win, directory }: navbarProps): Promise<string> {
  let css = '';
  let navLinksClassName = 'nav-links';

  css += `.${navLinksClassName} {display: flex;}`

  if (data.navLinkStyle) {
    if (data.navLinkStyle.styles) {
      let navLinksStyleCSS = await getCSS({
        styleContent: 'navbar logo',
        styleType: 'styles',
        style: data.navLinkStyle.styles, win, directory
      });

      if (navLinksStyleCSS.code?.trim() !== '' && navLinksStyleCSS.success) {
        css += `.${navLinksClassName} > a {\n${navLinksStyleCSS.code}\n}`;
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
        style: data.navLinkStyle.hoverStyles,
        win,
        directory
      });

      if (navLinksHoverStyleCSS.code?.trim() !== '' && navLinksHoverStyleCSS.success) {
        css += `\n.${navLinksClassName} > a:hover {\n${navLinksHoverStyleCSS.code}\n}`;
      } else {
        sendLog({ message: 'No Hover style css of Navbar links was generated', type: 'warning' }, win)
      }

    } else {
      sendLog({ message: `Navbar's links' hover style data doesn't exist`, type: 'error' }, win)
    }
  } else {
    sendLog({ message: `Navbar's links' Styling and Hover styling data doesn't exist`, type: 'error' }, win)
  }

  let valCount: number = 1;

  for (const val of data.navLinks) {
    let valClassName = `nav-link-${valCount}`;

    if (val.style) {
      if (val.style.styles) {
        let valCss = await getCSS({
          styleContent: 'navbar link',
          styleType: 'styles',
          style: val.style.styles,
          win,
          directory
        })

        if (valCss.code?.trim() !== '' && valCss.success) {
          valCss.code = valCss.code?.replace(/;(?=\s|$)/g, " !important;") || "";
          css += `.${valClassName} {\n${valCss.code}\n}`;
        } else {
          console.log(valCss)
        }
      } else {
        sendLog({ message: `navbar's link's style doesn't exist`, type: 'error' }, win);
      }

      if (val.style.hoverStyles) {
        let valCss = await getCSS({
          styleContent: 'navbar link',
          styleType: 'hoverStyles',
          style: val.style.hoverStyles,
          win,
          directory
        })

        if (valCss.code?.trim() !== '' && valCss.success) {
          valCss.code = valCss.code?.replace(/;(?=\s|$)/g, " !important;") || "";
          css += `.${valClassName}:hover {\n${valCss.code}\n}`;
        } else {
          console.log(valCss)
        }
      } else {
        sendLog({ message: `navbar's link's hover style doesn't exist`, type: 'error' }, win);
      }
    }

    valCount++
  }

  return css
}

async function getNavLogoHTML({ data, win, directory }: navbarProps): Promise<string> {
  let result = await copyImg({ imgPath: data.logo.logoURL as string, destPath: directory });
  let html: string = '';

  let alignmentDiv: string = '';

  if (data.logo.style.styles.layout['horizontal align']) {
    const align = data.logo.style.styles.layout['horizontal align'].toLowerCase();

    if (align === 'left') {
      alignmentDiv = 'left';
    } else if (align === 'center') {
      alignmentDiv = 'center';
    } else if (align === 'right') {
      alignmentDiv = 'right';
    } else {
      sendLog({ message: 'Horizontal align of Logo doesn\'t have a valid value', type: 'error' }, win)
    }

  } else {
    sendLog({ message: 'Horizontal align doesn\'t exist in logo styling.', type: 'error' }, win)
  }

  if (result.success) {
    sendLog({ message: 'Successfully copied logo to the root directory.', type: 'normal' }, win)
    html = `<div class='nav-logo ${alignmentDiv}'> <img src='${result.baseName}' alt='Logo' /> </div>`;

    return html;
  } else {
    sendLog({
      message: 'There was a problem while copying the logo image to the root directory, Please ensure the image path is correct and the image exists.',
      type: 'error'
    }, win)

    return `<div class='nav-logo'></div>`
  }
}

async function getNavLinksHTML({ data, win, }): Promise<string> {
  let html: string = ''
  let count: number = 1;
  let linkHTML: string = '';

  let alignmentDiv: string = '';

  if (data.navLinkStyle.styles.layout['horizontal align']) {
    const align = data.navLinkStyle.styles.layout['horizontal align'].toLowerCase();

    if (align === 'left') {
      alignmentDiv = 'left';
    } else if (align === 'center') {
      alignmentDiv = 'center';
    } else if (align === 'right') {
      alignmentDiv = 'right';
    } else {
      sendLog({ message: 'Horizontal align of Links doesn\'t have a valid value', type: 'error' }, win)
    }

  } else {
    sendLog({ message: 'Horizontal align doesn\'t exist in Links styling.', type: 'error' }, win)
  }

  if (data.navLinks) {
    for (const val of data.navLinks) {
      linkHTML += `<a class='nav-link-${count}' href='${val.link}' target='_blank'>${val.label}</a>\n`;
      count++
    }
    sendLog({ message: 'Successfuly generated the HTML for navbar links', type: 'normal' }, win)
  } else {
    sendLog({ message: `Navbar's links dont exist.`, type: 'error' }, win)
  }

  html = `<div class='nav-links ${alignmentDiv}'> ${linkHTML} </div>`;
  return html
}

interface getNavbarProps {
  data: {
    logoAlign: 'left' | 'center' | 'right';
    linkAlign: 'left' | 'center' | 'right';
  };
  logoHTML: string;
  linkHTML: string;
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

  css += `${navCSS}\n${navLogoCSS}\n${navLinkCSS}`.trim();

  sendLog({ message: `Navbar's styling is done, Working on HTML now.`, type: 'normal' }, win);

  const logoHTML = await getNavLogoHTML({ data, win, directory });
  const linkHTML = await getNavLinksHTML({ data, win });

  html = `<div class='navbar'>${logoHTML}${linkHTML}</div>`;


  return { htmlBlock: html, cssBlock: css }
}