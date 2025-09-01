import { copyImg } from "../../lib/presets/copyImg";
import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

export async function getNavLogoHTML({ data, win, directory }: getProps): Promise<string> {
  let result = await copyImg({ imgPath: data.logo.logoURL as string, destPath: directory });
  let html: string = '';

  let alignmentDiv: string = '';

  let navLinkAlign = data.navLinkStyle.styles.layout['horizontal align'].toLowerCase();
  let navLogoAlign = data.logo.style.styles.layout['horizontal align'].toLowerCase();

  if (navLogoAlign) {
    if (navLinkAlign === 'center' && navLogoAlign === 'center') {
      // do nothing
    } else {
      if (navLogoAlign === 'left') {
        alignmentDiv = 'left';
      } else if (navLogoAlign === 'center') {
        alignmentDiv = 'center';
      } else if (navLogoAlign === 'right') {
        alignmentDiv = 'right';
      } else {
        sendLog({ message: 'Horizontal align of Logo doesn\'t have a valid value', type: 'error' }, win)
      }
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