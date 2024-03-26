import React, { useState } from 'react';
import { render } from 'react-dom';
import './App.css';
import EditableItems from './Components/Commmon/Partials/Items/EditableItems/EditableItems';
 
const ColumnDnd = () => {
 
    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
event.dataTransfer.setData('text', event.currentTarget.id);
        const target = event.target as HTMLElement;
        if (target) {
            target.classList.add('dragging');
        }
    }
 
    const handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        if (target) {
            target.classList.remove('dragging');
        }
    }
 
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
 
 
 
    const getDragAfterElement = (container: HTMLDivElement, y: number): HTMLElement => {
        const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)'));
        console.log(draggableElements)
        return draggableElements.reduce<{ offset: number, element: HTMLElement | null }>((closest, child) => {
            const box = (child as HTMLElement).getBoundingClientRect();
            console.log(box)
const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child as HTMLElement };
            }
            else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY, element: null }).element!;
    }
 
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const draggedElement = document.getElementById(data);
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const draggable = document.querySelector('.dragging') as HTMLElement;
        
        console.log(draggedElement)
        console.log(draggable)
 
        const container = event.currentTarget;
        const afterElement = getDragAfterElement(container, event.clientY);
 
        // Calculate the position within the drop target where the element should be inserted
        const offsetY = event.clientY - rect.top;
        const index = Math.floor(offsetY / (rect.height / target.childElementCount));
 
        console.log(afterElement)
        console.log(index)
    //    if(!target.classList.contains('block'))
        if(!draggable.classList.contains('destination')){
        // Insert the dropped element at the calculated position or at the end if dropping at the bottom
        if (draggedElement && draggable) {
            console.log("ROW")
            const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
            if (target.classList.contains('block')) {
                target.appendChild(clonedElement);

                target.classList.add('destination');
                target.addEventListener('dragstart', () => {
                target.classList.add('dragging');
                });
                target.addEventListener('dragend', () => {
                target.classList.remove('dragging');
                });
                target.classList.remove('dragging');
                
            } else {
 
                if (afterElement === null) {
                    container.appendChild(clonedElement);
                }
                else {
                    container.insertBefore(clonedElement, afterElement);
                }
            }
 
        }


        if (!draggedElement && draggable) {
            console.log("Element")
            const clonedElement = draggable.cloneNode(true) as HTMLElement;
            if (target.classList.contains('block')) {
                console.log('editable')
                clonedElement.innerHTML=''
          
                // Create an instance of EditableItems
                let editableItemsInstance = <EditableItems />;
            
                // Render the EditableItems component into a container
                let editableItemsContainer = document.createElement('div');
                render(editableItemsInstance, editableItemsContainer);
            
                // Append the EditableItems component to the cloned draggable element
                clonedElement.appendChild(editableItemsContainer);
                target.appendChild(clonedElement);

                clonedElement.classList.add('destination');
                clonedElement.addEventListener('dragstart', () => {
                clonedElement.classList.add('dragging');
                });
                clonedElement.addEventListener('dragend', () => {
                clonedElement.classList.remove('dragging');
                });
                clonedElement.classList.remove('dragging');
            } else {

            }
 
 
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
     


 
 
    }
 
 
 
    const [imageUrl, setImageUrl] = useState(""); // Example initialization with an empty string
 
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result;
                setImageUrl(image as string); // Set the image URL in the state
            };
            reader.readAsDataURL(file);
        } else {
            console.log('Invalid file selected');
        }
    };
 
 
 
    return (
        <div id="main">
 
            <div id="div1" onDragOver={handleDragOver}>
 
                <div className="container draggable" id="column3" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="block1 block">Block 1</div>
                </div>
 
                <div className="container draggable" id="column2" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="block2 block">Block 1</div>
                    <div className="block2 block">Block 2</div>
                </div>
 
                
                <div className="edit" id="column1">
                    <EditableItems/>
                </div>
 
 
 
 
            </div>
            <div className="droppedContainer" id="div2" onDragOver={handleDragOver} onDrop={handleDrop}>
            </div>
        </div>
    );
}

const isNonEditable = (draggable: HTMLElement): Boolean => {
    if (draggable.id === 'edit'){return true;}
    return false;
  }
 
export default ColumnDnd;