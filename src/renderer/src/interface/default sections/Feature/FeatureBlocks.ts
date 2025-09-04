import { FeatureBlock } from "@renderer/interface/Presets/uiBlocks";
import { defaultFeatureTitle } from "./FeatureTitle";
import { featureBlockDesc } from "./FeatureDesc";
import { styles } from "@renderer/interface/Presets/Style";

export const featureBlockStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: 'black',
      image: false,
      gradient: false,
      "image + gradient": false
    },

    layout: {
      width: '100-%',
      height: 'fit-content',
      "max height": 'fit-content',
      'max width': '100-%'
    },

    border: {
      "border color": 'black',
      'border radius': '0-px',
      'border style': 'solid',
      'border width': '2-px'
    },

    transition: {
      "transition duration": 'undefined',
      "transition style": 'ease'
    },

    font: {
      "font color": 'white',
      'font family': 'quicksand',
    },

    padding: {
      "padding top": '10-px',
      'padding bottom': '10-px',
      'padding left': '5-px',
      'padding right': '5-px'
    },

    margin: {
      'margin top': '5-px',
      'margin bottom': '5-px',
      'margin left': '0-px',
      'margin right': '0-px'
    },

    shadow: {
      "offset x": '0-px',
      "offset y": '0-px',
      'blur radius': '0-px',
      'spread radius': '0-px',
      color: 'none',
      inset: false
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

export const defaultFeaturesBlocks: FeatureBlock[] = [
  {
    title: defaultFeatureTitle,
    id: 'featureBlock1',
    description: featureBlockDesc,
    style: featureBlockStyle,
    imageURl: 'false'
  }
]

export const singleFeatureBlock: FeatureBlock = {
  title: defaultFeatureTitle,
  id: 'featureBlock',
  description: featureBlockDesc,
  style: featureBlockStyle,
  imageURl: 'false'
}