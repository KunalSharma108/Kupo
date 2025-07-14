import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../styles/styleDialog.css';
import { ColorOptions } from '@renderer/interface/Presets/uiBlocks';
import { HexColorPicker } from 'react-colorful';

interface StyleDialogProps {
  styleContent: string;
  styleContentType: string[];
  styleType: string;
  type: string;
  subType: string;
  value: any;
  onClose: () => void;
  onConfirm: (data: {
    styleContent: string;
    styleContentType: string[];
    styleType: string;
    type: string;
    subType: string;
    newValue: any;
  }) => void;
}

export const StyleDialog: React.FC<StyleDialogProps> = ({
  styleContent,
  styleContentType,
  styleType,
  type,
  subType,
  value,
  onClose,
  onConfirm
}) => {
  const [inputValue, setInputValue] = useState(value[0] === '#' ? 'custom color' : value);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const [color, setColor] = useState<string>(value[0] === '#' ? value : '#000000ff')

  useEffect(() => {
    if (inputValue.toLowerCase() === 'custom color') {
      const normalizedColor = color.toLowerCase().replace('#', '').slice(0, 6);
      const normalizedValue = value.toLowerCase().replace('#', '').slice(0, 6);
      setCanConfirm(normalizedColor !== normalizedValue);

    } else if (inputRef.current) {
      const currentInputValue = inputRef.current.value;
      setCanConfirm(inputValue !== value && inputValue === currentInputValue);
      
    } else {
      setCanConfirm(inputValue !== value);
    }
  }, [inputValue, value, color]);


  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    setTimeout(() => {
      if (inputValue.toLowerCase() === 'custom color') {
        onConfirm({
          styleContent,
          styleContentType,
          styleType,
          type,
          subType,
          newValue: color
        });
      } else {
        onConfirm({
          styleContent,
          styleContentType,
          styleType,
          type,
          subType,
          newValue: inputValue
        });
      }
    }, 0);

    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  function renderInput(type: string, subType: string) {
    if (type.toLowerCase() === 'background') {
      if (subType.toLowerCase() === 'type') {
        return (
          <div className="style-color-options-dropdown">
            <div
              className="dropdown-selected"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="selected-label">
                {inputValue || "Select a type"}
              </span>

              <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
            </div>

            {dropdownOpen && (
              <div className="dropdown-options">
                {["color", "image", "gradient", "image + gradient"].map((option) => (
                  <div
                    key={option}
                    className={`dropdown-option ${inputValue === option ? "selected" : ""}`}
                    onClick={() => {
                      setInputValue(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      } else if (subType.toLowerCase() === "color") {
        return (
          <div className='style-dialog-input-wrapper'>

            <div className="style-color-options-dropdown">
              <div
                className="dropdown-selected"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="selected-label">
                  {inputValue || "Select a color"}
                  {ColorOptions[inputValue]?.css && (
                    <span
                      className="color-circle"
                      style={{
                        backgroundColor: `#${ColorOptions[inputValue].css.replace(";", "")}`,
                      }}
                    />
                  )}
                </span>

                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
              </div>
              {dropdownOpen && (
                <div className="dropdown-options">
                  {Object.entries(ColorOptions).map(([key, option]) => (
                    <div
                      key={key}
                      className={`dropdown-option ${inputValue === option.label ? "selected" : ""}`}
                      onClick={() => {
                        setInputValue(option.label);
                        setDropdownOpen(false);
                      }}
                    >
                      {option.label}
                      {option.css && (
                        <span
                          className="color-circle"
                          style={{ backgroundColor: `#${option.css.replace(';', '')}` }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {inputValue.toLowerCase() === 'custom color' ? (
              <>
                <div className="color-picker-container">
                  <HexColorPicker color={color} onChange={setColor} />
                  <input
                    className='color-picker-input'
                    ref={inputRef}
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </>
            ) : null}
          </div>
        );
      } else {
        return (
          <input
            ref={inputRef}
            className="style-dialog-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus={true}
          />
        )
      }

    } else {
      return (
        <input
          ref={inputRef}
          className="style-dialog-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus={true}
        />
      )
    }
  }

  return createPortal(
    <div className="style-dialog-overlay">
      <div
        className={`style-dialog-container ${isClosing ? 'closing' : ''}`}
        ref={containerRef}
      >
        <h2 className="style-dialog-heading">Styling {styleContent}</h2>
        <p className="style-dialog-description">
          Input the value you want to change for this style option.
        </p>

        <div className="style-dialog-input-row">
          {styleContentType.map((type) => {
            return (
              <>
                <span className="style-dialog-subheading-inline">{type}</span>
                <FontAwesomeIcon icon={faChevronRight} className="style-dialog-arrow" />
              </>
            )
          })}
          <span className="style-dialog-subheading-inline">{styleType === 'hoverStyles' ? 'hover styles' : styleType}</span>
          <FontAwesomeIcon icon={faChevronRight} className="style-dialog-arrow" />
          <span className="style-dialog-type">{type}</span>
          <FontAwesomeIcon icon={faChevronRight} className="style-dialog-arrow" />
          <span className="style-dialog-subtype">{subType}</span>
          <FontAwesomeIcon icon={faChevronRight} className="style-dialog-arrow" />
        </div>

        <div className="style-input-wrapper">
          {renderInput(type, subType)}
        </div>


        <div className="style-dialog-actions">
          <button className="style-dialog-close" onClick={handleClose}>Close</button>
          {canConfirm ? (
            <button
              className="style-dialog-confirm"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          ) : (
            <button
              className="style-dialog-confirm disabled"
              disabled
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
