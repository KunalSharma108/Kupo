import { styles } from "@renderer/interface/Presets/Style";
import { ButtonBlock } from "@renderer/interface/Presets/uiBlocks";

export const defaultFooterButtonStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: '#2d2d2d',
      image: false,
      gradient: false,
      'image + gradient': false
    },
    layout: {
      'vertical align': 'Center',
      'horizontal align': 'Center',
      width: 'auto',
      height: 'auto',
      'max width': 'undefined',
      'max height': 'undefined'
    },
    border: {
      'border color': '#444444',
      'border width': '1px',
      'border style': 'solid',
      'border radius': '4px'
    },
    transition: {
      'transition duration': 200,
      'transition style': 'ease-in-out'
    },
    font: {
      'font color': '#f5f5f5',
      'font family': 'Default',
      'font weight': 500,
      'font size': 'Medium'
    },
    margin: {
      'margin top': 'undefined',
      'margin bottom': 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },
    padding: {
      'padding top': '8px',
      'padding bottom': '8px',
      'padding left': '16px',
      'padding right': '16px'
    },
    shadow: false
  },
  hoverStyles: {
    background: {
      type: 'color',
      color: '#3a3a3a',
      image: false,
      gradient: false,
      'image + gradient': false
    },
    layout: {
      'vertical align': 'Center',
      'horizontal align': 'Center',
      width: 'auto',
      height: 'auto',
      'max width': 'undefined',
      'max height': 'undefined'
    },
    border: {
      'border color': '#555555',
      'border width': '1px',
      'border style': 'solid',
      'border radius': '4px'
    },
    font: {
      'font color': '#ffffff',
      'font family': 'Default',
      'font weight': '500',
      'font size': 'Medium'
    },
    margin: {
      'margin top': 'undefined',
      'margin bottom': 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },
    padding: {
      'padding top': '8px',
      'padding bottom': '8px',
      'padding left': '16px',
      'padding right': '16px'
    },
    shadow: {
      "offset x": 'undefined',
      'offset y': 'undefined',
      'blur radius': 'undefined',
      "spread radius": 'undefined',
      color: 'none',
      inset: false,
    }
  }
};



export const defaultFooterButtons: ButtonBlock[] = [
  {
    label: 'Footer Link',
    link: '#',
    style: defaultFooterButtonStyle
  }
]