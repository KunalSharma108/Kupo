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
      width: '100%',
      height: 'fit-content',
      'max width': 'none',
      'max height': 'none'
    },

    border: {
      'border color': 'none',
      "border width": 0,
      "border style": 'none',
      "border radius": 0,
    },

    transition: {
      "transition duration": 200,
      "transition style": 'ease-in-out'
    },

    font: {
      "font color": 'white',
      "font family": 'Default',
      "font weight": 'Default',
      "font size": 'sm'
    },

    margin: {
      "margin top": 0,
      "margin bottom": 0,
      "margin left": 0,
      "margin right": 0
    },

    padding: {
      "padding top": 10,
      "padding bottom": 10,
      "padding left": 10,
      "padding right": 10
    },

    shadow: {
      "offset x": 0,
      "offset y": 4,
      "blur radius": 12,
      "spread radius": 0,
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
      "padding top": 0,
      "padding bottom": 0,
      "padding left": 0,
      "padding right": 0
    },

    margin: {
      "margin top": 0,
      "margin bottom": 0,
      "margin left": 0,
      "margin right": 0
    },

    shadow: {
      "offset x": 0,
      "offset y": 0,
      "blur radius": 0,
      "spread radius": 0,
      color: 'white',
      inset: false
    }
  }
};
