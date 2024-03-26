import {
  BoldButton, HeadlineOneButton, HeadlineThreeButton,
  HeadlineTwoButton, ItalicButton, OrderedListButton, UnderlineButton, UnorderedListButton
} from '@draft-js-plugins/buttons';
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import { EditorState } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';

import { Modifier, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useMemo, useRef, useState } from "react";
import { handleDragEnd, handleDragStart } from "../../../../DragDrop/DragDropFunctions";

interface EditableItemsProps {
  
}


const EditableItems: React.FC<EditableItemsProps> = () => {

  const editorRef = useRef<Editor>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  

  const [editorState, setEditorState] = useState(() =>
    // EditorState.createEmpty()
    createEditorStateWithText(
      ""
    )
  );

  const onChange = (newState: EditorState) => {
    setEditorState(newState);
    const raw =convertToRaw(newState.getCurrentContent());
    // console.log(raw);
    let html = stateToHTML(newState.getCurrentContent());
    // console.log(html)
    // console.log(localStorage.getItem('editorContentHTML'))
    // localStorage.setItem('editorContentRaw', JSON.stringify(raw));
    localStorage.setItem('editorContentHTML', html);
    
  };


  const [plugins, InlineToolbar,TextAlignment] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const textAlignmentPlugin=  createTextAlignmentPlugin();

    

    return [[inlineToolbarPlugin,textAlignmentPlugin], inlineToolbarPlugin.InlineToolbar,textAlignmentPlugin.TextAlignment];
  }, []);

  const BackgroundColorButton = (props: any) => {
     const toggleColor =() =>{
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const currentStyle = editorState.getCurrentInlineStyle();
      // console.log(currentStyle)
  
      let nextContentState = contentState;
  
      // Toggle background color to red
      nextContentState = Modifier.applyInlineStyle(contentState, selection, 'BG');
      // let html = stateToHTML(nextContentState.getCurrentContent());

      // Apply the updated content state
      const newState = EditorState.push(editorState, nextContentState, 'change-inline-style');
      onChange(newState);
  
     }
      
    return (
      <button onMouseDown={toggleColor}>BC</button>
    );
  };
  

  // Custom button to change text color
  const TextColorButton = (props: any) => {
    const toggleTextColor = () => {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const currentStyle = editorState.getCurrentInlineStyle();
      // console.log(currentStyle)
  
      let nextContentState = contentState;
  
      // Toggle background color to red
      nextContentState = Modifier.applyInlineStyle(contentState, selection, 'TC');
      // let html = stateToHTML(nextContentState.getCurrentContent());

      // Apply the updated content state
      const newState = EditorState.push(editorState, nextContentState, 'change-inline-style');
      onChange(newState);
  
    };

    return <button onMouseDown={toggleTextColor}>TC</button>;
  };

  const testFn = (callback: (color: string) => void) => {
    const input = document.createElement('input');
    input.type = 'color';
    input.addEventListener('input', (event) => {
      const color = (event.target as HTMLInputElement).value;
      callback(color);
    });
    input.click(); // Open color picker panel
  };

  const styleMap = {
    BG: {
      backgroundColor: 'yellow',
    },
    // TC:{
    //   color:testFn()
    // }
  };

  


  return (
    <div id='edit' className="draggable" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}
    style={{padding:5}}>
            
            <Editor
            editorState={editorState}
            onChange={onChange}
            plugins={plugins}
            placeholder="Text goes here"
            customStyleMap={styleMap}
          />
           <InlineToolbar>
          {
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BackgroundColorButton {...externalProps}/>
                <TextColorButton {...externalProps}/>
              </div>
            )
          }
        </InlineToolbar>
    </div>
  );
};


export default EditableItems;
