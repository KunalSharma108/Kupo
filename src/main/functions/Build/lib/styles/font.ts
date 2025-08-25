import { BrowserWindow } from "electron";
import { cssReturnProps } from "../template/props";
import { colors } from "../presets/color";
import { sendLog } from "../../sendLog";
import { fontOptions, fontSizes } from "../presets/fonts";

interface fontProps {
  font: {
    "font color": string;
    "font family": string;
    "font weight": number | 'default' | 'Default';
    "font size": string;
  },

  win: BrowserWindow;
}

export async function getFont({ font, win }: fontProps): Promise<cssReturnProps> {
  try {
    let css = ``;

    if (font["font color"][0] === '#') {
      css = `color: ${font["font color"]}; `
    } else if (colors[font["font color"]]) {
      css += `color: #${colors[font["font color"].toLowerCase()]}; `
    } else {
      sendLog({ message: 'Invalid color type of font.', type: 'error' }, win)
    }

    if (font["font family"].toLowerCase() !== 'default') {
      Object.entries(fontOptions).map((val) => {
        if (val[1].label.toLowerCase() === font["font family"].toLowerCase()) {
          css += `font-family: ${val[1].fontFamily} `;
        }
      });
    }

    if (font["font weight"] !== 'default' && font["font weight"] !== 'Default') {
      css += `font-weight: ${font["font weight"]}; `;
    }

    if (font["font size"].toLowerCase() !== 'default') {
      Object.entries(fontSizes).map((val) => {
        if (val[1].label.toLowerCase() === font["font size"].toLowerCase()) {
          css += `font-size: ${val[1].css} `;
        }
      })
    }

    return { success: true, msg: 'font is done', type: 'normal', code: css }
  } catch (error) {
    sendLog({ message: ' an error occured while generating font css', type: 'error' }, win)
    return { success: false, msg: `an error occured: ${error}`, type: 'error' }
  }
}