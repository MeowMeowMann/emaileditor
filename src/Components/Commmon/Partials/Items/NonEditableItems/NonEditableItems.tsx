import { Card, CardContent, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { handleDragEnd, handleDragStart } from "../../../../DragDrop/DragDropFunctions";
import './NonEditableItems.css';


interface NonEditableItemsProps {
  content:ReactNode
}

const NonEditableItems: React.FC<NonEditableItemsProps> = (props) => {

  

  return (
    <div id='nonEdit' className="nonEdit" draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* <div className="NonEditableItems"> */}
            <Card className="NonEditableItemCard"  >
              <CardContent>
                <Typography className="cardText" sx={{ fontSize:10 ,textAlign:"left"}}>{props.content}</Typography>
              </CardContent>
            </Card>
            
          {/* </div> */}
    </div>
  );
};

export default NonEditableItems;
