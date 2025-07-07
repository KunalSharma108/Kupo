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
      "max width": false,
      "max height": false,
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
      "font family": false,
      "font weight": 500,
      "font size": "md",
    },

    margin: {
      "margin top": false,
      "margin bottom": false,
      "margin left": false,
      "margin right": false,
    },

    padding: {
      "padding top": "md",
      "padding bottom": "md",
      "padding left": "lg",
      "padding right": "lg",
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
      "max width": false,
      "max height": false,
    },

    border: {
      "border color": "lightBlue",
      "border width": "Default (2px)",
      "border style": "solid",
      "border radius": 4,
    },

    font: {
      "font color": "lightBlue",
      "font family": false,
      "font weight": false,
      "font size": false,
    },

    margin: {
      "margin top": false,
      "margin bottom": false,
      "margin left": false,
      "margin right": false,
    },

    padding: {
      "padding top": false,
      "padding bottom": false,
      "padding left": false,
      "padding right": false,
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
