import { BrowserWindow } from "electron";
import { sendLog } from "./sendLog";
import { fetchConfig } from "../config";
import { buildNavbar } from "./components/BuildNavbar";
import { buildHero } from "./components/BuildHero";
import { fullHTML } from "./lib/template/HTML";
import { fontOptions } from "./lib/presets/fonts";

function formatText(text: string): string {
  let result = text.replace(/ {2,}/g, " ");
  result = result.replace(/;/g, ";\n");
  result = result.replace(/}/g, "}\n");
  result = result.replace(/;\n/g, ";\n ");
  result = result.replace(/{\n/g, "{\n  ");
  return result.trim();
}

interface buildMainProps {
  project: string;
  directory: string;
  win: BrowserWindow;
}

export async function buildMain({ project, directory, win }: buildMainProps) {
  const data = await fetchConfig(project);

  sendLog({ message: 'Fetching Project Data...', type: 'normal' }, win);

  let html = ``;
  let css = ``;

  let defaultCss = '';

  Object.values(fontOptions).map((val) => {
    defaultCss += `${val.import}\n`
  });

  defaultCss += formatText(
    `* {margin: 0; padding: 0; box-sizing: border-box; background: transparent; border: none; outline: none;} button {cursor:pointer;}`
  );

  for (const val of data.data.sectionOrders) {
    if (val.trim() === 'navbar') {

      sendLog({ message: 'processing navbar...', type: 'normal' }, win);
      const res = await buildNavbar({ data: data.data.sections[val.trim()], win, directory });
      html += ` ${res.htmlBlock}`;
      css += ` ${res.cssBlock}`;

    }
    // } else if (val.trim() === 'hero') {

    //   sendLog({ message: 'processing hero', type: 'normal' }, win);
    //   const res = await buildHero({ data: data.data.sections[val.trim()], win });
    //   html += ` ${res.htmlBlock}`;
    //   css += ` ${res.cssBlock}`;
    // }
  }

  css = `${defaultCss}\n${formatText(css)}`;

  const fullCode = await fullHTML({ project, HtmlBlock: html, CssBlock: css });

  console.log(fullCode);
}