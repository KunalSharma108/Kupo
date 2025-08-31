import { copyImg } from "../../lib/presets/copyImg";
import { getProps } from "../../lib/presets/getProps";
import { sendLog } from "../../sendLog";

export async function getNavLogoHTML({ data, win, directory }: getProps): Promise<string> {
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