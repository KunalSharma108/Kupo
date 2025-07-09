import { styles } from "../../Presets/Style";

export const defaultNavLinkStyle: styles = {
  styles: {
    background: {
      type: "color",
      color: "transparent",
    },

    layout: {
      "vertical align": "Center",
      "horizontal align": "Right",
      width: "Default",
      height: "Default",
      "max width": 'Default',
      "max height": 'Default',
    },

    border: {
      "border color": "white",
      "border width": "Default (2px)",
      "border style": "none",
      "border radius": 4,
    },

    transition: {
      "transition duration": 200,
      "transition style": "ease-in-out",
    },

    font: {
      "font color": "white",
      "font family": 'Default',
      "font weight": 500,
      "font size": "md",
    },

    margin: {
      "margin top": 0,
      "margin bottom": 0,
      "margin left": 0,
      "margin right": 0,
    },

    padding: {
      "padding top": 10,
      "padding bottom": 10,
      "padding left": 10,
      "padding right": 10,
    },

    shadow: {
      "offset x": 0,
      "offset y": 2,
      "blur radius": 4,
      "spread radius": 0,
      color: "black",
      inset: false,
    },
  },

  hoverStyles: {
    background: {
      type: "color",
      color: "lightBlue",
    },

    layout: {
      "vertical align": "Center",
      "horizontal align": "Right",
      width: "Default",
      height: "Default",
      "max width": 0,
      "max height": 0,
    },

    border: {
      "border color": "lightBlue",
      "border width": "Default (2px)",
      "border style": "solid",
      "border radius": 4,
    },

    font: {
      "font color": "lightBlue",
      "font family": 'Default',
      "font weight": 0,
      "font size": 'Default',
    },

    margin: {
      "margin top": 0,
      "margin bottom": 0,
      "margin left": 0,
      "margin right": 0,
    },

    padding: {
      "padding top": 0,
      "padding bottom": 0,
      "padding left": 0,
      "padding right": 0,
    },

    shadow: {
      "offset x": 0,
      "offset y": 2,
      "blur radius": 6,
      "spread radius": 0,
      color: "lightBlue",
      inset: false,
    },
  },
};
