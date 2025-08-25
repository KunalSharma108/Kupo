import { styles } from "../../Presets/Style";

export const defaultNavStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: 'blue',
      image: false,
      gradient: false,
      'image + gradient': false
    },

    layout: {
      width: '100-%',
      height: 'fit-content',
      'max width': 'none',
      'max height': 'none'
    },

    border: {
      'border color': 'none',
      "border width": "0-px",
      "border style": 'none',
      "border radius": "0-px",
    },

    transition: {
      "transition duration": 200,
      "transition style": 'ease-in-out'
    },

    font: {
      "font color": 'white',
      "font family": 'Default',
      "font weight": 'Default',
      "font size": 'small'
    },

    margin: {
      "margin top": "0-px",
      "margin bottom": "0-px",
      "margin left": "0-px",
      "margin right": "0-px"
    },

    padding: {
      "padding top": "10-px",
      "padding bottom": "10-px",
      "padding left": "10-px",
      "padding right": "10-px"
    },

    shadow: {
      "offset x": "0-px",
      "offset y": "4-px",
      "blur radius": "12-px",
      "spread radius": "0-px",
      color: 'black',
      inset: false
    }
  },

  hoverStyles: {
    background: {
      type: false,
      color: false,
      image: false,
      gradient: false,
      'image + gradient': false
    },

    padding: {
      "padding top": "undefined",
      "padding bottom": "undefined",
      "padding left": "undefined",
      "padding right": "undefined"
    },

    margin: {
      "margin top": "undefined",
      "margin bottom": "undefined",
      "margin left": "undefined",
      "margin right": "undefined"
    },

    shadow: {
      "offset x": "undefined",
      "offset y": "undefined",
      "blur radius": "undefined",
      "spread radius": "undefined",
      color: 'white',
      inset: false
    }
  }
};
