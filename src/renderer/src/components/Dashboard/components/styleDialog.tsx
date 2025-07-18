import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChevronDown, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../styles/styleDialog.css';
import { ColorOptions } from '@renderer/interface/Presets/uiBlocks';
import { HexColorPicker } from 'react-colorful';
import { selectImage } from '@renderer/lib/ipc';
import { gradientDirectionValue } from '@renderer/interface/Presets/Background';

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
  const [inputValue, setInputValue] = useState(
    subType === 'color'
      ? value[0] === '#' ? 'custom color' : value
      : value
  );
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const [color, setColor] = useState<string>(value[0] === '#' ? value : '#000000ff');

  useEffect(() => {
    if (inputValue != value) {
      setCanConfirm(true)
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
      if (typeof inputValue === 'string' && inputValue.toLowerCase() === 'custom color') {
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
          <div className="style-input-wrapper">

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
          </div>
        );
      } else if (subType.toLowerCase() === "color") {
        return (
          <div className="style-input-wrapper">

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
              {
                typeof inputValue === 'string' && inputValue.toLowerCase() === 'custom color' ? (
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
                ) : null
              }
            </div>
          </div>
        );
      } else if (subType.toLowerCase() === 'image') {
        const hasShownImageDialog = useRef(false);
        const [imagePath, setImagePath] = useState<string | false>(value)

        const showSelectImage = async () => {
          const response = await selectImage()

          if (!response.canceled && response.filePaths.length === 1) {
            console.log(response.filePaths[0])
            setInputValue(response.filePaths[0]);
            setImagePath(response.filePaths[0]);
          }
        }

        useEffect(() => {
          if (subType.toLowerCase() === 'image' && !hasShownImageDialog.current && imagePath === false) {
            hasShownImageDialog.current = true;
            showSelectImage();
          }
        }, [subType])

        return (
          <div
            className="style-input-wrapper"
          >
            <p className="gradient-direction-heading">Image: </p>

            <input
              ref={inputRef}
              className="style-dialog-input"
              value={imagePath !== false ? imagePath : 'Waiting for an Image to be selected'}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus={false}
              disabled={true}
              style={{ pointerEvents: 'none' }}
            />

            {imagePath && (
              <button className="change-image-btn" onClick={showSelectImage}>
                Change
              </button>
            )}
          </div>
        )
      } else if (subType.toLowerCase() === 'gradient') {

        const gradientValue =
          typeof value === 'string' && subType.toLowerCase() === 'gradient' && value.split(' ').length !== 2
            ? value.split(' ')
            : ['#000000ff', '#000000ff', '#fff000', 'to-right']

        const [gradientDirection, setGradientDirection] = useState<string>(gradientValue[gradientValue.length - 1])
        const [gradientDirectionOpen, setGradientDirectionOpen] = useState<boolean>(false);

        const [gradientColorValues, setGradientColorValues] = useState<string[]>(
          gradientValue.filter((_, idx) => idx !== gradientValue.length - 1)
        )

        const [selectedGradient, setSelectedGradient] = useState<number>(0);
        const [selectedGradientValue, setSelectedGradientValue] = useState<string>(gradientColorValues[selectedGradient]);

        const updateInputValue = (gradientColorArray: string[], direction?: string) => {
          let text = `${gradientColorArray.join(' ')} ${direction}`;
          console.log(text)
          setInputValue(text);
        }

        const handleColorChange = (newColor: string) => {
          setSelectedGradientValue(newColor);
          const updatedGradient = [...gradientColorValues];
          updatedGradient[selectedGradient] = newColor;
          setGradientColorValues(updatedGradient);
          updateInputValue(updatedGradient, gradientDirection)
        };

        const handleSelect = (idx: number) => {
          setSelectedGradient(idx);
          setSelectedGradientValue(setGradientColorValues[idx]);
        };

        const handleAddColor = () => {
          const newGradient = [...gradientColorValues, "#ffffff"];
          setGradientColorValues(newGradient);
          setSelectedGradient(newGradient.length - 1);
          setSelectedGradientValue("#ffffff");
          updateInputValue(newGradient, gradientDirection);
        };

        const handleRemoveColor = (idx: number) => {
          console.log('got')
          if (gradientColorValues.length <= 2) return;
          const newGradient = gradientColorValues.filter((_, i) => i !== idx);
          setGradientColorValues(newGradient);
          updateInputValue(newGradient, gradientDirection)

          if (selectedGradient >= newGradient.length) {
            setSelectedGradient(newGradient.length - 1);
            setSelectedGradientValue(newGradient[newGradient.length - 1]);
          } else {
            setSelectedGradientValue(newGradient[selectedGradient]);
          }
        };

        const getArrowRotation = (direction: string) => {
          switch (direction) {
            case "to-top": return "rotate(0deg)";
            case "to-top-right": return "rotate(45deg)";
            case "to-right": return "rotate(90deg)";
            case "to-bottom-right": return "rotate(135deg)";
            case "to-bottom": return "rotate(180deg)";
            case "to-bottom-left": return "rotate(225deg)";
            case "to-left": return "rotate(270deg)";
            case "to-top-left": return "rotate(315deg)";
            default: return "rotate(0deg)";
          }
        };

        return (
          <>
            <div className="gradient-direction-wrapper">

              <p className='gradient-direction-heading'>Direction: </p>
              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setGradientDirectionOpen(!gradientDirectionOpen)}
                >
                  <span className="selected-label">
                    {gradientDirection || "Select a type"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>

                {gradientDirectionOpen && (
                  <div className="dropdown-options">
                    {gradientDirectionValue.map((option) => (
                      <div
                        key={option}
                        className={`dropdown-option ${gradientDirection === option ? "selected" : ""}`}
                        onClick={() => {
                          setGradientDirection(option);
                          setGradientDirectionOpen(false);
                          updateInputValue(gradientColorValues, option)
                        }}
                      >
                        {option}
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ transform: getArrowRotation(option), marginLeft: "8px" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="gradient-color-wrapper">
              <div className="gradient-color-array">
                {gradientColorValues.map((val, idx) => (
                  <div className="gradient-color-row" key={idx}>
                    <div
                      className={`gradient-color-holder ${idx === selectedGradient ? 'selected' : ''}`}
                      onClick={() => handleSelect(idx)}
                    >
                      <div className="gradient-color">{val}</div>
                      <div className="color-circle" style={{ backgroundColor: val }}></div>
                    </div>
                    {gradientColorValues.length > 2 && idx !== 0 && idx !== 1 && (
                      <div
                        className="gradient-minus"
                        onClick={() => handleRemoveColor(idx)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                    )}
                  </div>
                ))}

                <div className="gradient-plus" onClick={handleAddColor}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>

              <div className="gradient-color-picker-wrapper">
                <HexColorPicker color={selectedGradientValue} onChange={handleColorChange} />
                <input
                  className='color-picker-input'
                  ref={inputRef}
                  type="text"
                  value={selectedGradientValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                />
              </div>
            </div>
          </>
        )
      } else if (subType.toLowerCase() === 'image + gradient') {

        const updateInputValue = (filePath: string | false, gradientColorArray: string[], direction: string) => {
          if (!filePath) return;
          let text = `${filePath},${gradientColorArray.join(' ')} ${direction}`
          console.log(text)
          setInputValue(text);
        }

        const hasShownImageDialog = useRef(false);

        const imageGradientColors =
          typeof value === 'string' && subType.toLowerCase() === 'image + gradient' && value.split(',').length > 1 ?
            value.split(',')[1].split(' ') :
            ['#fff000', '#4c21a9ff', 'to-right']

        const [imagePath, setImagePath] = useState<string | false>(
          typeof value === 'string' && subType.toLowerCase() === 'image + gradient' && value.split(',').length > 1 ?
            value.split(',')[0] :
            false
        )

        const [imageGradientColorValues, setImageGradientColorValues] = useState<string[]>(
          imageGradientColors.filter((_, idx) => idx !== imageGradientColors.length - 1)
        )

        const [imageGradientDirection, setImageGradientDirection] = useState<string>(
          imageGradientColors[imageGradientColors.length - 1]
        )

        const [imageGradientDirectionOpen, setImageGradientDirectionOpen] = useState<boolean>(false);

        const [selectedImageGradient, setSelectedImageGradient] = useState<number>(0);
        const [selectedImageGradientValue, setSelectedImageGradientValue] = useState<string>(
          imageGradientColorValues[selectedImageGradient]
        );

        const showSelectImage = async () => {
          const response = await selectImage();

          if (!response.canceled && response.filePaths.length === 1) {
            setImagePath(response.filePaths)
            updateInputValue(response.filePaths, imageGradientColorValues, imageGradientDirection);
          }
        }

        useEffect(() => {
          if (subType.toLowerCase() === 'image + gradient' && !hasShownImageDialog.current && imagePath === false) {
            hasShownImageDialog.current = true;
            showSelectImage();
          }
        }, [subType])

        const handleColorChange = (newColor: string) => {
          setSelectedImageGradientValue(newColor);
          const updatedGradient = [...imageGradientColorValues];
          updatedGradient[selectedImageGradient] = newColor;
          setImageGradientColorValues(updatedGradient);
          updateInputValue(imagePath, updatedGradient, imageGradientDirection)
        };

        const handleSelect = (idx: number) => {
          setSelectedImageGradient(idx);
          setSelectedImageGradientValue(imageGradientColorValues[idx]);
        };

        const handleAddColor = () => {
          const newGradient = [...imageGradientColorValues, "#ffffff"];
          setImageGradientColorValues(newGradient);
          setSelectedImageGradient(newGradient.length - 1);
          setSelectedImageGradientValue("#ffffff");
          updateInputValue(imagePath, newGradient, imageGradientDirection);
        };

        const handleRemoveColor = (idx: number) => {
          console.log('got')
          if (imageGradientColorValues.length <= 2) return;
          const newGradient = imageGradientColorValues.filter((_, i) => i !== idx);
          setImageGradientColorValues(newGradient);
          updateInputValue(imagePath, newGradient, imageGradientDirection);

          if (selectedImageGradient >= newGradient.length) {
            setSelectedImageGradient(newGradient.length - 1);
            setSelectedImageGradientValue(newGradient[newGradient.length - 1]);
          } else {
            setSelectedImageGradientValue(newGradient[selectedImageGradient]);
          }
        };

        const getArrowRotation = (direction: string) => {
          switch (direction) {
            case "to-top": return "rotate(0deg)";
            case "to-top-right": return "rotate(45deg)";
            case "to-right": return "rotate(90deg)";
            case "to-bottom-right": return "rotate(135deg)";
            case "to-bottom": return "rotate(180deg)";
            case "to-bottom-left": return "rotate(225deg)";
            case "to-left": return "rotate(270deg)";
            case "to-top-left": return "rotate(315deg)";
            default: return "rotate(0deg)";
          }
        };

        return (
          <>
            <div
              className="style-input-wrapper"
            >
              <p className="gradient-direction-heading">Image: </p>

              <input
                ref={inputRef}
                className="style-dialog-input"
                value={imagePath !== false ? imagePath : 'Waiting for an Image to be selected'}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus={false}
                disabled={true}
                style={{ pointerEvents: 'none' }}
              />

              {imagePath && (
                <button className="change-image-btn" onClick={showSelectImage}>
                  Change
                </button>
              )}
            </div>

            <div className="gradient-direction-wrapper">

              <p className='gradient-direction-heading'>Direction: </p>
              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setImageGradientDirectionOpen(!imageGradientDirectionOpen)}
                >
                  <span className="selected-label">
                    {imageGradientDirection || "Select a type"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>

                {imageGradientDirectionOpen && (
                  <div className="dropdown-options">
                    {gradientDirectionValue.map((option) => (
                      <div
                        key={option}
                        className={`dropdown-option ${imageGradientDirection === option ? "selected" : ""}`}
                        onClick={() => {
                          setImageGradientDirection(option);
                          setImageGradientDirectionOpen(false);
                          updateInputValue(imagePath, imageGradientColorValues, option);
                        }}
                      >
                        {option}
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ transform: getArrowRotation(option), marginLeft: "8px" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="gradient-color-wrapper">
              <div className="gradient-color-array">
                {imageGradientColorValues.map((val, idx) => (
                  <div className="gradient-color-row" key={idx}>
                    <div
                      className={`gradient-color-holder ${idx === selectedImageGradient ? 'selected' : ''}`}
                      onClick={() => handleSelect(idx)}
                    >
                      <div className="gradient-color">{val}</div>
                      <div className="color-circle" style={{ backgroundColor: val }}></div>
                    </div>
                    {imageGradientColorValues.length > 2 && idx !== 0 && idx !== 1 && (
                      <div
                        className="gradient-minus"
                        onClick={() => handleRemoveColor(idx)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                    )}
                  </div>
                ))}

                <div className="gradient-plus" onClick={handleAddColor}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>

              <div className="gradient-color-picker-wrapper">
                <HexColorPicker color={selectedImageGradientValue} onChange={handleColorChange} />
                <input
                  className='color-picker-input'
                  ref={inputRef}
                  type="text"
                  value={selectedImageGradientValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                />
              </div>
            </div>
          </>
        )

      } else {
        return (
          <div className="style-dialog-error">
            <h4>⚠️ Technical Error</h4>
            <p>
              Something went wrong while loading this input field.
              <br />
              Try restarting the program if this keeps happening.
            </p>
          </div>
        );
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

        {renderInput(type, subType)}


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
