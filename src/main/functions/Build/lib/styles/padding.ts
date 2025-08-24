import { BrowserWindow } from "electron";
import { cssReturnProps } from "../template/props";
import { sendLog } from "../../sendLog";

interface paddingProps {
  padding: {
    'padding top': string | 'undefined';
    'padding bottom': string | 'undefined';
    'padding right': string | 'undefined';
    'padding left': string | 'undefined';
  },

  win: BrowserWindow;
}

export async function getPadding({ padding, win }: paddingProps): Promise<cssReturnProps> {
  try {
    let css = '';

    for (const val in padding) {
      if (padding[val] !== 'undefined') {
        let paddingNum = padding[val].split('-')[0];
        let paddingMetric = padding[val].split('-')[1];

        css += `${val.replace(' ', '-')}: ${paddingNum}${paddingMetric}; `;
      } else {
        sendLog({ message: `Skipping ${val} because it has invalid value.`, type: "warning" }, win);
      }
    }

    return { success: true, msg: 'padding is done', type: 'normal', code: css };
  } catch (error) {
    sendLog({ message: 'There was an error while generating padding css', type: 'error' }, win);
    return { success: false, msg: `There was an error: ${error}`, type: "error" }
  }
}