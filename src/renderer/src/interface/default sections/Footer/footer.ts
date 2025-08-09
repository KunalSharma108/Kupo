import { styles } from "@renderer/interface/Presets/Style";
import { Footer } from "@renderer/interface/Types/Footer";
import { defaultFooterButtons } from "./FooterButton";

export const defaultFooterStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: 'black',
      image: false,
      gradient: false,
      "image + gradient": false,
    },

    layout: {
      "horizontal align": 'Center',
      width: '100-%',
      height: 'fit-content',
      "max width": '100-%',
      'max height': 'fit-content'
    },

    border: {
      "border color": 'black',
      'border radius': '0',
      'border style': 'solid',
      'border width': '2-px'
    },

    transition: {
      'transition duration': undefined,
      'transition style': 'ease'
    },

    font: {
      "font color": 'white',
      'font family': 'inter',
      'font size': 'md',
      'font weight': 600
    },

    margin: {
      "margin top": '10-px',
      "margin bottom": '0-px',
      'margin left': '0-px',
      'margin right': '0-px'
    },

    padding: {
      "padding top": '10-px',
      "padding bottom": '10-px',
      "padding left": '5-px',
      "padding right": '5-px'
    },

    shadow: {
      "offset x": '0',
      'offset y': '0',
      "blur radius": '0',
      "spread radius": '0',
      color: 'none',
      inset: false,
    }
  }
}

export const defaultFooter: Footer = {
  type: 'footer',
  desc: 'The footer is the bottom section of a website that usually contains extra info like copyright, links, and contact details.',
  id: 'footer',
  enabled: true,
  styles: defaultFooterStyle,
  buttons: defaultFooterButtons
}