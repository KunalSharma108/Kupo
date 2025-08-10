import { Hero } from "@renderer/interface/Types/Hero";
import { HeroDefaultTexts } from "./HeroText";
import { HeroDefaultButtons } from "./HeroButton";
import { styles } from "@renderer/interface/Presets/Style";

export const HeroDefaultStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: 'blue',
      image: false,
      gradient: false,
      "image + gradient": false,
    }, 

    layout: {
      width: 'default',
      height: 'default',
      "max width": 'defauult',
      "max height": 'default'
    },

    border: {
      "border color": 'none',
      'border radius': 'none',
      'border style': 'none',
      'border width': '0'
    },

    transition: {
      "transition duration": 'undefined',
      "transition style": 'ease'
    },

    font: {
      "font color": 'white',
      "font family": 'poppins',
      'font size': 'small',
      'font weight': 'Default'
    },

    padding: {
      "padding top": '10-px',
      'padding bottom': '10-px',
      'padding left': '20-px',
      'padding right': '20-px'
    },

    margin: {
      'margin top': '0',
      'margin bottom': '0',
      'margin left': '0',
      'margin right': '0'
    },

    shadow: {
      'offset x': '0',
      'offset y': '0',
      'blur radius': '0',
      'spread radius': '0',
      'color': 'none',
      'inset': false
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
      width: 'default',
      height: 'default',
      "max width": 'defauult',
      "max height": 'default'
    },

    border: {
      "border color": 'undefined',
      'border radius': 'undefined',
      'border style': undefined,
      'border width': 'undefined'
    },

    font: {
      "font color": 'undefined',
      "font family": 'undefined',
      'font size': 'undefined',
      'font weight': 'undefined'
    },

    padding: {
      "padding top": 'undefined',
      'padding bottom': 'undefined',
      'padding left': 'undefined',
      'padding right': 'undefined'
    },

    margin: {
      'margin top': 'undefined',
      'margin bottom': 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },

    shadow: {
      'offset x': 'undefined',
      'offset y': 'undefined',
      'blur radius': 'undefined',
      'spread radius': 'undefined',
      'color': 'undefined',
      'inset': false
    }
  }
}

export const defaultHero: Hero = {
  desc: 'The big intro area you see first, it usually contains a catchy headline, a short message, and maybe a button or image to grab attention',
  type: 'Hero',
  id: 'hero',
  enabled: true,
  texts: HeroDefaultTexts,
  buttons: HeroDefaultButtons,
  style: HeroDefaultStyle
}