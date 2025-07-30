import { Navbar } from "../../Types/Navbar";
import { NavButtons } from "./NavButtons";
import { defaultNavLinkStyle } from "./NavLinkStyle";
import { defaultNavLogoStyle } from "./NavLogoStyle";
import { defaultNavStyle } from "./NavStyle";

export const defaultNavbar: Navbar = {
  id:'navbar',
  type: 'Navbar',
  enabled: true,
  sticky: false,

  logo: {
    logoURL: false,
    style: defaultNavLogoStyle
  }, 

  navLinks: NavButtons,
  navLinkStyle: defaultNavLinkStyle,

  style: defaultNavStyle
}