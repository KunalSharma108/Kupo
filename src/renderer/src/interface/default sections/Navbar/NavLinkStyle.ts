import { styles } from "../../Presets/Style";

export const defaultNavLinkStyle: styles = {
  styles: {
    background: {
      type: "color",
      color: "transparent",
    },

    layout: {
      verticalAlign: "Center",
      horizontalAlign: "Right",
      width: "Default",
      height: "Default",
      maxWidth: false,
      maxHeight: false,
    },

    border: {
      borderColor: "white",
      borderWidth: "Default (2px)",
      borderStyle: "none",
      borderRadius: 4,
    },

    transition: {
      transitionDuration: 200,
      transitionStyle: "ease-in-out",
    },

    font: {
      fontColor: "white",
      fontFamily: false,
      fontWeight: 500,
      fontSize: "md",
    },

    margin: {
      marginTop: false,
      marginBottom: false,
      marginLeft: false,
      marginRight: false,
    },

    padding: {
      paddingTop: "md",
      paddingBottom: "md",
      paddingLeft: "lg",
      paddingRight: "lg",
    },

    shadow: {
      offsetX: 0,
      offsetY: 2,
      blurRadius: 4,
      spreadRadius: 0,
      color: "black",
      inset: false,
    },
  },

  hoverStyles: {
    background: {
      type: "color",
      color: "lightBlue",
    },

    layout: {
      verticalAlign: "Center",
      horizontalAlign: "Right",
      width: "Default",
      height: "Default",
      maxWidth: false,
      maxHeight: false,
    },

    border: {
      borderColor: "lightBlue",
      borderWidth: "Default (2px)",
      borderStyle: "solid",
      borderRadius: 4,
    },

    transition: {
      transitionDuration: 200,
      transitionStyle: "ease-in-out",
    },

    font: {
      fontColor: "lightBlue",
      fontFamily: false,
      fontWeight: false,
      fontSize: false,
    },

    margin: {
      marginTop: false,
      marginBottom: false,
      marginLeft: false,
      marginRight: false,
    },

    padding: {
      paddingTop: false,
      paddingBottom: false,
      paddingLeft: false,
      paddingRight: false,
    },

    shadow: {
      offsetX: 0,
      offsetY: 2,
      blurRadius: 6,
      spreadRadius: 0,
      color: "lightBlue",
      inset: false,
    },
  },
};
