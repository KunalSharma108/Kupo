import { styles } from "@renderer/interface/Presets/Style";
import { TextBlock } from "@renderer/interface/Presets/uiBlocks";

export const HeroDefaultTextStyle: styles = {
  styles: {
    background: {
      type: false,
      color: false,
      image: false,
      gradient: false,
      "image + gradient": false
    },

    layout: {
      "horizontal align": 'Center',
      width: 'default',
      height: 'default',
      "max width": 'default',
      "max height": 'default'
    },

    border: {
      "border color": 'none',
      "border radius": 'none',
      "border style": 'none',
      "border width": 'none'
    },

    transition: {
      "transition duration": 'undefined',
      "transition style": 'ease'
    },

    font: {
      "font color": 'white',
      "font family": 'poppins',
      'font size': 'md',
      "font weight": 'Default'
    },

    padding: {
      "padding top": '5-px',
      'padding bottom': '5-px',
      'padding left': '0',
      'padding right': '0'
    },

    margin: {
      "margin top": '5-px',
      'margin bottom': '5-px',
      'margin left': '0',
      "margin right": '0'
    },

    shadow: {
      "offset x": '0',
      'offset y': '0',
      'blur radius': '0',
      "spread radius": '0',
      color: 'none',
      'inset': false
    }
  },
}

export const HeroDefaultTexts: TextBlock[] = [
  {
    text: 'Text 1',
    style: HeroDefaultTextStyle
  },
  {
    text: 'Text 2',
    style: HeroDefaultTextStyle
  }
]

export const HeroText: TextBlock = {
  text: 'Text',
  style: HeroDefaultTextStyle
}