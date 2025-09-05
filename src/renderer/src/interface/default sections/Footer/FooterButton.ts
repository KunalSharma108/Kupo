import { styles } from "@renderer/interface/Presets/Style";
import { ButtonBlock } from "@renderer/interface/Presets/uiBlocks";

export const defaultFooterButtonStyle: styles = {
  styles: {
    background: {
      type: false,
      color: false,
      image: false,
      gradient: false,
      'image + gradient': false
    },
    layout: {
      width: 'undefined',
      height: 'undefined',
      'max width': 'undefined',
      'max height': 'undefined'
    },
    border: {
      'border color': 'none',
      'border width': 'undefined',
      'border style': 'undefined',
      'border radius': 'none'
    },
    transition: {
      'transition duration': 'undefined',
      'transition style': 'undefined'
    },
    font: {
      'font color': 'Default',
      'font family': 'Default',
      'font weight': 'Default',
      'font size': 'Default'
    },
    margin: {
      'margin top': 'undefined',
      'margin bottom': 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },
    padding: {
      'padding top': 'undefined',
      'padding bottom': 'undefined',
      'padding left': 'undefined',
      'padding right': 'undefined'
    },
    shadow: {
      'offset x': 'undefined',
      'offset y': 'undefined',
      'blur radius': 'undefined',
      'spread radius': 'undefined',
      color: 'undefined',
      inset: 'undefined'
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
    layout: {
      'vertical align': 'undefined',
      'horizontal align': 'undefined',
      width: 'undefined',
      height: 'undefined',
      'max width': 'undefined',
      'max height': 'undefined'
    },
    border: {
      'border color': 'none',
      'border width': 'undefined',
      'border style': 'undefined',
      'border radius': 'none'
    },
    font: {
      'font color': 'Default',
      'font family': 'Default',
      'font weight': 'Default',
      'font size': 'Default'
    },
    margin: {
      'margin top': 'undefined',
      'margin bottom': 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },
    padding: {
      'padding top': 'undefined',
      'padding bottom': 'undefined',
      'padding left': 'undefined',
      'padding right': 'undefined'
    },
    shadow: {
      'offset x': 'undefined',
      'offset y': 'undefined',
      'blur radius': 'undefined',
      'spread radius': 'undefined',
      color: 'undefined',
      inset: 'undefined'
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

export const defaultFooterButton: ButtonBlock = {
  label: 'Footer Link',
  link: '#',
  style: defaultFooterButtonStyle
}