import { styles } from "../../Presets/Style";

export const defaultNavLinkStyle: styles = {
  styles: {
    background: false,

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
      "border radius": "4-px",
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
      "margin top": "0-px",
      "margin bottom": "0-px",
      "margin left": "0-px",
      "margin right": "0-px",
    },

    padding: {
      "padding top": "10-px",
      "padding bottom": "10-px",
      "padding left": "10-px",
      "padding right": "10-px",
    },

    shadow: {
      "offset x": "0-px",
      "offset y": "2-px",
      "blur radius": "4-px",
      "spread radius": "0-px",
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
      "max width": "0-px",
      "max height": "0-px",
    },

    border: {
      "border color": "lightBlue",
      "border width": "Default (2px)",
      "border style": "solid",
      "border radius": "4-px",
    },

    font: {
      "font color": "lightBlue",
      "font family": 'Default',
      "font weight": "0-px",
      "font size": 'Default',
    },

    margin: {
      "margin top": "0-px",
      "margin bottom": "0-px",
      "margin left": "0-px",
      "margin right": "0-px",
    },

    padding: {
      "padding top": "0-px",
      "padding bottom": "0-px",
      "padding left": "0-px",
      "padding right": "0-px",
    },

    shadow: {
      "offset x": "0-px",
      "offset y": "2-px",
      "blur radius": "6-px",
      "spread radius": "0-px",
      color: "lightBlue",
      inset: false,
    },
  },
};
