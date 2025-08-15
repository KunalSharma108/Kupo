import { BrowserWindow } from "electron";

interface returnProps {
  htmlBlock: string;
  cssBlock: string;
}

interface HeroProps {
  data: any;
  win: BrowserWindow;
}

export async function buildHero({ data, win }: HeroProps): Promise<returnProps> {

  console.log(data)

  return { htmlBlock: '', cssBlock: '' }
}