import React, { useEffect, useState, useRef } from 'react'
import '../../styles/render.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faImage } from '@fortawesome/free-solid-svg-icons'
import { StyleDialog } from './styleDialog'

interface RenderSectionProps {
  type: string
  data: any
  styleContent: string
  updateData: any
}

function RenderSection({ type, data, styleContent, updateData }: RenderSectionProps): React.JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoDropdownOpen, setLogoDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    const currentType =
      styleType === 'styles'
        ? data.style?.styles.background.type
        : data.style?.hoverStyles.background.type;

    const isBlocked =
      ['color', 'image', 'gradient', 'image + gradient'].includes(subType) &&
      currentType !== subType;

    if (isBlocked) {
      setStyleWarning(
        `You cannot change ${subType}, because the background type is "${currentType}". Change it to "${subType}" if you want to edit ${subType}.`
      );
      return;
    }

    setDialogData({ styleContent, styleContentType, styleType, type, subType, value });
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
    console.log('inside the confirmDialog', updatedData)
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

    console.log(pathParts);
    const newValue = updatedData.newValue;

    updateData({ pathParts, newValue })
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [logoDropdownRef])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (logoDropdownRef.current && !logoDropdownRef.current.contains(event.target as Node)) {
        setLogoDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [logoDropdownRef])


  const renderNestedDropdown = (obj: Record<string, any>, styleType: string, styleContentType: string[]) => {
    return Object.entries(obj).map(([key, value]) => {
      if (!value || typeof value !== 'object') return null

      return (
        <div className="navbar-submenu-item" key={key}>
          <span>{key}</span>
          <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
          <div className="navbar-submenu-panel">
            {Object.entries(value).map(([innerKey, innerValue]) => {
              return (
                <div
                  className="navbar-submenu-leaf"
                  key={innerKey}
                  onClick={() => openStyleDialog(styleContent, styleContentType, styleType, key, innerKey, innerValue)}
                >
                  {innerKey} : {typeof innerValue === 'object' ? JSON.stringify(innerValue) : String(innerValue)}
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }

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
        {data?.type?.toLowerCase() === 'navbar' && (
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

                <div className="navbar-dropdown-wrapper" ref={dropdownRef}>
                  <button
                    className="navbar-dropdown-toggle"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    Style <FontAwesomeIcon icon={faChevronDown} />
                  </button>

                  {dropdownOpen && (
                    <div className="navbar-dropdown-menu fade-in">
                      <div className="navbar-dropdown-item has-sub">
                        Styles
                        <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                        <div className="navbar-submenu">
                          {renderNestedDropdown(data.style?.styles || {}, 'styles', ['style'])}
                        </div>
                      </div>
                      <div className="navbar-dropdown-item has-sub">
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
              <div className="logo-section">
                <div className="logo-section-header">
                  <FontAwesomeIcon icon={faImage} />
                  Logo
                </div>

                <div className="logo-section-option">
                  → Logo URL: <span className="option-value">Not set</span>
                </div>

                <div className="navbar-logo-dropdown-wrapper" ref={logoDropdownRef}>
                  <button
                    className="navbar-dropdown-toggle"
                    onClick={() => setLogoDropdownOpen((prev) => !prev)}
                  >
                    Logo Style <FontAwesomeIcon icon={faChevronDown} />
                  </button>

                  {logoDropdownOpen && (
                    <div className="navbar-logo-dropdown-menu fade-in">
                      <div className="navbar-dropdown-item has-sub">
                        Styles
                        <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                        <div className="navbar-submenu">
                          {renderNestedDropdown(data.style?.styles || {}, 'styles', ['logo', 'style'])}
                        </div>
                      </div>
                      <div className="navbar-dropdown-item has-sub">
                        Hover Styles
                        <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                        <div className="navbar-submenu">
                          {renderNestedDropdown(data.style?.hoverStyles || {}, 'hoverStyles', ['logo', 'style'])}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default RenderSection