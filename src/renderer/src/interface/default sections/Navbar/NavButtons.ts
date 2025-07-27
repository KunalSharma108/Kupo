import { styles } from "@renderer/interface/Presets/Style";
import { ButtonBlock } from "@renderer/interface/Presets/uiBlocks";

export const NavButtonStyle: styles = {
  styles: {
    background: {
      type: false,
      color: false,
      image: false,
      gradient: false,
      "image + gradient": false
    },

    layout: {
      'vertical align': 'undefined',
      'horizontal align': 'undefined',
      width: 'Default',
      height: 'Default',
      'max width': 'Default',
      'max height': 'Default'
    },

    border: {
      'border color': 'none',
      'border width': 'undefined',
      'border style': 'none',
      'border radius': 'none'
    },

    transition: {
      'transition duration': 'undefined',
      "transition style": 'undefined'
    },

    font: {
      "font color": 'Default',
      'font family': 'Default',
      "font weight": 'Default',
      "font size": 'Default'
    },

    margin: {
      "margin top": 'undefined',
      "margin bottom": 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },

    padding: {
      'padding top': 'undefined',
      'padding bottom': 'undefined',
      'padding left': 'undefined',
      "padding right": 'undefined'
    },

    shadow: {
      'offset x': 'undefined',
      "offset y": 'undefined',
      "blur radius": 'undefined',
      "spread radius": 'undefined',
      color: 'undefined',
      inset: 'undefined'
    }
  },

  hoverStyles: {
    background: false,

    layout: {
      'vertical align': 'undefined',
      'horizontal align': 'undefined',
      width: 'Default',
      height: 'Default',
      'max width': 'Default',
      'max height': 'Default'
    },

    border: {
      'border color': 'none',
      'border width': 'undefined',
      'border style': 'none',
      'border radius': 'none'
    },

    font: {
      "font color": 'Default',
      'font family': 'Default',
      "font weight": 'Default',
      "font size": 'Default'
    },

    margin: {
      "margin top": 'undefined',
      "margin bottom": 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },

    padding: {
      'padding top': 'undefined',
      'padding bottom': 'undefined',
      'padding left': 'undefined',
      "padding right": 'undefined'
    },

    shadow: {
      'offset x': 'undefined',
      "offset y": 'undefined',
      "blur radius": 'undefined',
      "spread radius": 'undefined',
      color: 'undefined',
      inset: 'undefined'
    }
  }
}

export const NavButton: ButtonBlock = {
  label: 'Link',
  link: '#',
  style: NavButtonStyle
}

export const NavButtons: ButtonBlock[] = [
  {
    label: 'Link 1',
    link: '#',
    style: NavButtonStyle
  },
  {
    label: 'Link 2',
    link: '#',
    style: NavButtonStyle
  }
]