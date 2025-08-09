import { styles } from "@renderer/interface/Presets/Style";
import { FeatureBlockDesc } from "@renderer/interface/Presets/uiBlocks";

export const featureDescStyle: styles = {
  styles: {
    layout: {
      'vertical align': 'Center',
      "horizontal align": 'Center',
      width: '100-%',
      height: 'fit-content',
      "max width": '100-%',
      'max height': 'fit-content'
    },

    border: {
      "border color": 'none',
      'border radius': 'none',
      'border style': 'none',
      'border width': 'none'
    },

    transition: {
      "transition duration": 'undefined',
      "transition style": 'ease'
    },

    font: {
      "font color": 'white',
      'font family': 'poppins',
      'font size': 'small',
      "font weight": 400,
    },

    padding: {
      "padding top": '5-px',
      'padding bottom': '5-px',
      'padding left': '10-px',
      'padding right': '10-px'
    },

    margin: {
      "margin top": '10-px',
      'margin bottom': '10-px',
      'margin left': '5-px',
      'margin right': '5-px'
    },

    shadow: {
      'offset x': '0',
      'offset y': '0',
      'blur radius': '0',
      'spread radius': '0',
      color: 'none',
      inset: false
    }
  },

  hoverStyles: {
    layout: {
      "vertical align": 'undefined',
      'horizontal align': 'undefined',
      width: 'Default',
      height: 'Default',
      "max width": 'Default',
      "max height": 'Default'
    },

    border: {
      "border color": 'undefined',
      "border radius": 'undefined',
      "border style": undefined,
      "border width": 'undefined'
    },

    font: {
      "font color": 'undefined',
      "font family": 'undefined',
      "font size": 'undefined',
      "font weight": 'undefined',
    },

    padding: {
      "padding top": 'undefined',
      "padding bottom": 'undefined',
      "padding left": 'undefined',
      "padding right": 'undefined',
    },

    margin: {
      "margin top": 'undefined',
      "margin bottom": 'undefined',
      "margin left": 'undefined',
      "margin right": 'undefined'
    },

    shadow: {
      'offset x': 'undefined',
      'offset y': 'undefined',
      'blur radius': 'undefined',
      'spread radius': 'undefined',
      color: 'undefined',
      inset: false,
    }
  }
}

export const featureBlockDesc: FeatureBlockDesc = {
  text: 'Feature Description',
  style: featureDescStyle
}