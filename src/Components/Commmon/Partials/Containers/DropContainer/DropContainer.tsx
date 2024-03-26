import { Box } from "@mui/material";
import React from "react";
import { render } from "react-dom";
import { useClickContext } from "../../../../../Context/ClickContext";
import { getDragAfterElement, handleDragOver, isNonEditable } from "../../../../DragDrop/DragDropFunctions";
import EditableItems from "../../Items/EditableItems/EditableItems";
import "./DropContainer.css";

interface DropContainerProps {}

const DropContainer: React.FC<DropContainerProps> = () => {
  const { setIsClicked ,setID,id} = useClickContext();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    debugger
    const container = event.currentTarget;
    const afterElement = getDragAfterElement(container, event.clientY);
    var draggable = document.querySelector('.dragging') as HTMLElement;
   
    if (!draggable.classList.contains('destination')) {
      console.log('destination');
      const cloned = draggable.cloneNode(true) as HTMLElement;
      let target = event.target as HTMLElement;
  


      if (draggable.id === 'column') {
        console.log('Adding Row');

        //event listener 
        cloned.classList.add('destination');
        cloned.addEventListener('click', () => {
          cloned.id=Date();
          setIsClicked(true); 
          setID(cloned.id);
        });
          cloned.addEventListener('dragstart', () => {
          cloned.classList.add('dragging');
        });
        cloned.addEventListener('dragend', () => {
          cloned.classList.remove('dragging');
        });

        // dnd elements in row
        if (afterElement === null) {
          container.appendChild(cloned);
        } else {
          container.insertBefore(cloned, afterElement);
        }

        cloned.classList.remove('dragging');
      }


      

      if (target.classList.contains('block')) {
        console.log('Adding into Block');
        console.log(target)
        console.log(draggable)


        // target.appendChild(cloned);

        if (isNonEditable(draggable)) {
          console.log('adding Editor');
          console.log(target)
          cloned.innerHTML = '';
          let editableItemsInstance = <EditableItems />;
          let editableItemsContainer = document.createElement('div');
          render(editableItemsInstance, editableItemsContainer);
          cloned.appendChild(editableItemsContainer);
          // target.appendChild(cloned);

          cloned.classList.add('destination');
          cloned.addEventListener('click', () => {
            cloned.id=Date();
            setIsClicked(true); 
            setID(cloned.id);
          });
            cloned.addEventListener('dragstart', () => {
            cloned.classList.add('dragging');
          });
          cloned.addEventListener('dragend', () => {
            cloned.classList.remove('dragging');
          });
          
          target.appendChild(cloned)
          cloned.classList.remove('dragging');
        } 


        // if (!isNonEditable(draggable)) {
        //   console.log(' not adding Editor');
        //   console.log(target)
        //   cloned.innerHTML = '';
        //   let editableItemsInstance = <EditableItems />;
        //   let editableItemsContainer = document.createElement('div');
        //   render(editableItemsInstance, editableItemsContainer);
        //   cloned.appendChild(editableItemsContainer);
        //   // target.appendChild(cloned);

        //   cloned.classList.add('destination');
        //   cloned.addEventListener('click', () => {
        //     cloned.id=Date();
        //     setIsClicked(true); 
        //     setID(cloned.id);
        //   });
        //     cloned.addEventListener('dragstart', () => {
        //     cloned.classList.add('dragging');
        //   });
        //   cloned.addEventListener('dragend', () => {
        //     cloned.classList.remove('dragging');
        //   });
          
        //   target.appendChild(cloned)
        //   cloned.classList.remove('dragging');
        // } 
       


        
        else {
          if (afterElement === null) {
            container.appendChild(cloned);
          } else {
            container.insertBefore(cloned, afterElement);
          }
        }
      }

      
    }



    // fine -> dragging in same container for re-arrangement 
    else {
      console.log('not destination');
      if (afterElement === null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    }

  };

  return (
    <Box sx={{ p: 2, border: '1px solid black', borderRadius: '5px', display: 'flex', flexDirection: 'column', flexGrow: 1 }} className="dropContainer">
      <div className="dropElementRow" onDragOver={handleDragOver} onDrop={handleDrop}>
        {/* Your draggable elements here */}
      </div>
    </Box>
  );
};

export default DropContainer;
