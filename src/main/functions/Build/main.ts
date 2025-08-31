import { BrowserWindow } from "electron";
import { sendLog } from "./sendLog";
import { fetchConfig } from "../config";
import { buildNavbar } from "./components/navbar/BuildNavbar";
import { fullHTML } from "./lib/template/HTML";
import { fontOptions } from "./lib/presets/fonts";
import fs from "fs"
import path from "path";
import { buildHero } from "./components/Hero/BuildHero";

function formatText(css: string): string {
  let indent = 0;
  return css
    .replace(/\s+/g, " ")
    .replace(/\s*{\s*/g, " {\n") 
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/\s*;\s*/g, ";\n")
    .split("\n")
    .map(line => {
      line = line.trim();
      if (line.endsWith("}")) indent--;
      const formatted = "  ".repeat(Math.max(indent, 0)) + line;
      if (line.endsWith("{")) indent++;
      return formatted;
    })
    .join("\n")
    .trim();
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
    `* {margin: 0; padding: 0; box-sizing: border-box; background: transparent; border: none; outline: none;} button {cursor:pointer;} a {text-decoration: none;}`
  );

  for (const val of data.data.sectionOrders) {
    if (val.trim() === 'navbar') {

      sendLog({ message: 'processing navbar...', type: 'normal' }, win);
      const res = await buildNavbar({ data: data.data.sections['navbar'], win, directory });
      html += ` ${res.htmlBlock}`;
      css += ` ${res.cssBlock}`;

    } else if (val.trim() === 'hero') {

      sendLog({ message: 'processing hero', type: 'normal' }, win);
      const res = await buildHero({ data: data.data.sections['hero'], win, directory });
      html += ` ${res.htmlBlock}`;
      css += ` ${res.cssBlock}`;
    }
  }

  css = `${defaultCss}\n${formatText(css)}`;

  const fullCode = await fullHTML({ project, HtmlBlock: html, CssBlock: css });

  console.log(fullCode)

  const filePath = path.join(directory, 'index.html');
  fs.promises.writeFile(filePath, fullCode);

  sendLog({ message: 'done', type: 'normal' }, win)
}