import { styles } from "../Presets/Style";
import { TextBlock } from "../Presets/uiBlocks";

export interface TimelineSection {
  id: string;
  type: "timeline";
  visible: boolean;
  sectionTitle?: TextBlock;
  layoutStyle: "vertical" | "horizontal" | "stacked";
  styles?: styles;
  entries: TimelineEntry[];
}

export interface TimelineEntry {
  id: string;
  title: TextBlock;
  subtitle?: TextBlock;
  dateRange: string;
  description?: TextBlock;
}
