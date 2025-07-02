import { styles } from "../Presets/Style";
import { TextBlock } from "../Presets/uiBlocks";

export interface Timeline {
  type: "Timeline";
  desc: 'A vertical list that shows your journey or progress over time — like milestones, work history, or project phases, in the order they happened.';
  id: string;
  enabled: boolean;
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
