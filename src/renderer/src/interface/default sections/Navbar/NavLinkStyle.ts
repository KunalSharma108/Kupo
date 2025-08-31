import { styles } from "../../Presets/Style";

export const defaultNavLinkStyle: styles = {
  styles: {
    background: {
      type: false,
      color: false,
      image: false,
      gradient: false,
      "image + gradient": false
    },

    layout: {
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
      "font size": "normal",
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
      type:false,
      color: false,
      image: false,
      gradient: false,
      "image + gradient": false,
    },

    layout: {
      width: "Default",
      height: "Default",
      "max width": "undefined",
      "max height": "undefined",
    },

    border: {
      "border color": "undefined",
      "border width": "undefined",
      "border style": "undefined",
      "border radius": "undefined",
    },

    font: {
      "font color": "undefined",
      "font family": 'undefined',
      "font weight": "undefined",
      "font size": 'undefined',
    },

    margin: {
      "margin top": "undefined",
      "margin bottom": "undefined",
      "margin left": "undefined",
      "margin right": "undefined",
    },

    padding: {
      "padding top": "undefined",
      "padding bottom": "undefined",
      "padding left": "undefined",
      "padding right": "undefined",
    },

    shadow: {
      "offset x": "undefined",
      "offset y": "undefined",
      "blur radius": "undefined",
      "spread radius": "undefined",
      color: "lightBlue",
      inset: false,
    },
  },
};
