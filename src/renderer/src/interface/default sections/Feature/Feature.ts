import { Feature } from "@renderer/interface/Types/Feature";
import { defaultFeaturesBlocks } from "./FeatureBlocks";
import { styles } from "@renderer/interface/Presets/Style";

export const defaultFeatureStyle: styles = {
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
      "max width": '100-%',
      "max height": 'fit-content'
    },

    border: {
      "border color": 'none',
      "border radius": 'none',
      "border style": 'none',
      'border width': 'none'
    },

    font: {
      "font color": 'white',
      "font family": 'quicksand',
    },

    padding: {
      "padding top": '10-px',
      'padding bottom': '10-px',
      'padding left': '5-px',
      'padding right': '5-px',
    },

    margin: {
      "margin top": '10-px',
      "margin bottom": '10-px',
      "margin left": '0',
      "margin right":  '0'
    },

    shadow:{
      "offset x": '0',
      "offset y": '0',
      'blur radius': '0',
      'spread radius': '0',
      color: 'none',
      inset: false
    }
  }
}

export const defaultFeature: Feature = {
  name:'feature',
  type: 'Feature',
  id: 'feature',
  enabled: true,

  heading: 'Feature Heading!',
  blocks: defaultFeaturesBlocks,

  startWith: 'text-left-aligned',

  style: defaultFeatureStyle
}