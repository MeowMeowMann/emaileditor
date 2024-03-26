import { Box } from '@mui/material';
import React, { useEffect, useState } from "react";

interface CustomizationContainerProps {

}

const CustomizationContainer: React.FC<CustomizationContainerProps> = () => {
  const [editorContentRaw, setEditorContentRaw] = useState<string | null>(null);
  const [editorContentHTML, setEditorContentHTML] = useState<string | null>(null);
  const [localStorageChanged, setLocalStorageChanged] = useState(false);
  const [textColor, setTextColor] = useState<string>('black');
  const [bgColor, setBgColor] = useState<string>('white');
  const [alignment, setAlignment] = useState<string>('left');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<string>('16px');

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageChanged(true);
    };

    window.addEventListener('storage', handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (localStorageChanged) {
      const rawContent = localStorage.getItem('editorContentRaw');
      const htmlContent = localStorage.getItem('editorContentHTML');
      setEditorContentRaw(rawContent);
      setEditorContentHTML(htmlContent);
      setLocalStorageChanged(false);
    }
  }, [localStorageChanged]);

  const handleColorChange = () => {
    const modifiedHTML = `
      <div style="color: ${textColor}; background-color: ${bgColor}; text-align: ${alignment}; font-family: ${fontFamily}; font-size: ${fontSize};">
        ${editorContentHTML}
      </div>
    `;
    localStorage.setItem('editorContentHTML', modifiedHTML);
    // localStorage.setItem('bodyEdited', 'true');

    setEditorContentHTML(modifiedHTML);
    console.log(localStorage.getItem('editorContentHTML'))
  };

  const resetChanges = () => {
    setEditorContentHTML(null);
    localStorage.removeItem('editorContentHTML');
  };

  return (
    <Box>
      {/* Render editor content */}
      <>
        <div>
          <label htmlFor="textColor">Text Color:</label>
          <input type="color" id="textColor" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="bgColor">Background Color:</label>
          <input type="color" id="bgColor" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="alignment">Alignment:</label>
          <select id="alignment" value={alignment} onChange={(e) => setAlignment(e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div>
          <label htmlFor="fontFamily">Font Family:</label>
          <select id="fontFamily" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
        <div>
          <label htmlFor="fontSize">Font Size:</label>
          <select id="fontSize" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </div>
        <button onClick={handleColorChange}>Apply Changes</button>
        <button onClick={resetChanges}>Reset Changes</button>
        {editorContentHTML && (
          <div dangerouslySetInnerHTML={{ __html: editorContentHTML }} />
        )}
      </>
    </Box>
  );
};

export default CustomizationContainer;
