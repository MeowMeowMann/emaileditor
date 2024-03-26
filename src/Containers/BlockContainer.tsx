import Box from "@mui/material/Box";
import React from "react";
// import './blockContainer.css';
// import '../App.css';
import { Button } from "@mui/material";
import { handleDragEnd, handleDragOver, handleDragStart } from "../Components/DragDrop/DragDropFunctions";
import { useClickContext } from "../Context/ClickContext";

interface BlockContainerProps {}

const BlockContainer: React.FC<BlockContainerProps> = () => {
  const { isClicked,setIsClicked,id} = useClickContext();
  const element=document.getElementById(id);
  // console.log(element)


  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const container = findContainer(target);

    if (container) {
      const clickedContainer = container.outerHTML;
      const element = document.getElementById(id);

      if (element) {
        
        element.innerHTML = clickedContainer;
        element.style.backgroundColor="blue"
        const innerDivs = element.querySelectorAll(".block");
        innerDivs.forEach((div) => {
          // (div as HTMLElement).style.backgroundColor = "yellow";
          (div as HTMLElement).style.width = "10000px";
        });
        setIsClicked(false);
      }
    }
  };

  const findContainer = (element: HTMLElement): HTMLElement | null => {
    while (element) {
      if (element.classList.contains('container')) {
        return element;
      }
      element = element.parentElement as HTMLElement;
    }
    return null;
  };

  return (
    <Box>
      <div id="main">
        <div id="div1" onDragOver={handleDragOver}>
          <div
            className="container draggable"
            id="column"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
          >
            <div className="block1 block">Block 1</div>
          </div>

          <div
            className="container draggable"
            id="column"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}

          >
            <div className="block2 block">Block 1</div>
            <div className="block2 block">Block 2</div>
          </div>

          <div
            className="container draggable"
            id="column"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}

          >
            <div className="block">Block 1</div>
            <div className="block">Block 2</div>
            <div className="block">Block 3</div>
          </div>

          <div
            className="container draggable"
            id="column"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}

          >
            <div className="block">Block 1</div>
            <div className="block">Block 2</div>
            <div className="block">Block 3</div>
            <div className="block">Block 4</div>

          </div>

          <Button onClick={() => setIsClicked(false)}>Cancle</Button>
         
        </div>
      </div>
      
     
    </Box>
  );
};

export default BlockContainer;
