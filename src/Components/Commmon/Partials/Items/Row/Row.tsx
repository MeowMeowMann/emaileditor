import React from "react";
import { handleDragEnd, handleDragStart } from "../../../../DragDrop/DragDropFunctions";
// import "./Row.css";
interface RowProps {
}

const Row: React.FC<RowProps> = (props) => {



  return (
    <div
    className="row"
    id="column"
    draggable
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    style={{ 
      width: 'auto',
      }}
  >
    <div className="block1 block">Row</div>
  </div>
  );
};

export default Row;
