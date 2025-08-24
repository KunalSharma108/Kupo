import { BrowserWindow } from "electron";
import { cssReturnProps } from "../template/props";
import { sendLog } from "../../sendLog";

interface marginProps {
  margin: {
    'margin top': string | 'undefined';
    'margin bottom': string | 'undefined';
    'margin right': string | 'undefined';
    'margin left': string | 'undefined';
  },

  win: BrowserWindow;
}

export async function getMargin({ margin, win }: marginProps): Promise<cssReturnProps> {
  try {
    let css = '';

    for (const val in margin) {
      if (margin[val] !== 'undefined') {
        let marginNum = margin[val].split('-')[0];
        let marginMetric = margin[val].split('-')[1];

        css += `${val.replace(' ', '-')}: ${marginNum}${marginMetric}; `;
      } else {
        sendLog({ message: `Skipping ${val} because it has invalid value.`, type: "warning" }, win);
      }
    }

    return { success: true, msg: 'Margin is done', type: 'normal', code: css };
  } catch (error) {
    sendLog({ message: 'There was an error while generating margin css', type: 'error' }, win);
    return { success: false, msg: `There was an error: ${error}`, type: "error" }
  }
}