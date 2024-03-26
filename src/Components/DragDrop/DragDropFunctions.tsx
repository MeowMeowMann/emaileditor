// import { renderToString } from 'react-dom/server';
// import { ReactDOM } from 'react';
import { render } from "react-dom";
import EditableItems from "../Commmon/Partials/Items/EditableItems/EditableItems";



 export const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
  const target = event.target as HTMLElement;
  if (target) {
    target.classList.add('dragging');
  }
}

export const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
  const target = event.target as HTMLElement;
  if (target) {
    target.classList.remove('dragging');
  }
}

export const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
}

export const getDragAfterElement = (container: HTMLDivElement, y: number): HTMLElement => {
  const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)'));
  return draggableElements.reduce<{ offset: number, element: HTMLElement | null }>((closest, child) => {
    const box = (child as HTMLElement).getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child as HTMLElement };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element!;
}




export const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  

  const container = event.currentTarget;
  const afterElement = getDragAfterElement(container, event.clientY);
  const draggable = document.querySelector('.dragging') as HTMLElement;
  console.log(draggable)

  if (!draggable.classList.contains('destination')) {
    console.log('destination')
    // Deep copy the draggable element
    const cloned = draggable.cloneNode(true) as HTMLElement;
    const target = event.target as HTMLElement;
    // if (draggable.innerText !== 'Row') {
    if (draggable.id === 'column') {


      target.appendChild(cloned);
    }


    if (target.classList.contains('block')) {
    


         console.log('in block')
         if(isNonEditable(draggable)){
                console.log('editable')
                cloned.innerHTML=''
          
                // Create an instance of EditableItems
                let editableItemsInstance = <EditableItems />;
            
                // Render the EditableItems component into a container
                let editableItemsContainer = document.createElement('div');
                render(editableItemsInstance, editableItemsContainer);
            
                // Append the EditableItems component to the cloned draggable element
                cloned.appendChild(editableItemsContainer);
                target.appendChild(cloned);
                
              }
            
            else {
                        if (afterElement === null) {
                            container.appendChild(cloned);
                        } else {
                            container.insertBefore(cloned, afterElement);
                        }
                    }
      }

      

    if(cloned.id==='column'){
      cloned.classList.add('destination');
      cloned.addEventListener('dragstart', () => {
        cloned.classList.add('dragging');
      });
      cloned.addEventListener('dragend', () => {
        cloned.classList.remove('dragging');
      });
      
  
      // Insert the cloned draggable element into the container
      if (afterElement === null) {
        container.appendChild(cloned);
      } else {
        container.insertBefore(cloned, afterElement);
      }
      cloned.classList.remove('dragging');

    }
  } 
  else {
    console.log("No destination")
    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  }

  // console.log(container)
  
}



export const isNonEditable = (draggable: HTMLElement): Boolean => {
  if (draggable.id === 'nonEdit'){
    return true;}
  return false;
}