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
      'border radius': '0-px',
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
      'font size': 'medium',
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
      "offset x": '0-px',
      'offset y': '0-px',
      "blur radius": '0-px',
      "spread radius": '0-px',
      color: 'none',
      inset: false,
    }
  }
}


export const defaultGlobalButtonStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: '#2d2d2d',
      image: false,
      gradient: false,
      'image + gradient': false
    },
    layout: {
      'horizontal align': 'Center',
      width: 'auto',
      height: 'auto',
      'max width': 'undefined',
      'max height': 'undefined'
    },
    border: {
      'border color': '#444444',
      'border width': '1-px',
      'border style': 'solid',
      'border radius': '4-px'
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
      'padding top': '8-px',
      'padding bottom': '8-px',
      'padding left': '16-px',
      'padding right': '16-px'
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
      width: 'auto',
      height: 'auto',
      'max width': 'undefined',
      'max height': 'undefined'
    },
    border: {
      'border color': '#555555',
      'border width': '1-px',
      'border style': 'solid',
      'border radius': '4-px'
    },
    font: {
      'font color': '#ffffff',
      'font family': 'Default',
      'font weight': '500-px',
      'font size': 'Medium'
    },
    margin: {
      'margin top': 'undefined',
      'margin bottom': 'undefined',
      'margin left': 'undefined',
      'margin right': 'undefined'
    },
    padding: {
      'padding top': '8-px',
      'padding bottom': '8-px',
      'padding left': '16-px',
      'padding right': '16-px'
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


export const defaultFooter: Footer = {
  type: 'footer',
  desc: 'The footer is the bottom section of a website that usually contains extra info like copyright, links, and contact details.',
  id: 'footer',
  enabled: true,
  style: defaultFooterStyle,

  globalDefaultButtonStyle: defaultGlobalButtonStyle,

  buttons: defaultFooterButtons,
}