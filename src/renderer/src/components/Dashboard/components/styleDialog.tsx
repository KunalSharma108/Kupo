import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChevronDown, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../styles/styleDialog.css';
import '../../styles/fontFamily.css';
import { ColorOptions } from '@renderer/interface/Presets/uiBlocks';
import { HexColorPicker } from 'react-colorful';
import { selectImage } from '@renderer/lib/ipc';
import { gradientDirectionValue } from '@renderer/interface/Presets/Background';
import { fontOptions, fontSizes } from '@renderer/interface/Presets/FontFamily';

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
    subType.split(' ')[subType.split(' ').length - 1] === 'color'
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
                  {["color", "image", "gradient", "image + gradient", "false"].map((option) => (
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
                      <HexColorPicker
                        color={color.slice(0, 7)}
                        onChange={(val) => setColor(val + (color.slice(7, 9) || "FF"))}
                      />

                      <input
                        className="color-picker-input"
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />

                      <div className="opacity-control">
                        <label htmlFor="opacity-slider">Opacity</label>
                        <input
                          id="opacity-slider"
                          type="range"
                          min="0"
                          max="255"
                          value={parseInt(color.slice(7, 9) || "FF", 16)}
                          onChange={(e) => {
                            const alpha = Number(e.target.value)
                              .toString(16)
                              .padStart(2, "0")
                              .toUpperCase();
                            setColor(color.slice(0, 7) + alpha);
                          }}
                        />

                        <span className="opacity-value">
                          {(parseInt(color.slice(7, 9) || "FF", 16) / 255).toFixed(2)}
                        </span>
                      </div>
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
            : ['#000000ff', '#000000ff', '#ffee00ff', 'to-right']

        const [gradientDirection, setGradientDirection] = useState<string>(gradientValue[gradientValue.length - 1])
        const [gradientDirectionOpen, setGradientDirectionOpen] = useState<boolean>(false);

        const [gradientColorValues, setGradientColorValues] = useState<string[]>(
          gradientValue.filter((_, idx) => idx !== gradientValue.length - 1)
        )

        const [selectedGradient, setSelectedGradient] = useState<number>(0);
        const [selectedGradientValue, setSelectedGradientValue] = useState<string>(gradientColorValues[selectedGradient]);

        const updateInputValue = (gradientColorArray: string[], direction?: string) => {
          let text = `${gradientColorArray.join(' ')} ${direction}`;
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
          setSelectedGradientValue(gradientColorValues[idx]);
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
                <HexColorPicker color={selectedGradientValue.slice(0, 7) || '#000000ff'} onChange={(val) => {
                  const newGradientColor = `${val}${selectedGradientValue.slice(7, 9) || 'ff'}`
                  handleColorChange(newGradientColor);
                }} />
                <input
                  className='color-picker-input'
                  ref={inputRef}
                  type="text"
                  value={selectedGradientValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                />

                <div className="opacity-control">
                  <label htmlFor="opacity-slider">Opacity</label>
                  <input
                    id="opacity-slider"
                    type="range"
                    min="0"
                    max="255"
                    value={parseInt(selectedGradientValue.slice(7, 9) || "FF", 16)}
                    onChange={(e) => {
                      const alpha = Number(e.target.value)
                        .toString(16)
                        .padStart(2, "0")
                        .toUpperCase();
                      handleColorChange(selectedGradientValue.slice(0, 7) + alpha);
                    }}
                  />
                  <span className="opacity-value">
                    {(parseInt(selectedGradientValue.slice(7, 9) || "FF", 16) / 255).toFixed(2)}
                  </span>
                </div>
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
                <HexColorPicker color={selectedImageGradientValue.slice(0, 7) || '#000000ff'} onChange={(val) => {
                  const newGradientColor = `${val}${selectedImageGradientValue.slice(7, 9) || 'ff'}`
                  handleColorChange(newGradientColor);
                }} />
                <input
                  className='color-picker-input'
                  ref={inputRef}
                  type="text"
                  value={selectedImageGradientValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                />

                <div className="opacity-control">
                  <label htmlFor="opacity-slider">Opacity</label>
                  <input
                    id="opacity-slider"
                    type="range"
                    min="0"
                    max="255"
                    value={parseInt(selectedImageGradientValue.slice(7, 9) || "FF", 16)}
                    onChange={(e) => {
                      const alpha = Number(e.target.value)
                        .toString(16)
                        .padStart(2, "0")
                        .toUpperCase();
                      handleColorChange(selectedImageGradientValue.slice(0, 7) + alpha);
                    }}
                  />
                  <span className="opacity-value">
                    {(parseInt(selectedImageGradientValue.slice(7, 9) || "FF", 16) / 255).toFixed(2)}
                  </span>
                </div>
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

    } else if (type.toLowerCase() === 'layout') {
      if (subType.toLowerCase() !== 'vertical align' && subType.toLowerCase() !== 'horizontal align') {

        const isNumberValue = typeof value === 'string' && !isNaN(Number(value.split('-')[0]));

        const initialType = isNumberValue ? 'number' : value;

        const [layoutType, setLayoutType] = useState<
          'number' | 'fit-content' | 'none'
        >(
          initialType === 'number'
            ? 'number'
            : initialType === 'none'
              ? 'none'
              : 'fit-content'
        );

        const [layout, setLayout] = useState<number>(() => {
          if (layoutType === 'number' && typeof value === 'string') {
            return Number(value.split('-')[0]);
          }
          return 0;
        });

        const [layoutMetric, setLayoutMetric] = useState<string>(() => {
          if (layoutType === 'number' && typeof value === 'string') {
            return value.split('-')[1];
          }
          return 'px';
        });

        const metricOptions = ['px', '%', 'vh', 'rem'];
        const typeOptions =
          subType.toLowerCase() === 'max width' || subType.toLowerCase() === 'max height' ?
            ['number', 'fit-content', 'none'] :
            ['number', 'fit-content'];

        const updateInputValue = (val: string) => {
          setInputValue(val)
        }

        return (
          <div className="style-input-wrapper">
            <select
              className="style-dialog-dropdown"
              value={layoutType}
              onChange={(e) => {
                const selected = e.target.value as 'number' | 'fit-content' | 'none';
                setLayoutType(selected);
                if (selected === 'fit-content') {
                  setLayout(0);
                  setLayoutMetric('');
                  updateInputValue('fit-content')
                } else if (selected === 'number') {
                  updateInputValue(`${layout}-${layoutMetric}`)
                } else {
                  updateInputValue(`none`)
                }
              }}
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <input
              ref={inputRef}
              className="style-dialog-input"
              type="number"
              value={layoutType === 'number' ? layout : ''}
              onChange={(e) => {
                setLayout(Math.abs(Number(e.target.value)))
                updateInputValue(`${Math.abs(Number(e.target.value))}-${layoutMetric}`)
              }}
              disabled={layoutType !== 'number'}
              autoFocus
            />

            <select
              className="style-dialog-dropdown"
              value={layoutMetric}
              onChange={(e) => {
                setLayoutMetric(e.target.value);
                updateInputValue(`${layout}-${e.target.value}`);
              }}
              disabled={layoutType !== 'number'}
            >
              {metricOptions.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        );
      } else {
        const styleArray = subType.toLowerCase() === 'vertical align' ? ['top', 'center', 'bottom'] : ['left', 'center', 'right']

        return (
          <div className="style-input-wrapper">

            <div className='style-dialog-input-wrapper'>

              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="selected-label">
                    {inputValue || "Select a style"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-options">
                    {Object.entries(styleArray).map(([key, option]) => (
                      <div
                        key={key}
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
          </div>
        );
      }
    } else if (type.toLowerCase() === 'border') {
      if (subType.toLowerCase() === 'border color') {
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
                      <HexColorPicker
                        color={color.slice(0, 7)}
                        onChange={(val) => setColor(val + (color.slice(7, 9) || "FF"))}
                      />

                      <input
                        className="color-picker-input"
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />

                      <div className="opacity-control">
                        <label htmlFor="opacity-slider">Opacity</label>
                        <input
                          id="opacity-slider"
                          type="range"
                          min="0"
                          max="255"
                          value={parseInt(color.slice(7, 9) || "FF", 16)}
                          onChange={(e) => {
                            const alpha = Number(e.target.value)
                              .toString(16)
                              .padStart(2, "0")
                              .toUpperCase();
                            setColor(color.slice(0, 7) + alpha);
                          }}
                        />

                        <span className="opacity-value">
                          {(parseInt(color.slice(7, 9) || "FF", 16) / 255).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : null
              }
            </div>
          </div>
        );
      } else if (subType.toLowerCase() === 'border width') {
        const initialType = typeof value === 'string' && value?.split('-').length === 2 ? 'string' : 'number'
        const [layoutType, setLayoutType] = useState<
          'number' | 'none'
        >
          (initialType === 'string' ?
            'number' : 'none'
          );

        const [layout, setLayout] = useState<number>(initialType === 'string' ? Number(value.split('-')[0]) : 0);
        const [layoutMetric, setLayoutMetric] = useState<string>(initialType === 'string' ? value.split('-')[1] : 'px')

        const metricOptions = ['px', 'rem'];
        const typeOptions = ['number', 'none'];

        const updateInputValue = (val: string) => {
          setInputValue(val)
        }

        return (
          <div className="style-input-wrapper">
            <select
              className="style-dialog-dropdown"
              value={layoutType}
              onChange={(e) => {
                const selected = e.target.value as 'number' | 'none';
                setLayoutType(selected);
                if (selected === 'number') {
                  updateInputValue(`${layout}-${layoutMetric}`)
                } else {
                  updateInputValue(`none`)
                }
              }}
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <input
              ref={inputRef}
              className="style-dialog-input"
              type="number"
              value={layoutType === 'number' ? layout : ''}
              onChange={(e) => {
                if (Number(e.target.value) >= 0) {
                  setLayout(Math.abs(Number(e.target.value)))
                  updateInputValue(`${Math.abs(Number(e.target.value))}-${layoutMetric}`)
                }
              }}
              disabled={layoutType !== 'number'}
              autoFocus
            />

            <select
              className="style-dialog-dropdown"
              value={layoutMetric}
              onChange={(e) => {
                setLayoutMetric(e.target.value);
                updateInputValue(`${layout}-${e.target.value}`);
              }}
              disabled={layoutType !== 'number'}
            >
              {metricOptions.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        );
      } else if (subType.toLowerCase() === 'border style') {
        const styleArray = ['solid', 'dashed', 'dotted', 'none'];

        return (
          <div className="style-input-wrapper">

            <div className='style-dialog-input-wrapper'>

              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="selected-label">
                    {inputValue || "Select a style"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-options">
                    {Object.entries(styleArray).map(([key, option]) => (
                      <div
                        key={key}
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
          </div>
        );
      } else if (subType.toLowerCase() === 'border radius') {
        const initialType = typeof value === 'string' && value?.split('-').length === 2 ? 'string' : 'number'
        const [layoutType, setLayoutType] = useState<
          'number' | 'none'
        >
          (initialType === 'string' ?
            'number' : 'none'
          );

        const [layout, setLayout] = useState<number>(initialType === 'string' ? Number(value.split('-')[0]) : 0);
        const [layoutMetric, setLayoutMetric] = useState<string>(initialType === 'string' ? value.split('-')[1] : 'px')

        const metricOptions = ['px', '%'];
        const typeOptions = ['number', 'none'];

        const updateInputValue = (val: string) => {
          setInputValue(val)
        }

        return (
          <div className="style-input-wrapper">
            <select
              className="style-dialog-dropdown"
              value={layoutType}
              onChange={(e) => {
                const selected = e.target.value as 'number' | 'none';
                setLayoutType(selected);
                if (selected === 'number') {
                  updateInputValue(`${layout}-${layoutMetric}`)
                } else {
                  updateInputValue(`none`)
                }
              }}
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <input
              ref={inputRef}
              className="style-dialog-input"
              type="number"
              value={layoutType === 'number' ? layout : ''}
              onChange={(e) => {
                if (Number(e.target.value) >= 0) {
                  setLayout(Math.abs(Number(e.target.value)))
                  updateInputValue(`${Math.abs(Number(e.target.value))}-${layoutMetric}`)
                }
              }}
              disabled={layoutType !== 'number'}
              autoFocus
            />

            <select
              className="style-dialog-dropdown"
              value={layoutMetric}
              onChange={(e) => {
                setLayoutMetric(e.target.value);
                updateInputValue(`${layout}-${e.target.value}`);
              }}
              disabled={layoutType !== 'number'}
            >
              {metricOptions.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        );
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
    } else if (type.toLowerCase() === 'transition') {
      if (subType.toLowerCase() === 'transition duration') {
        const isNumberValue = typeof value === 'string' && !isNaN(Number(value))
        const initialType = isNumberValue ? 'number' : value;
        const [layoutType, setLayoutType] = useState<
          'number' | 'none'
        >
          (initialType === 'number' ?
            'number' : 'none'
          );

        const [layout, setLayout] = useState<number>(layoutType === 'number' ? Number(value) : 0);

        const metricOptions = ['ms'];
        const typeOptions = ['number', 'none'];

        const updateInputValue = (val: string) => {
          setInputValue(val);
        }

        return (
          <div className="style-input-wrapper">
            <select
              className="style-dialog-dropdown"
              value={layoutType}
              onChange={(e) => {
                const selected = e.target.value as 'number' | 'none';
                setLayoutType(selected);
                if (selected === 'number') {
                  updateInputValue(`${layout}`)
                } else {
                  updateInputValue(`none`)
                }
              }}
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <input
              ref={inputRef}
              className="style-dialog-input"
              type="number"
              value={layoutType === 'number' ? layout : ''}
              step={100}
              min={0}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 && val % 100 === 0) {
                  setLayout(val)
                  updateInputValue(e.target.value)
                };
              }}
              disabled={layoutType === 'none'}
              autoFocus
            />


            <select
              className="style-dialog-dropdown"
              value={'ms'}
              onChange={(_e) => {
                updateInputValue(`${layout}`);
              }}
              disabled={layoutType !== 'number'}
            >
              {metricOptions.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        );
      } else if (subType.toLowerCase() === 'transition style') {
        const styleArray = [
          'ease',
          'ease-in',
          'ease-out',
          'ease-in-out',
          'linear',
          'step-start',
          'step-end'
        ];

        return (
          <div className="style-input-wrapper">

            <div className='style-dialog-input-wrapper'>

              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="selected-label">
                    {inputValue || "Select a style"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-options">
                    {Object.entries(styleArray).map(([key, option]) => (
                      <div
                        key={key}
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
          </div>
        );
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
    } else if (type.toLowerCase() === 'font') {
      if (subType.toLowerCase() === 'font color') {
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
                      <HexColorPicker
                        color={color.slice(0, 7)}
                        onChange={(val) => setColor(val + (color.slice(7, 9) || "FF"))}
                      />

                      <input
                        className="color-picker-input"
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />

                      <div className="opacity-control">
                        <label htmlFor="opacity-slider">Opacity</label>
                        <input
                          id="opacity-slider"
                          type="range"
                          min="0"
                          max="255"
                          value={parseInt(color.slice(7, 9) || "FF", 16)}
                          onChange={(e) => {
                            const alpha = Number(e.target.value)
                              .toString(16)
                              .padStart(2, "0")
                              .toUpperCase();
                            setColor(color.slice(0, 7) + alpha);
                          }}
                        />

                        <span className="opacity-value">
                          {(parseInt(color.slice(7, 9) || "FF", 16) / 255).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : null
              }
            </div>
          </div>
        );
      } else if (subType.toLowerCase() === 'font family') {
        return (
          <div className="style-input-wrapper">

            <div className='style-dialog-input-wrapper'>

              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="selected-label">
                    {inputValue || "Select a style"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-options">
                    {Object.entries(fontOptions).map(([key, option]) => (
                      <div
                        key={key}
                        className={`dropdown-option ${key}-font ${inputValue === option.label ? "selected" : ""}`}
                        onClick={() => {
                          setInputValue(option.label);
                          setDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      } else if (subType.toLowerCase() === 'font weight') {

        const weightArray = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

        return (
          <div className="style-input-wrapper">

            <div className='style-dialog-input-wrapper'>

              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="selected-label">
                    {inputValue || "Select a style"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-options">
                    {Object.entries(weightArray).map(([key, option]) => (
                      <div
                        key={key}
                        style={{ fontWeight: `${option}` }}
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
          </div>
        );
      } else if (subType.toLowerCase() === 'font size') {
        return (
          <div className="style-input-wrapper">

            <div className='style-dialog-input-wrapper'>

              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="selected-label">
                    {inputValue || "Select a style"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-options">
                    {Object.entries(fontSizes).map(([key, option]) => (
                      <div
                        key={key}
                        style={{ fontSize: `${option.css.replace(';', '')}` }}
                        className={`dropdown-option ${inputValue === option.label ? "selected" : ""}`}
                        onClick={() => {
                          setInputValue(option.label);
                          setDropdownOpen(false);
                          console.log(option.css.replace(';', ''))
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
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
    } else if (type.toLowerCase() === 'margin' || type.toLowerCase() === 'padding') {
      const initialType = typeof value === 'string' && value?.split('-')?.length === 2 ? 'string' : 0
      const [layoutType, setLayoutType] = useState<'number'>('number');

      const [layout, setLayout] = useState<number>(initialType === 'string' ? Number(value.split('-')[0]) : 0);
      const [layoutMetric, setLayoutMetric] = useState<string>(initialType === 'string' ? value.split('-')[1] : 'px')

      const metricOptions = ['px', 'rem', '%'];
      const typeOptions = ['number'];

      const updateInputValue = (val: string) => {
        setInputValue(val)
      }

      return (
        <div className="style-input-wrapper">
          <select
            className="style-dialog-dropdown"
            value={layoutType}
            onChange={(e) => {
              const selected = e.target.value as 'number';
              setLayoutType(selected);
              if (selected === 'number') {
                updateInputValue(`${layout}-${layoutMetric}`)
              }
            }}
          >
            {typeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <input
            ref={inputRef}
            className="style-dialog-input"
            type="number"
            value={layoutType === 'number' ? layout : ''}
            onChange={(e) => {
              if (Number(e.target.value) >= 0) {
                setLayout(Number(e.target.value))
                updateInputValue(`${Number(e.target.value)}-${layoutMetric}`)
              }
            }}
            disabled={layoutType !== 'number'}
            autoFocus
          />

          <select
            className="style-dialog-dropdown"
            value={layoutMetric}
            onChange={(e) => {
              setLayoutMetric(e.target.value);
              updateInputValue(`${layout}-${e.target.value}`);
            }}
            disabled={layoutType !== 'number'}
          >
            {metricOptions.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      );
    } else if (type.toLowerCase() === 'shadow') {
      if (subType.toLowerCase() !== 'color' && subType.toLowerCase() !== 'inset') {
        const initialType = typeof value === 'string' && value?.split('-')?.length === 2 ? 'string' : 0
        const [layoutType, setLayoutType] = useState<'number'>('number');

        const [layout, setLayout] = useState<number>(initialType === 'string' ? Number(value.split('-')[0]) : 0);
        const [layoutMetric, setLayoutMetric] = useState<string>(initialType === 'string' ? value.split('-')[1] : 'px')

        const metricOptions = ['px', 'rem'];
        const typeOptions = ['number'];

        const updateInputValue = (val: string) => {
          setInputValue(val)
        }

        return (
          <div className="style-input-wrapper">
            <select
              className="style-dialog-dropdown"
              value={layoutType}
              onChange={(e) => {
                const selected = e.target.value as 'number';
                setLayoutType(selected);
                if (selected === 'number') {
                  updateInputValue(`${layout}-${layoutMetric}`)
                }
              }}
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <input
              ref={inputRef}
              className="style-dialog-input"
              type="number"
              value={layoutType === 'number' ? layout : ''}
              onChange={(e) => {
                if (Number(e.target.value) >= 0) {
                  setLayout(Math.abs(Number(e.target.value)))
                  updateInputValue(`${Math.abs(Number(e.target.value))}-${layoutMetric}`)
                }

              }}
              disabled={layoutType !== 'number'}
              autoFocus
            />

            <select
              className="style-dialog-dropdown"
              value={layoutMetric}
              onChange={(e) => {
                setLayoutMetric(e.target.value);
                updateInputValue(`${layout}-${e.target.value}`);
              }}
              disabled={layoutType !== 'number'}
            >
              {metricOptions.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        );
      } else if (subType.toLowerCase() === 'color') {
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
                      <HexColorPicker
                        color={color.slice(0, 7)}
                        onChange={(val) => setColor(val + (color.slice(7, 9) || "FF"))}
                      />

                      <input
                        className="color-picker-input"
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />

                      <div className="opacity-control">
                        <label htmlFor="opacity-slider">Opacity</label>
                        <input
                          id="opacity-slider"
                          type="range"
                          min="0"
                          max="255"
                          value={parseInt(color.slice(7, 9) || "FF", 16)}
                          onChange={(e) => {
                            const alpha = Number(e.target.value)
                              .toString(16)
                              .padStart(2, "0")
                              .toUpperCase();
                            setColor(color.slice(0, 7) + alpha);
                          }}
                        />

                        <span className="opacity-value">
                          {(parseInt(color.slice(7, 9) || "FF", 16) / 255).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : null
              }
            </div>
          </div>
        );
      } else if (subType.toLowerCase() === 'inset') {
        const options = ['true', 'false'];

        return (
          <div className="style-input-wrapper">

            <div className='style-dialog-input-wrapper'>

              <div className="style-color-options-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="selected-label">
                    {inputValue || "Select a style"}
                  </span>

                  <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                </div>
                {dropdownOpen && (
                  <div className="dropdown-options">
                    {Object.entries(options).map(([key, option]) => (
                      <div
                        key={key}
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
          </div>
        );
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
        <p className="mullish-font style-dialog-description">
          Input the value you want to change for this style option.
        </p>

        <div className="style-dialog-input-row">
          {styleContentType.map((type) => {
            return (
              <>
                <span className="style-dialog-subheading-inline">
                  {
                    type === 'navLinks'
                      ? 'Navbar Link'
                      : type === 'globalDefaultButtonStyle'
                        ? 'global links style'
                        : !isNaN(Number(type))
                          ? Number(type) + 1
                          : type
                  }
                </span>
                <FontAwesomeIcon icon={faChevronRight} className="style-dialog-arrow" />
              </>
            )
          })}
          <span className="style-dialog-subheading-inline quicksand-font">{styleType === 'hoverStyles' ? 'hover styles' : styleType}</span>
          <FontAwesomeIcon icon={faChevronRight} className="style-dialog-arrow" />
          <span className="style-dialog-type quicksand-font">{type}</span>
          <FontAwesomeIcon icon={faChevronRight} className="style-dialog-arrow" />
          <span className="style-dialog-subtype quicksand-font">{subType}</span>
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
