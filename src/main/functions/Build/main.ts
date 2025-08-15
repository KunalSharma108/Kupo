import { BrowserWindow } from "electron";
import { sendLog } from "./sendLog";
import { fetchConfig } from "../config";
import { buildNavbar } from "./components/BuildNavbar";

interface buildMainProps {
  project: string;
  win: BrowserWindow
}

export async function buildMain({project, win}: buildMainProps) {
  const data = await fetchConfig(project);

  sendLog({message: 'Fetching Project Data...', type:'normal'}, win)

  data.data.sectionOrders.map(async (val, _idx) => {
    console.log(val)

    if (val.trim() === 'navbar') {
      console.log(data)
      const {htmlBlock, cssBlock} = await buildNavbar({data: data.data.sections[val.trim()], win});

      console.log(htmlBlock, cssBlock)
    }
  })
}