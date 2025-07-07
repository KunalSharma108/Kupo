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
      width: 'Default',
      height: 'Default',
      'max width': false,
      'max height': false
    },

    border: {
      'border color': false,
      "border width": false,
      "border style": false,
      "border radius": false,
    },

    transition: {
      "transition duration": 200,
      "transition style": 'ease-in-out'
    },

    font: {
      "font color": 'white',
      "font family": false,
      "font weight": false,
      "font size": 'sm'
    },

    margin: {
      "margin top": false,
      "margin bottom": false,
      "margin left": false,
      "margin right": false
    },

    padding: {
      "padding top": 'lg',
      "padding bottom": 'lg',
      "padding left": 'xl',
      "padding right": 'xl'
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
      "padding top": false,
      "padding bottom": false,
      "padding left": false,
      "padding right": false
    },

    margin: {
      "margin top": false,
      "margin bottom": false,
      "margin left": false,
      "margin right": false
    },

    shadow: {
      "offset x": false,
      "offset y": false,
      "blur radius": false,
      "spread radius": false,
      color: false,
      inset: false
    }
  }
};
