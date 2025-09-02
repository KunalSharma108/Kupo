import { BrowserWindow } from "electron";
import { getProps } from "../../lib/presets/getProps";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

export async function buildNavbar({ data, win, directory }: getProps): Promise<returnProps> {
  let html: string = '';
  let css: string = '';

  console.log(data, win , directory)

  return { htmlBlock: html, cssBlock: css }
}