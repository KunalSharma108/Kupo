import { Navbar } from "../../Types/Navbar";
import { NavButtons } from "./NavButtons";
import { defaultNavLinkStyle } from "./NavLinkStyle";
import { defaultNavLogoStyle } from "./NavLogoStyle";
import { defaultNavStyle } from "./NavStyle";

export const defaultNavbar: Navbar = {
  desc: 'A menu bar at the top of the site that helps visitors navigate between different pages or sections',
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