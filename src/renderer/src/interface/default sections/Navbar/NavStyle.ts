import { styles } from "../../Presets/Style";

export const defaultNavStyle: styles = {
  styles: {
    background: {
      type: 'color',
      color: 'blue',
      image: undefined,
      gradient: undefined,
      'image + gradient': undefined
    },

    layout: {
      width: 'Default',
      height: 'Default',
      maxWidth: false,
      maxHeight: false
    },

    border: {
      borderColor: false,
      borderWidth: false,
      borderStyle: false,
      borderRadius: false
    },

    transition: {
      transitionDuration: 200,
      transitionStyle: 'ease-in-out'
    },

    font: {
      fontColor: 'white',
      fontFamily: false,
      fontWeight: false,
      fontSize: 'sm'
    },

    margin: {
      marginTop: false,
      marginBottom: false,
      marginLeft: false,
      marginRight: false
    },

    padding: {
      paddingTop: 'lg',
      paddingBottom: 'lg',
      paddingLeft: 'xl',
      paddingRight: 'xl'
    },

    shadow: {
      offsetX: 0,
      offsetY: 4,
      blurRadius: 12,
      spreadRadius: 0,
      color: 'black',
      inset: false
    }
  },

  hoverStyles: {
    background: {
      type: false,
      color: undefined,
      image: undefined,
      gradient: undefined,
      'image + gradient': undefined
    },

    padding: {
      paddingTop: false,
      paddingBottom: false,
      paddingLeft: false,
      paddingRight: false
    },

    margin: {
      marginTop: false,
      marginBottom: false,
      marginLeft: false,
      marginRight: false
    },

    shadow: {
      offsetX: false,
      offsetY: false,
      blurRadius: false,
      spreadRadius: false,
      color: false,
      inset: false
    }
  }
};
