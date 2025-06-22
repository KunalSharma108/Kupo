export type TextAlign = 'Left' | 'Center' | 'Right';

export interface NavLink {
  label: string;
  href: string;
}

export interface Navbar {
  enabled: boolean;
  sticky: boolean;
  logo?: string;
  logoPosition: TextAlign;
  navLinks?: NavLink[];
  navLinksPosition: TextAlign;
  styles: {
    backgroundColor: string;
    textColor: string;
    fontSize: string;
    fontFamily: string; 
    hoverEffect?: 'underline' | 'scale' | 'color' | 'none';
    padding?: string;
  };
}
