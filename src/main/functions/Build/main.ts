import { BrowserWindow } from "electron";
import { sendLog } from "./sendLog";
import { fetchConfig } from "../config";
import { buildNavbar } from "./components/BuildNavbar";
import { buildHero } from "./components/BuildHero";
import { fullHTML } from "./lib/template/HTML";

interface buildMainProps {
  project: string;
  directory: string;
  win: BrowserWindow;
}

export async function buildMain({ project, directory, win }: buildMainProps) {
  const data = await fetchConfig(project);

  console.log(directory)

  sendLog({ message: 'Fetching Project Data...', type: 'normal' }, win);

  let html = ``;
  let css = ``;

  for (const val of data.data.sectionOrders) {
    if (val.trim() === 'navbar') {

      sendLog({ message: 'processing navbar...', type: 'normal' }, win);
      const res = await buildNavbar({ data: data.data.sections[val.trim()], win, directory});
      html += ` ${res.htmlBlock}`;
      css += ` ${res.cssBlock}`;

    } else if (val.trim() === 'hero') {

      sendLog({ message: 'processing hero', type: 'normal' }, win);
      const res = await buildHero({ data: data.data.sections[val.trim()], win });
      html += ` ${res.htmlBlock}`;
      css += ` ${res.cssBlock}`;
    }
  }

  const fullCode = await fullHTML({ project, HtmlBlock: html, CssBlock: css });

}