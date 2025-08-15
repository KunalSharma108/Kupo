import { BrowserWindow } from "electron";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

interface featureProps {
  data: any;
  win: BrowserWindow;
}

export async function buildNavbar({ data, win }: featureProps): Promise<returnProps> {

  console.log(data)

  return { htmlBlock: '', cssBlock: '' }
}