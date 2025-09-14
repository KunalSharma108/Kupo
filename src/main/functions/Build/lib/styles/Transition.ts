import { BrowserWindow } from "electron";
import { cssReturnProps } from "../template/props";
import { sendLog } from "../../sendLog";

interface getTranstionProps {
  transition: {
    'transition duration': undefined | 'undefined' | any;
    'transition style': 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'undefined';
  }

  win: BrowserWindow;
}

export async function getTransition({ transition, win }: getTranstionProps): Promise<cssReturnProps> {
  try {
    let css = '';

    if (transition["transition duration"] !== undefined &&
      transition["transition duration"].toLowerCase() !== 'undefined' &&
      transition["transition style"] === 'undefined'
    ) {
      css += `transition-duration: ${transition["transition duration"]}ms; `
    } else if (transition["transition duration"] !== undefined &&
      transition["transition duration"] !== 'undefined' &&
      transition["transition style"] !== 'undefined'
    ) {
      css += `transition: all ${transition["transition duration"]}ms ${transition["transition style"]}; `
    } else {
      sendLog({ message: `transition duration has an unexpected value of ${transition["transition duration"]}`, type: 'error' }, win);
    }

    return { success: true, msg: 'Transition css generated successfully', type: 'normal', code: css }
  } catch (error) {

    return { success: false, msg: `There was an error while generating transition css: ${error}`, type: 'error' }
  }
}