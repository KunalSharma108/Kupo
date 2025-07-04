import { Navbar } from "../../Types/Navbar";
import { defaultNavLinkStyle } from "./NavLinkStyle";
import { defaultNavLogoStyle } from "./NavLogoStyle";
import { defaultNavStyle } from "./NavStyle";

export const defaultNavbar: Navbar = {
  type: 'Navbar',
  enabled: true,
  sticky: false,

  logo: {
    logoURL: false,
    style: defaultNavLogoStyle
  }, 

  navLinks: false,
  navLinkStyle: defaultNavLinkStyle,
  navLinksPosition: false,

  style: defaultNavStyle
}