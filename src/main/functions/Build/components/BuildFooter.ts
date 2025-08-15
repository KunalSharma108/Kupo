import { BrowserWindow } from "electron";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

interface footerProps {
  data: any;
  win: BrowserWindow;
}

export async function buildNavbar({ data, win }: footerProps): Promise<returnProps> {

  console.log(data)

  return { htmlBlock: '', cssBlock: '' }
}