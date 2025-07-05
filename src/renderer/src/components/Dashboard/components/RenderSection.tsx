import React, { useEffect, useState, useRef } from 'react'
import '../../styles/render.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface RenderSectionProps {
  type: string
  data: any
}

function RenderSection({ type, data }: RenderSectionProps): React.JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(data?.sticky ?? false)

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderNestedDropdown = (obj: Record<string, any>) => {
    return Object.entries(obj).map(([key, value]) => {
      if (!value || typeof value !== 'object') return null

      const hasChildren = Object.values(value).some((v) => v !== false)
      if (!hasChildren) return null

      return (
        <div className="navbar-submenu-item" key={key}>
          <span>{key}</span>
          <FontAwesomeIcon icon={faChevronRight} className="submenu-icon" />
          <div className="navbar-submenu-panel">
            {Object.entries(value).map(([innerKey, innerValue]) => {
              console.log(innerKey, innerValue);
              return (
                <div className="navbar-submenu-leaf" key={innerKey}>
                  {innerKey}: {typeof innerValue === 'object' ? JSON.stringify(innerValue) : String(innerValue)}
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
                        <div className="navbar-submenu">
                          {renderNestedDropdown(data.style?.styles || {})}
                        </div>
                      </div>
                      <div className="navbar-dropdown-item has-sub">
                        Hover Styles
                        <div className="navbar-submenu">
                          {renderNestedDropdown(data.style?.hoverStyles || {})}
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



// The thing thats happening is that its not returnign the core values that are false, which shouldnt happen, it should show them as none and only ignore those grouped values if the parent value is false, for exmaple if margin: false, then dont show margin at all but if margin : {marginTop: false, marginBottom: false, marginRight: false, marginLeft: false}, in this case, show the Margin right, left etc but show None ,as it should still provide the user with an option to edit these