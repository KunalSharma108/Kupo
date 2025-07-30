import React, { useEffect, useState, useRef } from 'react'
import '../../styles/render.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faImage, faLink, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { StyleDialog } from './styleDialog'
import { selectImage } from '@renderer/lib/ipc'
import '../../styles/fontFamily.css'
import { NavButton } from '@renderer/interface/default sections/Navbar/NavButtons'

interface RenderSectionProps {
  type: string
  data: any
  styleContent: string
  updateData: any
}

function RenderSection({ type, data, styleContent, updateData }: RenderSectionProps): React.JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoDropdownOpen, setLogoDropdownOpen] = useState(false);
  const navDropdownRef = useRef<HTMLDivElement>(null);
  const logoDropdownRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(data?.sticky ?? false);
  const [styleWarning, setStyleWarning] = useState<string | null>(null);
  const [dialogData, setDialogData] = useState<null | {
    styleContent: string;
    styleContentType: string[];
    styleType: string;
    type: string;
    subType: string;
    value: any;
  }>(null);

  const openStyleDialog = (
    styleContent: string,
    styleContentType: string[],
    styleType: string,
    type: string,
    subType: string,
    value: any
  ) => {

    if (type.toLowerCase() === 'background' && subType.toLowerCase() !== 'type') {
      const resolvePath = (obj: any, path: string[]) => {
        return path.reduce((acc, key) => {
          return acc?.[key] !== undefined ? acc[key] : undefined
        }, obj);
      }
      const PATH = resolvePath(data, styleContentType);

      const fullPath = PATH[styleType].background.type;

      if (!fullPath) {
        return setStyleWarning(`You cannot edit ${subType} because the background type is set as False. Set the background type to ${subType} and then you will be able to edit ${subType}`)

      } else if (fullPath.toLowerCase() !== subType.toLowerCase()) {
        return setStyleWarning(`You cannot edit ${subType} because the background type is set as ${fullPath}. Change the background type to ${subType} and then you will be able to edit ${subType}`)

      } else if (fullPath.toLowerCase() === subType.toLowerCase()) {
        return setDialogData({ styleContent, styleContentType, styleType, type, subType, value });

      } else {
        return setStyleWarning(`There was an unexpcted error while trying to edit ${subType}. We recommend checking background type or reloading the app if this warning keep popping up.`)
      }
    }

    return setDialogData({ styleContent, styleContentType, styleType, type, subType, value });
  };


  const closeDialog = () => {
    setDialogData(null)
  };

  const confirmDialog = (
    updatedData: {
      styleContent: string,
      styleContentType: string[],
      styleType: string,
      type: string,
      subType: string,
      newValue: any
    }) => {
    let pathParts = [
      'sections',
      updatedData.styleContent,
    ]

    updatedData.styleContentType.map((val) => {
      pathParts.push(val)
    })

    pathParts = [
      ...pathParts,
      updatedData.styleType,
      updatedData.type,
      updatedData.subType
    ]

    const newValue = updatedData.newValue;

    updateData({ pathParts, newValue })
  };

  const renderNestedDropdown = (obj: Record<string, any>, styleType: string, styleContentType: string[]) => {
    return Object.entries(obj).map(([key, value]) => {
      if (!value || typeof value !== 'object') return null

      return (
        <div className="navbar-submenu-item" key={key}>
          <span>{key}</span>
          <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
          <div className="navbar-submenu-panel">
            {Object.entries(value).map(([innerKey, innerValue]) => {
              if (innerKey.toLowerCase() === 'gradient' && innerValue !== false && typeof innerValue === 'string') {

                const parts = innerValue.trim().split(/\s+/);
                const gradientColorsCount = parts.filter(p => p.startsWith('#')).length;

                let direction: string = innerValue.split(' ')[innerValue.split(' ').length - 1];

                return (
                  <div
                    className="navbar-submenu-leaf"
                    key={innerKey}
                    onClick={() => openStyleDialog(styleContent, styleContentType, styleType, key, innerKey, innerValue)}
                  >
                    {innerKey} : {gradientColorsCount} colors, {direction}
                  </div>
                )
              } else if (innerKey.toLowerCase() === 'image + gradient' && innerValue !== false && typeof innerValue === 'string') {
                let imagePath = innerValue.trim().split(',')[0];

                let imageName = imagePath.split('\\')[imagePath.split('\\').length - 1];

                let colorArray = innerValue.split(',')[1].trim();

                const parts = colorArray.trim().split(/\s+/);
                const gradientColorsCount = parts.filter(p => p.startsWith('#')).length;

                let direction: string = innerValue.split(' ')[innerValue.split(' ').length - 1];

                return (
                  <div
                    className="navbar-submenu-leaf"
                    key={innerKey}
                    onClick={() => openStyleDialog(styleContent, styleContentType, styleType, key, innerKey, innerValue)}
                  >
                    {innerKey} : {imageName}, {gradientColorsCount} colors, {direction}
                  </div>
                )
              } else if (
                key.toLowerCase() === 'layout' &&
                typeof innerValue === 'string' &&
                innerValue.toLowerCase() !== 'fit-content' &&
                innerValue.toLowerCase() !== 'none'
              ) {
                const number = innerValue.split('-')[0];
                const metric = innerValue.split('-')[1];

                return (
                  <div
                    className="navbar-submenu-leaf"
                    key={innerKey}
                    onClick={() => openStyleDialog(styleContent, styleContentType, styleType, key, innerKey, innerValue)}
                  >
                    {innerKey} : {number}{metric}
                  </div>
                )

              } else if (
                (
                  innerKey.toLowerCase() === 'border width' ||
                  innerKey.toLowerCase() === 'border radius' ||
                  key.toLowerCase() === 'margin' ||
                  key.toLowerCase() === 'padding' ||
                  key.toLowerCase() === 'shadow'
                ) &&
                typeof innerValue === 'string' &&
                innerValue.toLowerCase() !== 'fit-content' &&
                innerValue.toLowerCase() !== 'none' &&
                innerValue.toLowerCase() !== 'color' &&
                innerValue.toLowerCase() !== 'inset'
              ) {
                const [number, metric] = innerValue?.split('-') ? innerValue.split('-') : [0, ''];

                return (
                  <div
                    className="navbar-submenu-leaf"
                    key={innerKey}
                    onClick={() => openStyleDialog(styleContent, styleContentType, styleType, key, innerKey, innerValue)}
                  >
                    {innerKey} : {number}{metric}
                  </div>
                );
              } else {
                return (
                  <div
                    className="navbar-submenu-leaf"
                    key={innerKey}
                    onClick={() => openStyleDialog(styleContent, styleContentType, styleType, key, innerKey, innerValue)}
                  >
                    {innerKey} : {typeof innerValue === 'object' ? JSON.stringify(innerValue) : String(innerValue)}
                  </div>
                )
              }
            })}
          </div>
        </div>
      )
    })
  }

  const navbarBlock = () => {
    interface buttonBLock {
      label: string;
      link: string;
      style: object;
    }

    const [logoURL, setLogoURL] = useState<string | false>(data?.logo?.logoURL !== false ? data.logo.logoURL : false)
    const [navLinks, setNavLinks] = useState<buttonBLock[]>(data?.navLinks || []);
    const [globalLinksDropdown, setGlobalLinksDropdown] = useState<boolean>(false);
    const globalLinksDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
          setDropdownOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [navDropdownRef])

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (logoDropdownRef.current && !logoDropdownRef.current.contains(event.target as Node)) {
          setLogoDropdownOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [logoDropdownRef])

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (globalLinksDropdownRef.current && !globalLinksDropdownRef.current.contains(event.target as Node)) {
          setGlobalLinksDropdown(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [globalLinksDropdownRef])

    const handleStickyClick = () => {
      if (!isSticky) {
        const pathParts = ['sections', 'navbar', 'sticky'];
        const newValue = true;

        updateData({ pathParts, newValue })

        setIsSticky(true)
      } else {

        const pathParts = ['sections', 'navbar', 'sticky'];
        const newValue = false;

        updateData({ pathParts, newValue })

        setIsSticky(false)
      }
    }

    const showSelectImage = async (): Promise<{ success: boolean, data: string }> => {
      const response = await selectImage();

      if (!response.canceled && response.filePaths.length === 1) {
        setLogoURL(response.filePaths[0]);
        return { success: true, data: response.filePaths[0] }

      } else {
        return { success: false, data: '' }
      }
    }

    const handleLogoImgClick = async (styleContent: string, stylePath: string[]) => {
      const response = await showSelectImage();

      if (response.success) {

        let pathParts = [
          'sections',
          styleContent,
          ...stylePath
        ]
        const newValue = response.data;

        updateData({ pathParts, newValue })
      }
    }

    const handleLogoImgDelete = (pathParts: string[], newValue: boolean) => {
      updateData({ pathParts, newValue })
      setLogoURL(false)
    }

    const handleLinkDelete = (idx: number) => {
      const newValue = navLinks.filter((_, i) => i !== idx);

      const pathParts = ['sections', 'navbar', 'navLinks'];

      updateData({ pathParts, newValue })
      setNavLinks(newValue)
    }

    interface NavLinkItemProps {
      index: number;
      value: buttonBLock;
    }

    const NavLinkItem: React.FC<NavLinkItemProps> = ({ index, value }) => {
      const [isLabelEditing, setIsLabelEditing] = useState(false);
      const [isLinkEditing, setIsLinkEditing] = useState(false);
      const [label, setLabel] = useState(value.label);
      const [link, setLink] = useState(value.link);
      const [navLinkDropdown, setNavLinkDropdown] = useState(false);
      const navLinkDropdownRef = useRef<HTMLDivElement>(null);

      const applyChange = (val: string, part: 'label' | 'link') => {
        if (val.trim() !== '') {
          setNavLinks((prev) => {
            const updated = [...prev];
            updated[index][part] = val;
            return updated;
          });

          updateData({
            pathParts: ['sections', 'navbar', 'navLinks', index, part],
            newValue: val,
          });

          if (part === 'label') setIsLabelEditing(false);
          if (part === 'link') setIsLinkEditing(false);
        }
      };

      useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (navLinkDropdownRef.current && !navLinkDropdownRef.current.contains(e.target as Node)) {
            setNavLinkDropdown(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      return (
        <div className="button-wrapper">
          <div className="navbar-links-dropdown-wrapper" ref={navLinkDropdownRef}>
            <button className="navbar-dropdown-toggle inter-font weight-600" onClick={() => setNavLinkDropdown((prev) => !prev)}>
              Custom Style <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {navLinkDropdown && (
              <div className="navbar-logo-dropdown-menu fade-in">
                <div className="navbar-dropdown-item has-sub inter-font weight-600">
                  Styles
                  <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                  <div className="navbar-submenu">
                    {renderNestedDropdown(
                      data?.navLinks[index].style.styles || {},
                      'styles',
                      ['navLinks', String(index), 'style']
                    )}
                  </div>
                </div>
                <div className="navbar-dropdown-item has-sub inter-font weight-600">
                  Hover Styles
                  <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                  <div className="navbar-submenu">
                    {renderNestedDropdown(
                      data?.navLinks[index].style.hoverStyles || {},
                      'hoverStyles',
                      ['navLinks', String(index), 'style']
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <span className="button-separator">|</span>

          <div className="button-label">
            Text:{' '}
            {isLabelEditing ? (
              <input
                type="text"
                autoFocus
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onBlur={() => applyChange(label, 'label')}
                onKeyDown={(e) => e.key === 'Enter' && applyChange(label, 'label')}
              />
            ) : (
              <span className="button-label-wrapper quicksand-font" onClick={() => setIsLabelEditing(true)}>
                {label}
              </span>
            )}
          </div>

          <span className="button-separator">|</span>

          <div className="button-link">
            Link:{' '}
            {isLinkEditing ? (
              <input
                type="text"
                autoFocus
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onBlur={() => applyChange(link, 'link')}
                onKeyDown={(e) => e.key === 'Enter' && applyChange(link, 'link')}
              />
            ) : (
              <span className="button-link-wrapper quicksand-font" onClick={() => setIsLinkEditing(true)}>
                {link}
              </span>
            )}
          </div>

          <div className="nav-links-minus" onClick={() => handleLinkDelete(index)}>
            <FontAwesomeIcon icon={faMinus} />
          </div>
        </div>
      );
    };

    const handleLinkAdd = () => {
      let button = structuredClone(NavButton);
      button.label = `${button.label} ${navLinks.length + 1}`;

      let newValue = structuredClone(navLinks);

      newValue.push(button)
      const pathParts = ['sections', 'navbar', 'navLinks'];

      updateData({ pathParts, newValue });
      setNavLinks(prev => [...prev, button]);
    }

    return (
      <>
        <div className="section-header">
          <div className="navbar-heading">{type}</div>
          <div className="navbar-controls">
            <label className="toggle">
              <input
                type="checkbox"
                checked={isSticky}
                onChange={handleStickyClick}
              />
              <span className="toggle-label">Sticky</span>
            </label>

            <div className="navbar-dropdown-wrapper" ref={navDropdownRef}>
              <button
                className="navbar-dropdown-toggle inter-font weight-600"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Style <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {dropdownOpen && (
                <div className="navbar-dropdown-menu fade-in">
                  <div className="navbar-dropdown-item has-sub inter-font weight-600">
                    Styles
                    <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                    <div className="navbar-submenu">
                      {renderNestedDropdown(data.style?.styles || {}, 'styles', ['style'])}
                    </div>
                  </div>
                  <div className="navbar-dropdown-item has-sub inter-font weight-600">
                    Hover Styles
                    <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                    <div className="navbar-submenu">
                      {renderNestedDropdown(data.style?.hoverStyles || {}, 'hoverStyles', ['style'])}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="navbar-content">
          <div className="child-section">
            <div className="child-section-header child-content-header logo-section-header">
              <FontAwesomeIcon icon={faImage} />
              Logo
            </div>

            <div className={`${logoURL ? 'logo-section' : ''}`}>
              <div className="logo-section-option" onClick={() => handleLogoImgClick(styleContent, ['logo', 'logoURL'])}>
                → Logo URL: {logoURL ? (
                  <>
                    <span className='option-value'> {logoURL} </span>
                  </>
                ) : (
                  <span className="option-value">Not set</span>
                )}
              </div>
              {logoURL ? (
                <div className="logo-trash-icon">
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleLogoImgDelete(['sections', 'navbar', 'logo', 'logoURL'], false)} />
                </div>
              ) : null}
            </div>

            <div className="navbar-logo-dropdown-wrapper" ref={logoDropdownRef}>
              <button
                className="navbar-dropdown-toggle inter-font weight-600"
                onClick={() => setLogoDropdownOpen((prev) => !prev)}
              >
                Logo Style <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {logoDropdownOpen && (
                <div className="navbar-logo-dropdown-menu fade-in">
                  <div className="navbar-dropdown-item has-sub inter-font weight-600">
                    Styles
                    <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                    <div className="navbar-submenu">
                      {renderNestedDropdown(data.logo?.style?.styles || {}, 'styles', ['logo', 'style'])}
                    </div>
                  </div>
                  <div className="navbar-dropdown-item has-sub inter-font weight-600">
                    Hover Styles
                    <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                    <div className="navbar-submenu">
                      {renderNestedDropdown(data.logo?.style?.hoverStyles || {}, 'hoverStyles', ['logo', 'style'])}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="child-section button-section">
            <div className="child-section-header button-section-header child-content-header">
              <FontAwesomeIcon icon={faLink} />
              Links
            </div>

            <div className="nav-links-global-style">
              <div className="navbar-logo-dropdown-wrapper" ref={globalLinksDropdownRef}>
                <button
                  className="all-link-style navbar-dropdown-toggle inter-font weight-600"
                  onClick={() => setGlobalLinksDropdown((prev) => !prev)}
                >
                  All Links Style <FontAwesomeIcon icon={faChevronDown} />
                </button>

                {globalLinksDropdown && (
                  <div className="navbar-logo-dropdown-menu fade-in">
                    <div className="navbar-dropdown-item has-sub inter-font weight-600">
                      Styles
                      <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                      <div className="navbar-submenu">
                        {renderNestedDropdown(data.navLinkStyle?.styles || {}, 'styles', ['navLinkStyle'])}
                      </div>
                    </div>
                    <div className="navbar-dropdown-item has-sub inter-font weight-600">
                      Hover Styles
                      <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                      <div className="navbar-submenu">
                        {renderNestedDropdown(data.navLinkStyle?.hoverStyles || {}, 'hoverStyles', ['navLinkStyle'])}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="button-list-section">
              {navLinks.map((val, idx) => (
                <NavLinkItem
                  key={idx}
                  index={idx}
                  value={val}
                />
              ))}
            </div>

            <div className="button-add-section">
              <div className="links-add-button" onClick={handleLinkAdd}>
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Link</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const heroBlock = () => {
    return (
      <>
        <div className="section-header">
          <div className="navbar-heading">{type}</div>
          <div className="navbar-controls">
            <div className="navbar-dropdown-wrapper" ref={navDropdownRef}>
              <button
                className="navbar-dropdown-toggle inter-font weight-600"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Style <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {dropdownOpen && (
                <div className="navbar-dropdown-menu fade-in">
                  <div className="navbar-dropdown-item has-sub inter-font weight-600">
                    Styles
                    <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                    <div className="navbar-submenu">
                      {renderNestedDropdown(data.style?.styles || {}, 'styles', ['style'])}
                    </div>
                  </div>
                  <div className="navbar-dropdown-item has-sub inter-font weight-600">
                    Hover Styles
                    <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                    <div className="navbar-submenu">
                      {renderNestedDropdown(data.style?.hoverStyles || {}, 'hoverStyles', ['style'])}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {styleWarning && (
        <div className="overlay">
          <div className="warning-modal">
            <div className="warning-heading">
              Warning!
            </div>
            <p className='warning-text'>{styleWarning}</p>
            <button onClick={() => setStyleWarning(null)}>OK</button>
          </div>
        </div>
      )}

      {dialogData && (
        <StyleDialog
          styleContent={dialogData.styleContent}
          styleContentType={dialogData.styleContentType}
          styleType={dialogData.styleType}
          type={dialogData.type}
          subType={dialogData.subType}
          value={dialogData.value}
          onClose={closeDialog}
          onConfirm={(updatedData) => {
            confirmDialog(updatedData)
          }}
        />
      )}
      <div className="section-block">
        {data.type?.toLowerCase() === 'navbar' ? navbarBlock() : data.type?.toLowerCase() === 'hero' ? heroBlock() : ''}
      </div>
    </>
  )
}

export default RenderSection

// bug in link add thing, it adds 1 in every label