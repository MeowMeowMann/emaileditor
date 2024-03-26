import React, { useState } from 'react';
import '../App.css';
 
const test = () => {
 
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
 
 
        const container = event.currentTarget;
        const afterElement = getDragAfterElement(container, event.clientY);
 
        // Calculate the position within the drop target where the element should be inserted

 
 
        // Insert the dropped element at the calculated position or at the end if dropping at the bottom
        if (draggedElement) {
            const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
            if (target.classList.contains('block')) {
                target.appendChild(clonedElement);
            } else {
                if (afterElement === null) {
                    container.appendChild(clonedElement);
                }
                else {
                    container.insertBefore(clonedElement, afterElement);
                }
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
 
                <div className="container draggable" id="column1" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="block">Block 1</div>
                    <div className="block">Block 2</div>
                    <div className="block">Block 3</div>
                </div>
 
 
 
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <img id='img' className='draggable' src={imageUrl} height='60px' width='100%' draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
 
            </div>
            <div className="droppedContainer" id="div2" onDragOver={handleDragOver} onDrop={handleDrop}>
            </div>
        </div>
    );
}
 
export default test;