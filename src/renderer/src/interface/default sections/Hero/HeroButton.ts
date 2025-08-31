import { styles } from "@renderer/interface/Presets/Style";
import { ButtonBlock } from "@renderer/interface/Presets/uiBlocks";

export const HeroDefaultButtonStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: 'green',
      image: false,
      gradient: false,
      "image + gradient": false,
    },

    layout: {
      "horizontal align": 'Center',
      width: 'Default',
      height: 'Default',
      "max width": 'Default',
      "max height": 'Default'
    },

    border: {
      "border color": 'none',
      "border radius": '0-px',
      "border style": 'none',
      "border width": '0-px'
    },

    transition: {
      "transition duration": 'undefined',
      "transition style": 'ease'
    },

    font: {
      "font color": 'white',
      "font family": 'inter',
      "font size": 'small',
      "font weight": 'Default'
    },

    padding: {
      "padding top": '10-px',
      "padding bottom": '10-px',
      "padding left": '5-px',
      "padding right": '5-px',
    },

    margin: {
      "margin top": '0-px',
      "margin bottom": '0-px',
      "margin left": '0-px',
      "margin right": '0-px'
    },

    shadow: {
      'offset x': 'undefined',
      'offset y': 'undefined',
      'blur radius': 'undefined',
      'spread radius': 'undefined',
      color: 'undefined',
      inset: false,
    }
  },

  hoverStyles: {
    background: {
      type: false,
      color: false,
      image: false,
      gradient: false,
      "image + gradient": false,
    },

    layout: {
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

export const HeroDefaultButtons: ButtonBlock[] = [
  {
    label: 'Hero button 1',
    link: '#',
    style: HeroDefaultButtonStyle
  },
  {
    label: 'Hero button 2',
    link: '#',
    style: HeroDefaultButtonStyle
  }
]

export const HeroButton: ButtonBlock = {
  label: 'Hero button',
  link: '#',
  style: HeroDefaultButtonStyle
}