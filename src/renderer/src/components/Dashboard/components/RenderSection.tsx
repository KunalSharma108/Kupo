import React, { useEffect, useState, useRef } from 'react'
import '../../styles/render.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { StyleDialog } from './styleDialog'

interface RenderSectionProps {
  type: string
  data: any
  styleContent: string
}

function RenderSection({ type, data, styleContent }: RenderSectionProps): React.JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(data?.sticky ?? false);
  const [dialogData, setDialogData] = useState<null | {
    styleContent: string;
    styleType: string;
    type: string;
    subType: string;
    value: any;
  }>(null);

  const openStyleDialog = (
    styleContent: string,
    styleType: string,
    type: string,
    subType: string,
    value: any
  ) => {
    setDialogData({ styleContent, styleType, type, subType, value });
  };

  const closeDialog = () => {
    setDialogData(null)
  };

  const confirmDialog = (updatedData: { styleContent: string, styleType: string, type: string, subType: string, newValue: any }) => {
    console.log(updatedData)
    setTimeout(() => {
      setDialogData(null)
    }, 0)
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderNestedDropdown = (obj: Record<string, any>, styleType: string) => {
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
                  onClick={() => openStyleDialog(styleContent, styleType, key, innerKey, innerValue)}
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

  return (
    <>
      {dialogData && (
        <StyleDialog
          styleContent={dialogData.styleContent}
          styleType={dialogData.styleType}
          type={dialogData.type}
          subType={dialogData.subType}
          value={dialogData.value}
          onClose={closeDialog}
          onConfirm={(updatedData) => {
            console.log("✅ Received in parent:", updatedData);
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
                    onChange={() => setIsSticky(!isSticky)}
                  />
                  <span className="toggle-label">Sticky</span>
                </label>

                <div className="navbar-dropdown-wrapper" ref={dropdownRef}>
                  <button
                    className="navbar-dropdown-toggle"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    Styling <FontAwesomeIcon icon={faChevronDown} />
                  </button>

                  {dropdownOpen && (
                    <div className="navbar-dropdown-menu fade-in">
                      <div className="navbar-dropdown-item has-sub">
                        Styles
                        <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                        <div className="navbar-submenu">
                          {renderNestedDropdown(data.style?.styles || {}, 'styles')}
                        </div>
                      </div>
                      <div className="navbar-dropdown-item has-sub">
                        Hover Styles
                        <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
                        <div className="navbar-submenu">
                          {renderNestedDropdown(data.style?.hoverStyles || {}, 'hover styles')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="navbar-content">
              <p>Navbar Section Settings</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default RenderSection