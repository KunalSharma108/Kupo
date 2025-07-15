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
      "max width": 0,
      "max height": 0
    },

    border: {
      "border color": 'none',
      "border width": 0,
      "border style": 'none',
      "border radius": 0
    },

    transition: {
      "transition duration": 200,
      "transition style": 'ease'
    },

    font: false,

    margin: {
      "margin top": 0,
      "margin bottom": 0,
      "margin left": 0,
      "margin right": 0
    },

    padding: {
      "padding top": 0,
      "padding bottom": 0,
      "padding left": 0,
      "padding right": 0
    },

    shadow: {
      "offset x": 0,
      "offset y": 0,
      "blur radius": 0,
      "spread radius": 0,
      color: 'Default',
      inset: false
    }
  },

  hoverStyles: {
    background: {
      type: false,
    },

    layout: {
      "horizontal align": 'Left',
      "vertical align": 'Center',
      width: 'Default',
      height: 'Default',
      "max width": 0,
      "max height": 0
    },

    border: {
      "border color": 'none',
      "border width": 0,
      "border style": 'none',
      "border radius": 0
    },

    font: false,

    margin: {
      "margin top": 0,
      "margin bottom": 0,
      "margin left": 0,
      "margin right": 0
    },

    padding: {
      "padding top": 0,
      "padding bottom": 0,
      "padding left": 0,
      "padding right": 0
    },

    shadow: {
      "offset x": 0,
      "offset y": 0,
      "blur radius": 0,
      "spread radius": 0,
      color: 'white',
      inset: false,
    }
  }
};