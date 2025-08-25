import { styles } from "../../Presets/Style";

export const defaultNavLogoStyle: styles = {
  styles: {
    background: {
      type: false,
      color: false,
      image: false,
      gradient: false,
      "image + gradient": false
    },

    layout: {
      "horizontal align": 'Left',
      "vertical align": 'Center',
      width: 'Default',
      height: 'Default',
      "max width": "none",
      "max height": "none"
    },

    border: {
      "border color": 'none',
      "border width": "0-px",
      "border style": 'none',
      "border radius": "0-px"
    },

    transition: {
      "transition duration": 200,
      "transition style": 'ease'
    },

    font: false,

    margin: {
      "margin top": "0-px",
      "margin bottom": "0-px",
      "margin left": "0-px",
      "margin right": "0-px"
    },

    padding: {
      "padding top": "0-px",
      "padding bottom": "0-px",
      "padding left": "0-px",
      "padding right": "0-px"
    },

    shadow: {
      "offset x": "0-px",
      "offset y": "0-px",
      "blur radius": "0-px",
      "spread radius": "0-px",
      color: 'Default',
      inset: false
    }
  },

  hoverStyles: {
    background: {
      type: false,
    },

    layout: {
      width: 'Default',
      height: 'Default',
      "max width": "undefined",
      "max height": "undefined"
    },

    border: {
      "border color": 'undefined',
      "border width": "undefined",
      "border style": 'undefined',
      "border radius": "undefined"
    },

    font: false,

    margin: {
      "margin top": "undefined",
      "margin bottom": "undefined",
      "margin left": "undefined",
      "margin right": "undefined"
    },

    padding: {
      "padding top": "undefined",
      "padding bottom": "undefined",
      "padding left": "undefined",
      "padding right": "undefined"
    },

    shadow: {
      "offset x": "undefined",
      "offset y": "undefined",
      "blur radius": "undefined",
      "spread radius": "undefined",
      color: 'white',
      inset: false,
    }
  }
};